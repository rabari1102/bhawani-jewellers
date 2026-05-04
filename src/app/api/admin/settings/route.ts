import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET() {
  const settings = await prisma.setting.findMany();
  const obj: Record<string, string> = {};
  settings.forEach(s => { obj[s.key] = s.value; });
  return NextResponse.json({ data: obj });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body: Record<string, string> = await req.json();
  const ops = Object.entries(body).map(([key, value]) =>
    prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } })
  );
  await Promise.all(ops);
  return NextResponse.json({ message: 'Settings saved' });
}
