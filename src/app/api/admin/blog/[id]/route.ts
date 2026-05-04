import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: post });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { title, slug, excerpt, content, coverImage, isPublished } = await req.json();
  const current = await prisma.blogPost.findUnique({ where: { id: params.id } });
  const post = await prisma.blogPost.update({
    where: { id: params.id },
    data: { title, slug, excerpt, content, coverImage, isPublished, publishedAt: isPublished && !current?.publishedAt ? new Date() : undefined },
  });
  return NextResponse.json({ data: post });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'Deleted' });
}
