import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { Calendar, ArrowLeft, MessageCircle } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug, isPublished: true } });
  return {
    title: `${post?.title || 'Article'} | Bhawani Jewellers`,
    description: post?.excerpt || 'Read this article from Bhawani Jewellers.',
    openGraph: { title: post?.title, description: post?.excerpt || undefined, images: post?.coverImage ? [post.coverImage] : [] },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug, isPublished: true } });
  if (!post) notFound();

  return (
    <div className="section-pad bg-cream-100">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gold-600 mb-8 uppercase tracking-wide transition-colors">
          <ArrowLeft size={14}/> Back to Blog
        </Link>
        {post.coverImage && (
          <div className="aspect-video overflow-hidden mb-8">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" loading="lazy"/>
          </div>
        )}
        <div className="mb-6">
          {post.publishedAt && (
            <p className="flex items-center gap-1.5 text-xs text-gold-500 mb-3"><Calendar size={11}/>{formatDate(post.publishedAt)}</p>
          )}
          <h1 className="font-serif text-3xl md:text-5xl text-jewel-dark leading-tight">{post.title}</h1>
          {post.excerpt && <p className="text-gray-500 text-lg mt-4 leading-relaxed italic">{post.excerpt}</p>}
        </div>
        <div className="border-t border-gold-100 pt-8">
          <div className="prose prose-stone max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</div>
        </div>
        <div className="border-t border-gold-100 mt-10 pt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <p className="font-serif text-jewel-dark">Bhawani Jewellers</p>
            <p className="text-xs text-gray-500">Palghar West, Maharashtra</p>
          </div>
          <a href="https://wa.me/918698909955" target="_blank" rel="noopener noreferrer" className="btn-gold text-xs flex items-center gap-2"><MessageCircle size={14}/>Ask Us on WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
