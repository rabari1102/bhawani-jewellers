import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Bhawani Jewellers | Premium Gold & Platinum Jewellery Palghar', template: '%s | Bhawani Jewellers' },
  description: 'Bhawani Jewellers — family-owned premium jewellery showroom in Palghar. Exquisite handcrafted gold, platinum, diamond, and gemstone jewellery. Shop No 3, Palghar West.',
  keywords: ['gold jewellery Palghar', 'platinum jewellery', 'bridal jewellery', 'diamond jewellery', 'Bhawani Jewellers'],
  openGraph: {
    type: 'website',
    siteName: 'Bhawani Jewellers',
    title: 'Bhawani Jewellers | Premium Gold & Platinum Jewellery Palghar',
    description: 'Exquisite handcrafted gold, platinum, and gemstone jewellery in Palghar, Maharashtra.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
