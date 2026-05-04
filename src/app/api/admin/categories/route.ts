import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { order: 'asc' }, include: { _count: { select: { products: true } } } });
  return NextResponse.json({ data: categories });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { name, slug, description, imageUrl, order, isVisible } = await req.json();
    if (!name || !slug) return NextResponse.json({ error: 'name and slug required' }, { status: 400 });
    const category = await prisma.category.create({ data: { name, slug, description, imageUrl, order: order ?? 0, isVisible: isVisible !== false } });
    return NextResponse.json({ data: category }, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
