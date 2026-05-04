import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import SectionTitle from '@/components/public/SectionTitle';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Bhawani Jewellers',
  description: 'Jewellery tips, buying guides and stories from Bhawani Jewellers. Learn how to care for gold, choose bridal sets and more.',
};

export const revalidate = 60;

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || '1');
  const limit = 9;
  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({ where: { isPublished: true }, skip: (page - 1) * limit, take: limit, orderBy: { publishedAt: 'desc' }, select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, publishedAt: true } }),
    prisma.blogPost.count({ where: { isPublished: true } }),
  ]);
  const pages = Math.ceil(total / limit);

  return (
    <div>
      <section className="bg-jewel-dark py-20 px-4 text-center">
        <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Knowledge & Stories</p>
        <h1 className="font-serif text-4xl md:text-6xl text-white">From Our Blog</h1>
        <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm">Jewellery care, buying guides and stories from our craftsmen.</p>
      </section>

      <section className="section-pad bg-cream-100">
        <div className="container-main">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-gray-400">Articles coming soon.</p>
              <p className="text-gray-500 text-sm mt-2">Check back for jewellery tips and stories from our craftsmen.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {posts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white border border-gold-100 overflow-hidden hover:shadow-md transition-shadow block">
                    <div className="h-48 bg-cream-200 overflow-hidden relative">
                      {post.coverImage ? (
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gold-200 text-5xl font-serif">✦</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      {post.publishedAt && (
                        <p className="flex items-center gap-1.5 text-xs text-gold-500 mb-3"><Calendar size={11}/>{formatDate(post.publishedAt)}</p>
                      )}
                      <h2 className="font-serif text-lg text-jewel-dark mb-2 leading-snug group-hover:text-gold-700 transition-colors">{post.title}</h2>
                      {post.excerpt && <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>}
                      <span className="inline-flex items-center gap-1 text-xs text-gold-600 font-medium uppercase tracking-wide">Read More <ArrowRight size={12}/></span>
                    </div>
                  </Link>
                ))}
              </div>
              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
                    <a key={n} href={`?page=${n}`} className={`w-9 h-9 flex items-center justify-center text-sm border transition-colors ${
                      n === page ? 'bg-jewel-dark text-white border-jewel-dark' : 'border-gold-200 text-jewel-dark hover:border-gold-500'
                    }`}>{n}</a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
