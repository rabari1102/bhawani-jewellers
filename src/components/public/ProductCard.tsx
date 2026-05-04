'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import type { ProductWithImages } from '@/types';

export default function ProductCard({ product }: { product: ProductWithImages }) {
  const { toggle, has } = useWishlist();
  const img = product.images.find(i => i.isPrimary) || product.images[0];
  const wishlisted = has(product.id);

  return (
    <div className="card-product relative">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-cream-200">
          <Image
            src={img?.url || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=70'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width:640px)50vw,(max-width:1024px)33vw,25vw"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-gold-600 tracking-wider mb-1">{product.sku}</p>
          <h3 className="font-serif text-base text-jewel-dark leading-snug mb-2">{product.name}</h3>
          {product.weight && <p className="text-xs text-gray-400">Wt: {product.weight.toFixed(3)} gram</p>}
          {product.showPrice && product.price && (
            <p className="text-sm font-medium text-gold-600 mt-1">₹ {product.price.toLocaleString('en-IN')}</p>
          )}
        </div>
      </Link>
      <button
        onClick={() => toggle({ id: product.id, sku: product.sku, name: product.name, imageUrl: img?.url || '', slug: product.slug })}
        className={`absolute top-3 right-3 p-1.5 bg-white shadow-sm transition-colors ${
          wishlisted ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
        }`}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'}/>
      </button>
    </div>
  );
}
