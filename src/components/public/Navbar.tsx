'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, Phone } from 'lucide-react';

const NAV_LINKS = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'About Us' },
  { href: '/collections',  label: 'Collections' },
  { href: '/services',     label: 'Services' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog',         label: 'Blog' },
  { href: '/contact',      label: 'Contact Us' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname              = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-jewel-dark shadow-lg' : 'bg-transparent'
    }`}>
      {/* Top bar */}
      <div className="bg-gold-500 text-white text-xs py-1.5 px-4 text-center">
        <span>Open Daily 9 AM – 8:30 PM</span>
        <span className="mx-3">|</span>
        <a href="tel:+918698909955" className="hover:underline inline-flex items-center gap-1">
          <Phone size={11}/> +91 86989 09955
        </a>
      </div>
      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 44 44" width="36" height="36" fill="none" aria-label="Bhawani Jewellers logo">
            <circle cx="22" cy="22" r="20" stroke="#d4a017" strokeWidth="1.5"/>
            <path d="M14 28 L22 12 L30 28" stroke="#d4a017" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M16.5 23 H27.5" stroke="#d4a017" strokeWidth="1"/>
            <circle cx="22" cy="12" r="2" fill="#d4a017"/>
          </svg>
          <div>
            <span className="font-serif text-xl text-white tracking-wide">Bhawani</span>
            <span className="font-serif text-xl text-gold-400 tracking-wide"> Jewellers</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <Link href={l.href} className={`text-xs tracking-wider uppercase transition-colors duration-200 ${
                pathname === l.href ? 'text-gold-400' : 'text-gray-300 hover:text-gold-300'
              }`}>{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/wishlist" className="text-gray-300 hover:text-gold-400 transition-colors"><Heart size={18}/></Link>
          <Link href="/admin/login" className="btn-gold text-xs px-4 py-2">Admin</Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-jewel-dark border-t border-gold-800 px-4 py-6">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3 text-sm text-gray-200 hover:text-gold-400 border-b border-gold-900/30 last:border-0">
              {l.label}
            </Link>
          ))}
          <div className="mt-4 flex gap-3">
            <Link href="/wishlist" className="btn-outline border-gold-400 text-gold-400 text-xs px-4 py-2 flex-1 text-center">Wishlist</Link>
            <Link href="/admin/login" className="btn-gold text-xs px-4 py-2 flex-1 text-center">Admin</Link>
          </div>
        </div>
      )}
    </header>
  );
}
