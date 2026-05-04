import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import SectionTitle from '@/components/public/SectionTitle';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collections | Bhawani Jewellers',
  description: 'Explore our jewellery collections – bridal, gold, platinum, diamond, gemstone and bespoke pieces at Bhawani Jewellers, Palghar.',
};

export const revalidate = 60;

export default async function CollectionsPage() {
  const categories = await prisma.category.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' }, include: { _count: { select: { products: { where: { isVisible: true } } } } } });

  const placeholders = [
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=70',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=70',
    'https://images.unsplash.com/photo-1573408301185-9519f94815d3?w=600&q=70',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=70',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=70',
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=70',
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-jewel-dark py-20 px-4 text-center">
        <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Curated for You</p>
        <h1 className="font-serif text-4xl md:text-6xl text-white">Our Collections</h1>
        <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">From bridal sets to everyday elegance — discover jewellery crafted for every moment of your life.</p>
      </section>

      {/* Grid */}
      <section className="section-pad bg-cream-100">
        <div className="container-main">
          {categories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Collections coming soon. Visit us in-store to explore our full range.</p>
              <Link href="/contact" className="btn-gold mt-6 inline-block">Contact Us</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <Link key={cat.id} href={`/collections/${cat.slug}`} className="group relative aspect-[4/3] overflow-hidden bg-cream-200 block">
                  <Image src={cat.imageUrl || placeholders[i % placeholders.length]} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw" loading="lazy"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-jewel-dark/80 via-jewel-dark/20 to-transparent group-hover:from-jewel-dark/90 transition-all duration-300"/>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="font-serif text-2xl text-white mb-1">{cat.name}</h2>
                    <p className="text-gold-300 text-xs">{cat._count.products} pieces</p>
                    <span className="inline-flex items-center gap-1 text-xs text-gold-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore <ArrowRight size={12}/></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
