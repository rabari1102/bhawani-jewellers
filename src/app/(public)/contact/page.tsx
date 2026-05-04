import type { Metadata } from 'next';
import SectionTitle from '@/components/public/SectionTitle';
import ContactForm from '@/components/public/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Bhawani Jewellers',
  description: 'Get in touch with Bhawani Jewellers, Palghar. Visit our showroom, call us, or send a message for jewellery enquiries.',
};

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-jewel-dark py-20 px-4 text-center">
        <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">We&apos;d Love to Hear from You</p>
        <h1 className="font-serif text-4xl md:text-6xl text-white">Contact Us</h1>
      </section>

      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Info */}
            <div>
              <SectionTitle title="Visit Our Showroom" center={false}/>
              <div className="space-y-5 mb-8">
                <div className="flex gap-4">
                  <MapPin className="text-gold-500 shrink-0 mt-1" size={18}/>
                  <div>
                    <p className="font-medium text-jewel-dark text-sm mb-1">Store Address</p>
                    <p className="text-gray-500 text-sm leading-relaxed">Shop No 3, Opposite Hutatma Chowk,<br/>Mahim Road, Palghar West – 401404,<br/>Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-gold-500 shrink-0" size={18}/>
                  <div>
                    <p className="font-medium text-jewel-dark text-sm mb-1">Phone</p>
                    <a href="tel:+918698909955" className="text-gray-500 text-sm hover:text-gold-600 transition-colors">+91 86989 09955</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-gold-500 shrink-0" size={18}/>
                  <div>
                    <p className="font-medium text-jewel-dark text-sm mb-1">Email</p>
                    <a href="mailto:info@bhawanijewellers.com" className="text-gray-500 text-sm hover:text-gold-600 transition-colors">info@bhawanijewellers.com</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-gold-500 shrink-0" size={18}/>
                  <div>
                    <p className="font-medium text-jewel-dark text-sm mb-1">Opening Hours</p>
                    <p className="text-gray-500 text-sm">Open Daily: 9 AM – 8:30 PM</p>
                    <p className="text-gray-400 text-xs mt-1">Including Sundays & public holidays</p>
                  </div>
                </div>
              </div>
              {/* Map */}
              <div className="h-64 overflow-hidden bg-cream-200">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.0!2d72.76!3d19.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDQxJzI0LjAiTiA3MsKwNDUnMzYuMCJF!5e0!3m2!1sen!2sin!4v1234" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Bhawani Jewellers – Palghar"/>
              </div>
              <a href="https://maps.google.com/?q=Palghar+West+Mahim+Road+Shop+3" target="_blank" rel="noopener noreferrer" className="btn-gold text-xs mt-4 inline-block">Get Directions</a>
            </div>
            {/* Form */}
            <div>
              <SectionTitle title="Send Us a Message" center={false}/>
              <ContactForm/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
