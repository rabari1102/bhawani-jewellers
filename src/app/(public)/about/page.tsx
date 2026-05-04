import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/public/SectionTitle';
import { Shield, Award, Heart, Gem, Star, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Bhawani Jewellers – Palghar',
  description: 'Learn about Bhawani Jewellers – a family-owned jewellery showroom in Palghar crafting premium gold, platinum, diamond and gemstone jewellery since 2024.',
  openGraph: { title: 'About Bhawani Jewellers', description: 'Premium handcrafted jewellery in Palghar, Maharashtra.' },
};

const values = [
  { icon: Shield, title: 'Quality Assurance', desc: 'Every piece undergoes rigorous quality checks before it reaches your hands.' },
  { icon: Award, title: 'Certified Hallmarking', desc: 'All gold and silver jewellery is BIS hallmarked, guaranteeing purity.' },
  { icon: Heart, title: 'Family Values', desc: 'Family-owned since 2024 – we treat every customer like our own.' },
  { icon: Gem, title: 'Master Craftsmanship', desc: 'Our artisans blend 100-year-old techniques with modern sensibilities.' },
  { icon: Star, title: 'Heirloom Quality', desc: 'Pieces crafted to be treasured and passed down through generations.' },
  { icon: Users, title: 'Personalized Service', desc: 'One-on-one attention to help you find or create your perfect piece.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1573408301185-9519f94815d3?w=1600&q=80" alt="Jewellery workshop" fill className="object-cover" priority sizes="100vw"/>
        <div className="absolute inset-0 bg-jewel-dark/70"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12 w-full">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-2">Est. April 2024, Palghar</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white">About Bhawani Jewellers</h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionTitle title="Our Story" center={false}/>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Bhawani Jewellers was founded in April 2024 by a family deeply rooted in Palghar's community with one clear purpose: to bring truly exceptional, handcrafted jewellery to every important moment in your life.</p>
                <p>What started as a dream to combine the timeless beauty of traditional Indian jewellery-making with the clean lines of contemporary design has grown into a trusted showroom at the heart of Palghar West.</p>
                <p>We specialize in premium gold, platinum, diamond, and gemstone jewellery — every piece crafted by master artisans who treat their work not as a trade, but as a calling. Our collections are designed to be heirloom-quality: pieces you will wear on the most meaningful days of your life and pass on to the next generation.</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1601121141499-f5af30b570c3?w=800&q=80" alt="Bhawani Jewellers showroom" fill className="object-cover" sizes="(max-width:1024px)100vw,50vw" loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-pad bg-jewel-dark">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle title="Our Philosophy" light/>
            <blockquote className="font-serif text-2xl md:text-3xl text-gold-300 italic leading-relaxed mt-4">
              &ldquo;Fine jewellery is not merely an ornament — it is the visible expression of the moments that define a life. We create pieces worthy of those moments.&rdquo;
            </blockquote>
            <p className="text-gray-400 mt-6 leading-relaxed">
              At Bhawani Jewellers, we believe that jewellery should resonate with the wearer's spirit. We blend 100-year-old Indian artisanal techniques — intricate filigree work, stone-setting, and hand-engraving — with contemporary silhouettes that feel fresh and relevant. The result is jewellery that is both timeless and modern.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <SectionTitle title="What We Stand For" subtitle="Six commitments we make to every customer who walks through our door"/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {values.map(v => (
              <div key={v.title} className="bg-white border border-gold-100 p-7 hover:shadow-md transition-shadow group">
                <div className="mb-4">
                  <v.icon size={28} className="text-gold-500 group-hover:scale-110 transition-transform duration-200"/>
                </div>
                <h3 className="font-serif text-xl text-jewel-dark mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-cream-200">
        <div className="container-main text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-jewel-dark mb-4">Come Experience the Difference</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">Visit us at our Palghar West showroom. Our team is ready to help you find the perfect piece or create one that is uniquely yours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections" className="btn-gold">Browse Collections</Link>
            <Link href="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
