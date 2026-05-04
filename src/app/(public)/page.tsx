import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import SectionTitle from '@/components/public/SectionTitle';
import ProductCard from '@/components/public/ProductCard';
import { MapPin, Phone, Clock, Star, ArrowRight, MessageCircle } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhawani Jewellers | Premium Gold & Platinum Jewellery Palghar',
  description: 'Shop exquisite handcrafted gold, platinum, diamond & gemstone jewellery at Bhawani Jewellers, Palghar West. Visit us at Shop No 3, Opposite Hutatma Chowk.',
};

export const revalidate = 60;

export default async function HomePage() {
  const [trending, newArrivals, special, testimonials, services, blogs, metalRates] = await Promise.all([
    prisma.product.findMany({ where: { isTopTrending: true, isVisible: true }, take: 8, include: { category: true, images: { orderBy: { order: 'asc' } } } }),
    prisma.product.findMany({ where: { isNewArrival: true, isVisible: true }, take: 8, include: { category: true, images: { orderBy: { order: 'asc' } } } }),
    prisma.product.findMany({ where: { isSpecialSelection: true, isVisible: true }, take: 8, include: { category: true, images: { orderBy: { order: 'asc' } } } }),
    prisma.testimonial.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' }, take: 4 }),
    prisma.service.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' }, take: 6 }),
    prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: 'desc' }, take: 3 }),
    prisma.metalRate.findMany(),
  ]);

  const rate24 = metalRates.find(r => r.metalType === 'GOLD_24K');
  const rate22 = metalRates.find(r => r.metalType === 'GOLD_22K');

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1601121141499-f5af30b570c3?w=1600&q=80" alt="Bridal jewellery hero" fill className="object-cover" priority sizes="100vw"/>
          <div className="absolute inset-0 bg-gradient-to-r from-jewel-dark/90 via-jewel-dark/60 to-jewel-dark/30"/>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold-400"/>
              <span className="text-gold-400 text-xs tracking-widest uppercase">Since 2024, Palghar</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-white leading-tight mb-5">
              Premium Gold &amp; Platinum <span className="text-gold-400">Jewellery</span> in Palghar
            </h1>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed max-w-xl">
              Exquisite handcrafted gold, platinum and gemstone pieces blending traditional Indian artistry with contemporary elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/collections" className="btn-gold">View Collections</Link>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-jewel-dark">Visit Our Store</Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 text-sm text-gray-300">
              <span className="flex items-center gap-2"><MapPin size={14} className="text-gold-400"/>Shop No 3, Palghar West</span>
              <span className="flex items-center gap-2"><Phone size={14} className="text-gold-400"/>+91 86989 09955</span>
              <span className="flex items-center gap-2"><Clock size={14} className="text-gold-400"/>9 AM – 8:30 PM Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* METAL RATE WIDGET */}
      <section className="bg-jewel-dark py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-xs tracking-widest text-gold-400 uppercase mb-1">Today&apos;s Rate</p>
            <h2 className="font-serif text-3xl text-white">Retail Metal Rate</h2>
            <p className="text-xs text-gray-400 mt-1">+3% GST applicable on all rates</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[{ label: 'GOLD – 24K (999)', rate: rate24 }, { label: 'GOLD – 22K (916)', rate: rate22 }].map(({ label, rate }) => (
              <div key={label} className="border border-gold-700 p-5 text-center bg-gold-900/20">
                <p className="text-xs text-gold-400 tracking-widest uppercase mb-2">{label}</p>
                <p className="font-serif text-4xl text-white mb-1">
                  ₹ {rate?.ratePerGram?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) ?? '---'}
                  <span className="text-base text-gray-400">/-  per gram</span>
                </p>
                {rate && (
                  <p className="text-xs text-gray-500 mt-2">
                    Last Updated: {formatDate(rate.lastUpdated)} at {formatTime(rate.lastUpdated)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP TRENDING */}
      {trending.length > 0 && (
        <section className="section-pad bg-cream-100">
          <div className="container-main">
            <SectionTitle title="Top Trending Products" subtitle="Our most loved jewellery pieces, cherished by customers across Palghar and beyond."/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {trending.map(p => <ProductCard key={p.id} product={p as any}/>)}
            </div>
          </div>
        </section>
      )}

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="section-pad bg-cream-200">
          <div className="container-main">
            <SectionTitle title="New Arrivals" subtitle="Freshly crafted pieces now available in our showroom."/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {newArrivals.map(p => <ProductCard key={p.id} product={p as any}/>)}
            </div>
          </div>
        </section>
      )}

      {/* SPECIAL SELECTION */}
      {special.length > 0 && (
        <section className="section-pad bg-cream-100">
          <div className="container-main">
            <SectionTitle title="Special Selection For You" subtitle="Handpicked pieces curated by our master jewellers for discerning tastes."/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {special.map(p => <ProductCard key={p.id} product={p as any}/>)}
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}
      {services.length > 0 && (
        <section className="section-pad bg-jewel-dark">
          <div className="container-main">
            <SectionTitle title="Our Services" subtitle="Comprehensive jewellery services delivered by skilled artisans" light/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(s => (
                <div key={s.id} className="border border-gold-800 p-6 hover:border-gold-500 transition-colors group">
                  <h3 className="font-serif text-xl text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.shortDescription}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/services" className="btn-gold">View All Services</Link>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section-pad bg-cream-100">
          <div className="container-main">
            <SectionTitle title="What Our Customers Say" subtitle="Real stories from our valued customers across Palghar, Vasai, and Mumbai"/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map(t => (
                <div key={t.id} className="bg-white border border-gold-100 p-6 relative hover:shadow-md transition-shadow">
                  <div className="flex gap-0.5 mb-4">{Array.from({length:t.rating}).map((_,i)=><Star key={i} size={12} className="text-gold-500" fill="currentColor"/>)}</div>
                  <p className="text-gray-600 text-sm italic leading-relaxed mb-5">&ldquo;{t.reviewText}&rdquo;</p>
                  <p className="font-serif text-jewel-dark">{t.customerName}</p>
                  <p className="text-xs text-gold-600 mt-0.5">{t.location}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/testimonials" className="btn-outline">Read All Reviews</Link>
            </div>
          </div>
        </section>
      )}

      {/* VISIT STORE */}
      <section className="section-pad bg-cream-200">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Visit Our Store" center={false}/>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3"><MapPin className="text-gold-500 shrink-0 mt-0.5" size={16}/><div><p className="font-medium text-jewel-dark">Address</p><p className="text-gray-500">Shop No 3, Opposite Hutatma Chowk, Mahim Road, Palghar West – 401404</p></div></div>
                <div className="flex gap-3"><Phone className="text-gold-500 shrink-0" size={16}/><div><p className="font-medium text-jewel-dark">Phone</p><a href="tel:+918698909955" className="text-gray-500 hover:text-gold-600">+91 86989 09955</a></div></div>
                <div className="flex gap-3"><Clock className="text-gold-500 shrink-0" size={16}/><div><p className="font-medium text-jewel-dark">Hours</p><p className="text-gray-500">Open Daily 9 AM – 8:30 PM</p></div></div>
              </div>
              <div className="flex gap-3 mt-7">
                <a href="https://maps.google.com/?q=Palghar+West+Mahim+Road+Shop+3" target="_blank" rel="noopener noreferrer" className="btn-gold text-xs">Get Directions</a>
                <a href="https://wa.me/918698909955?text=Hello!+I+want+to+visit+Bhawani+Jewellers" target="_blank" rel="noopener noreferrer" className="btn-dark text-xs flex items-center gap-2"><MessageCircle size={14}/> WhatsApp</a>
              </div>
            </div>
            <div className="h-80 bg-cream-300 overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.0!2d72.76!3d19.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDQxJzI0LjAiTiA3MsKwNDUnMzYuMCJF!5e0!3m2!1sen!2sin!4v1234" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Bhawani Jewellers location"/>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      {blogs.length > 0 && (
        <section className="section-pad bg-cream-100">
          <div className="container-main">
            <SectionTitle title="From Our Blog" subtitle="Jewellery care tips, buying guides, and more from our experts"/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {blogs.map(b => (
                <div key={b.id} className="bg-white border border-gold-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-44 bg-cream-200 flex items-center justify-center">
                    <span className="text-gold-200 text-5xl font-serif">✦</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gold-500 mb-2">{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : ''}</p>
                    <h3 className="font-serif text-lg text-jewel-dark mb-2 leading-snug">{b.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">{b.excerpt}</p>
                    <Link href={`/blog/${b.slug}`} className="inline-flex items-center gap-1 text-xs text-gold-600 hover:text-gold-800 font-medium uppercase tracking-wide">Read More <ArrowRight size={12}/></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
