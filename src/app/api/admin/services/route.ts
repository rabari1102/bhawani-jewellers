import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json({ data: services });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { title, shortDescription, detailedDescription, icon, imageUrl, order, isVisible } = await req.json();
  const s = await prisma.service.create({ data: { title, shortDescription, detailedDescription, icon, imageUrl, order: order ?? 0, isVisible: isVisible !== false } });
  return NextResponse.json({ data: s }, { status: 201 });
}
