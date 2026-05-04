import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import SectionTitle from '@/components/public/SectionTitle';
import ProductCard from '@/components/public/ProductCard';
import type { ProductWithImages } from '@/types';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = await prisma.category.findUnique({ where: { slug: params.slug } });
  return {
    title: `${cat?.name || 'Collection'} | Bhawani Jewellers`,
    description: cat?.description || `Explore our ${cat?.name} collection at Bhawani Jewellers, Palghar.`,
  };
}

export default async function CategoryPage({ params, searchParams }: { params: { slug: string }; searchParams: { page?: string } }) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug, isVisible: true } });
  if (!category) notFound();

  const page = parseInt(searchParams.page || '1');
  const limit = 12;
  const [products, total] = await Promise.all([
    prisma.product.findMany({ where: { categoryId: category.id, isVisible: true }, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' }, include: { category: true, images: { orderBy: { order: 'asc' } } } }),
    prisma.product.count({ where: { categoryId: category.id, isVisible: true } }),
  ]);
  const pages = Math.ceil(total / limit);

  return (
    <div>
      <section className="bg-jewel-dark py-20 px-4 text-center">
        <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Collection</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white">{category.name}</h1>
        {category.description && <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm">{category.description}</p>}
        <p className="text-gold-500 text-xs mt-3">{total} piece{total !== 1 ? 's' : ''} available</p>
      </section>

      <section className="section-pad bg-cream-100">
        <div className="container-main">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg font-serif">No products in this collection yet.</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon or visit us in-store to explore the full range.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {products.map(p => <ProductCard key={p.id} product={p as ProductWithImages}/>)}
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
