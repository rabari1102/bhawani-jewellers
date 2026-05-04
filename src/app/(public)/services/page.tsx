import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import SectionTitle from '@/components/public/SectionTitle';
import { CheckCircle, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | Bhawani Jewellers',
  description: 'Discover jewellery services at Bhawani Jewellers – bespoke design, redesign, hallmarking, valuation, cleaning and polishing in Palghar.',
};

export const revalidate = 60;

const defaultServices = [
  { title: 'Bespoke Custom Design', shortDescription: 'Work one-on-one with our master craftsmen to design a jewellery piece that is entirely yours — from sketch to finished creation.', detailedDescription: 'Our bespoke design service is the pinnacle of personalized jewellery. You sit with our senior designer, share your vision, and we craft a piece that is as unique as the moment it celebrates. We guide you through metal choice, gemstone selection, and finishes — every step of the way.' },
  { title: 'Jewellery Redesign', shortDescription: 'Breathe new life into cherished old pieces while preserving their sentimental value — reimagined in a contemporary form.', detailedDescription: 'Your grandmother\'s necklace holds a story, but it no longer suits your style. We redesign heirloom jewellery into modern pieces that you will actually wear, while preserving the original gold and stones — and the memories within them.' },
  { title: 'Certified Hallmarking', shortDescription: 'BIS-certified hallmarking for all gold and silver jewellery, guaranteeing the purity you paid for.', detailedDescription: 'We provide official BIS hallmarking for gold (22K, 18K, 14K) and silver jewellery. A hallmark is your guarantee of authenticity and purity — a legal assurance that what you own is exactly what it says it is.' },
  { title: 'Professional Valuation', shortDescription: 'Accurate, certified valuation of your jewellery for insurance, taxation, resale, or personal purposes.', detailedDescription: 'Our valuation service provides a detailed written certificate of your jewellery\'s current market value. This is essential for insurance policies, legal proceedings, taxation, and estate planning.' },
  { title: 'Quality Inspection', shortDescription: 'Thorough quality checks on every piece — from prong integrity to stone security and metal finish.', detailedDescription: 'Before any piece leaves our showroom, it passes through a rigorous 12-point quality inspection. We check metal purity, stone setting integrity, clasp security, surface finish, and overall craftsmanship.' },
  { title: 'Cleaning & Polishing', shortDescription: 'Complimentary professional cleaning and polishing to restore your jewellery to its original brilliance.', detailedDescription: 'Years of wear can dull even the finest jewellery. Our ultrasonic cleaning and professional hand polishing service restores the original lustre of your pieces. This service is complimentary for all jewellery purchased from us.' },
];

export default async function ServicesPage() {
  const dbServices = await prisma.service.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } });
  const services = dbServices.length > 0 ? dbServices : defaultServices;

  return (
    <div>
      {/* Header */}
      <section className="bg-jewel-dark py-20 px-4 text-center">
        <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">What We Offer</p>
        <h1 className="font-serif text-4xl md:text-6xl text-white">Our Services</h1>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">From bespoke creation to careful restoration — comprehensive jewellery services delivered with master craftsmanship.</p>
      </section>

      {/* Services Detail */}
      <section className="section-pad bg-cream-100">
        <div className="container-main space-y-8">
          {services.map((s, i) => (
            <div key={('id' in s ? s.id : s.title) as string} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${ i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="text-gold-400 text-xs tracking-widest uppercase">Service 0{i + 1}</span>
                <h2 className="font-serif text-3xl text-jewel-dark mt-2 mb-4">{s.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{s.shortDescription}</p>
                {'detailedDescription' in s && s.detailedDescription && (
                  <p className="text-gray-500 text-sm leading-relaxed">{s.detailedDescription}</p>
                )}
                <div className="mt-6 flex gap-3">
                  <a href={`https://wa.me/918698909955?text=Hello! I want to enquire about your ${encodeURIComponent(s.title)} service.`} target="_blank" rel="noopener noreferrer" className="btn-gold text-xs flex items-center gap-2"><MessageCircle size={14}/>Enquire on WhatsApp</a>
                </div>
              </div>
              <div className={`bg-cream-200 aspect-video flex items-center justify-center ${ i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="text-center p-8">
                  <CheckCircle size={48} className="text-gold-400 mx-auto mb-4"/>
                  <p className="font-serif text-xl text-jewel-dark">{s.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-jewel-dark">
        <div className="container-main text-center">
          <SectionTitle title="Ready to Get Started?" subtitle="Visit our showroom or send us a WhatsApp message" light/>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a href="https://wa.me/918698909955" target="_blank" rel="noopener noreferrer" className="btn-gold">WhatsApp Us</a>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-jewel-dark">Contact Form</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
