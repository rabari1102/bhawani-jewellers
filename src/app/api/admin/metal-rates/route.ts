import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET() {
  const rates = await prisma.metalRate.findMany();
  return NextResponse.json({ data: rates });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { metalType, ratePerGram } = await req.json();
  if (!metalType || !ratePerGram) return NextResponse.json({ error: 'metalType and ratePerGram required' }, { status: 400 });
  const existing = await prisma.metalRate.findFirst({ where: { metalType } });
  let rate;
  if (existing) {
    rate = await prisma.metalRate.update({ where: { id: existing.id }, data: { ratePerGram: parseFloat(ratePerGram), lastUpdated: new Date() } });
  } else {
    rate = await prisma.metalRate.create({ data: { metalType, ratePerGram: parseFloat(ratePerGram) } });
  }
  return NextResponse.json({ data: rate });
}
