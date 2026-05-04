import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({ skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.blogPost.count(),
  ]);
  return NextResponse.json({ data: posts, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { title, slug, excerpt, content, coverImage, isPublished } = await req.json();
  if (!title || !slug || !content) return NextResponse.json({ error: 'title, slug, content required' }, { status: 400 });
  const post = await prisma.blogPost.create({ data: { title, slug, excerpt, content, coverImage, isPublished: !!isPublished, publishedAt: isPublished ? new Date() : null } });
  return NextResponse.json({ data: post }, { status: 201 });
}
