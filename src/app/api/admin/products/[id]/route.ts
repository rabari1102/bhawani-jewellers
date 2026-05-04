import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id }, include: { category: true, images: { orderBy: { order: 'asc' } } } });
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: product });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const { name, sku, categoryId, description, weight, metalType, price, showPrice, isTopTrending, isNewArrival, isSpecialSelection, isVisible, images } = body;
    const slugifyLocal = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const product = await prisma.product.update({
      where: { id: params.id },
      data: { name, sku, slug: name && sku ? slugifyLocal(name + '-' + sku) : undefined, categoryId, description, weight: weight !== undefined ? parseFloat(weight) : undefined, metalType, price: price !== undefined ? parseFloat(price) : undefined, showPrice, isTopTrending, isNewArrival, isSpecialSelection, isVisible },
      include: { category: true, images: { orderBy: { order: 'asc' } } },
    });
    if (images !== undefined) {
      await prisma.productImage.deleteMany({ where: { productId: params.id } });
      if (images.length > 0) {
        await prisma.productImage.createMany({ data: images.map((img: { url: string; alt?: string; isPrimary?: boolean; order?: number }, i: number) => ({ productId: params.id, url: img.url, alt: img.alt || name, isPrimary: img.isPrimary || i === 0, order: img.order ?? i })) });
      }
    }
    return NextResponse.json({ data: product });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'Deleted' });
}
