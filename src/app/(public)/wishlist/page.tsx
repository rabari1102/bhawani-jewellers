'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/hooks/useWishlist';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { items, remove, count } = useWishlist();

  return (
    <div>
      <section className="bg-jewel-dark py-20 px-4 text-center">
        <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Saved Pieces</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white">Your Wishlist</h1>
        <p className="text-gray-400 mt-3 text-sm">{count} item{count !== 1 ? 's' : ''} saved</p>
      </section>

      <section className="section-pad bg-cream-100">
        <div className="container-main">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={48} className="text-gold-200 mx-auto mb-4"/>
              <h2 className="font-serif text-2xl text-jewel-dark mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 text-sm mb-8">Browse our collections and save pieces you love.</p>
              <Link href="/collections" className="btn-gold">Browse Collections</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map(item => (
                <div key={item.id} className="bg-white border border-gold-100 overflow-hidden group hover:shadow-md transition-shadow relative">
                  <Link href={`/products/${item.slug}`}>
                    <div className="relative aspect-square bg-cream-200 overflow-hidden">
                      <Image src={item.imageUrl || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=70'} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px)50vw,25vw" loading="lazy"/>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gold-600 mb-1">{item.sku}</p>
                      <p className="font-serif text-base text-jewel-dark leading-snug">{item.name}</p>
                    </div>
                  </Link>
                  <button onClick={() => remove(item.id)} className="absolute top-3 right-3 bg-white p-1.5 shadow-sm text-red-400 hover:text-red-600 transition-colors" aria-label="Remove from wishlist">
                    <Trash2 size={14}/>
                  </button>
                  <div className="px-4 pb-4">
                    <Link href={`/products/${item.slug}`} className="inline-flex items-center gap-1 text-xs text-gold-600 hover:text-gold-800 font-medium uppercase tracking-wide">
                      View <ArrowRight size={11}/>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
