import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json({ data: testimonials });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { customerName, location, reviewText, rating, order, isVisible } = await req.json();
  const t = await prisma.testimonial.create({ data: { customerName, location, reviewText, rating: rating ?? 5, order: order ?? 0, isVisible: isVisible !== false } });
  return NextResponse.json({ data: t }, { status: 201 });
}
