import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import SectionTitle from '@/components/public/SectionTitle';
import { Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Customer Reviews | Bhawani Jewellers',
  description: 'Read what our customers say about Bhawani Jewellers, Palghar. Real reviews from brides, families and jewellery lovers across Maharashtra.',
};

export const revalidate = 60;

const defaultTestimonials = [
  { id: '1', customerName: 'Priya M.', location: 'Palghar', reviewText: 'My bridal set from Bhawani Jewellers was absolutely breathtaking. The craftsmanship was unlike anything I had seen — intricate, delicate, and exactly what I had dreamed of. Every guest at my wedding asked where I had bought my jewellery. I could not be prouder.', rating: 5 },
  { id: '2', customerName: 'Rahul K.', location: 'Vasai', reviewText: 'I brought my grandmother\'s old necklace — full of memories but badly worn — to Bhawani Jewellers for redesign. They transformed it into a stunning contemporary pendant while preserving the original gold and the sentimental stones. My mother cried when she saw it. That says everything.', rating: 5 },
  { id: '3', customerName: 'Neha & Amit', location: 'Mumbai', reviewText: 'We were apprehensive about buying jewellery for our wedding, unsure about purity and pricing. The team at Bhawani Jewellers was completely transparent — they explained every detail, showed us the hallmarking process, and helped us stay within budget without compromising on beauty. We found our perfect wedding set here.', rating: 5 },
];

export default async function TestimonialsPage() {
  const dbTestimonials = await prisma.testimonial.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } });
  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : defaultTestimonials;

  return (
    <div>
      {/* Header */}
      <section className="bg-jewel-dark py-20 px-4 text-center">
        <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Our Community</p>
        <h1 className="font-serif text-4xl md:text-6xl text-white">What Our Customers Say</h1>
        <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm">Real words from the people who trust us with their most precious moments.</p>
      </section>

      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="break-inside-avoid bg-white border border-gold-100 p-7 mb-6 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-gold-500" fill="currentColor"/>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed italic mb-6">&ldquo;{t.reviewText}&rdquo;</p>
                <div className="border-t border-gold-50 pt-4">
                  <p className="font-serif text-jewel-dark font-medium">{t.customerName}</p>
                  <p className="text-xs text-gold-600 mt-0.5">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
