import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'About Us' },
  { href: '/collections',  label: 'Collections' },
  { href: '/services',     label: 'Services' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog',         label: 'Blog' },
  { href: '/contact',      label: 'Contact Us' },
  { href: '/terms',        label: 'Terms & Conditions' },
];

export default function Footer() {
  return (
    <footer className="bg-jewel-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <svg viewBox="0 0 44 44" width="32" height="32" fill="none">
              <circle cx="22" cy="22" r="20" stroke="#d4a017" strokeWidth="1.5"/>
              <path d="M14 28 L22 12 L30 28" stroke="#d4a017" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M16.5 23 H27.5" stroke="#d4a017" strokeWidth="1"/>
              <circle cx="22" cy="12" r="2" fill="#d4a017"/>
            </svg>
            <span className="font-serif text-xl text-white">Bhawani <span className="text-gold-400">Jewellers</span></span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 max-w-sm mb-5">
            Family-owned jewellery showroom in Palghar crafting premium gold, platinum, diamond, and gemstone jewellery since 2024. Blending traditional Indian artistry with contemporary elegance.
          </p>
          <div className="flex gap-3">
            <a href="https://instagram.com/bhawanijewellers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-400 transition-colors"><Instagram size={18}/></a>
            <a href="https://facebook.com/bhawanijewellers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-400 transition-colors"><Facebook size={18}/></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-white text-lg mb-5">Quick Links</h4>
          <ul className="space-y-2">
            {QUICK_LINKS.map(l => (
              <li key={l.href}><Link href={l.href} className="text-sm text-gray-400 hover:text-gold-400 transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-white text-lg mb-5">Visit Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin size={14} className="text-gold-500 shrink-0 mt-0.5"/><span className="text-gray-400">Shop No 3, Opposite Hutatma Chowk, Mahim Road, Palghar West – 401404</span></li>
            <li className="flex gap-2"><Phone size={14} className="text-gold-500"/><a href="tel:+918698909955" className="text-gray-400 hover:text-gold-400">+91 86989 09955</a></li>
            <li className="flex gap-2"><Mail size={14} className="text-gold-500"/><a href="mailto:info@bhawanijewellers.com" className="text-gray-400 hover:text-gold-400">info@bhawanijewellers.com</a></li>
            <li className="flex gap-2"><Clock size={14} className="text-gold-500"/><span className="text-gray-400">Open Daily 9 AM – 8:30 PM</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold-900/40 py-5 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Bhawani Jewellers. All rights reserved.
      </div>
    </footer>
  );
}
