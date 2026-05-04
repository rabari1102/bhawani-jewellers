import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('categoryId') || undefined;
  const flag = searchParams.get('flag') as string | null;

  const where: Record<string, unknown> = {};
  if (search) where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { sku: { contains: search, mode: 'insensitive' } }];
  if (categoryId) where.categoryId = categoryId;
  if (flag === 'trending') where.isTopTrending = true;
  if (flag === 'new') where.isNewArrival = true;
  if (flag === 'special') where.isSpecialSelection = true;

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' }, include: { category: true, images: { orderBy: { order: 'asc' } } } }),
    prisma.product.count({ where }),
  ]);
  return NextResponse.json({ data: products, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const { name, sku, categoryId, description, weight, metalType, price, showPrice, isTopTrending, isNewArrival, isSpecialSelection, isVisible, images } = body;
    if (!name || !sku || !categoryId) return NextResponse.json({ error: 'name, sku, categoryId required' }, { status: 400 });
    const slugifyLocal = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = slugifyLocal(name + '-' + sku);
    const product = await prisma.product.create({
      data: { name, sku, slug, categoryId, description, weight: weight ? parseFloat(weight) : null, metalType: metalType || 'GOLD_22K', price: price ? parseFloat(price) : null, showPrice: !!showPrice, isTopTrending: !!isTopTrending, isNewArrival: !!isNewArrival, isSpecialSelection: !!isSpecialSelection, isVisible: isVisible !== false,
        images: images?.length ? { create: images.map((img: { url: string; alt?: string; isPrimary?: boolean; order?: number }, i: number) => ({ url: img.url, alt: img.alt || name, isPrimary: img.isPrimary || i === 0, order: img.order ?? i })) } : undefined,
      },
      include: { category: true, images: true },
    });
    return NextResponse.json({ data: product }, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
