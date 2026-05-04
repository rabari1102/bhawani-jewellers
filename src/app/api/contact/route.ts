import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, interest } = await req.json();
    if (!name || !email || !message) return NextResponse.json({ error: 'name, email, message required' }, { status: 400 });
    const enquiry = await prisma.enquiry.create({ data: { name, email, phone, message, interest } });
    return NextResponse.json({ data: enquiry, message: 'Enquiry submitted successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
