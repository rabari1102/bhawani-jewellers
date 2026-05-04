import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { METAL_LABELS, waLink } from '@/lib/utils';
import WishlistButtonClient from '@/components/public/WishlistButtonClient';
import { MapPin, Phone, MessageCircle, ArrowLeft, Tag, Weight } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug }, include: { category: true } });
  return {
    title: `${product?.name || 'Product'} | Bhawani Jewellers`,
    description: product?.description || `${product?.name} – ${product?.category?.name} jewellery at Bhawani Jewellers, Palghar.`,
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug, isVisible: true }, include: { category: true, images: { orderBy: { order: 'asc' } } } });
  if (!product) notFound();

  const primaryImg = product.images.find(i => i.isPrimary) || product.images[0];
  const waMessage = `Hello! I am interested in ${product.name} (SKU: ${product.sku}). Could you please share more details?`;

  return (
    <div className="section-pad bg-cream-100">
      <div className="container-main">
        <Link href="/collections" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gold-600 mb-8 uppercase tracking-wide transition-colors">
          <ArrowLeft size={14}/> Back to Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden bg-cream-200">
              <Image src={primaryImg?.url || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'} alt={product.name} fill className="object-cover" sizes="(max-width:1024px)100vw,50vw" priority/>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map(img => (
                  <div key={img.id} className={`relative w-20 h-20 flex-shrink-0 overflow-hidden border-2 ${ img.isPrimary ? 'border-gold-500' : 'border-transparent'}`}>
                    <Image src={img.url} alt={img.alt || product.name} fill className="object-cover" sizes="80px" loading="lazy"/>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.category && (
              <Link href={`/collections/${product.category.slug}`} className="text-xs text-gold-600 tracking-widest uppercase hover:text-gold-800">{product.category.name}</Link>
            )}
            <h1 className="font-serif text-3xl md:text-4xl text-jewel-dark mt-2 mb-4">{product.name}</h1>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-cream-200 px-3 py-1.5 text-xs text-jewel-dark">
                <Tag size={12} className="text-gold-500"/> {product.sku}
              </span>
              {product.weight && (
                <span className="inline-flex items-center gap-1.5 bg-cream-200 px-3 py-1.5 text-xs text-jewel-dark">
                  <Weight size={12} className="text-gold-500"/> {product.weight.toFixed(3)} gram
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 bg-cream-200 px-3 py-1.5 text-xs text-jewel-dark">{METAL_LABELS[product.metalType]}</span>
            </div>

            {product.showPrice && product.price ? (
              <p className="font-serif text-3xl text-gold-600 mb-6">₹ {product.price.toLocaleString('en-IN')}</p>
            ) : (
              <p className="text-sm text-gray-500 mb-6 italic">Price on request — enquire via WhatsApp for a quote.</p>
            )}

            {product.description && (
              <p className="text-gray-600 leading-relaxed mb-8 text-sm">{product.description}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn-gold flex-1 flex items-center justify-center gap-2">
                <MessageCircle size={16}/> Enquire on WhatsApp
              </a>
              <WishlistButtonClient product={{ id: product.id, sku: product.sku, name: product.name, imageUrl: primaryImg?.url || '', slug: product.slug }}/>
            </div>

            <div className="border-t border-gold-100 pt-6 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2"><MapPin size={12} className="text-gold-500"/>Shop No 3, Opp. Hutatma Chowk, Mahim Rd, Palghar West – 401404</div>
              <div className="flex items-center gap-2"><Phone size={12} className="text-gold-500"/>+91 86989 09955</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
