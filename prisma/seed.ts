import { PrismaClient, MetalType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin
  const hash = await bcrypt.hash('Admin@123', 12);
  await prisma.admin.upsert({
    where: { email: 'admin@bhawanijewellers.com' },
    update: {},
    create: { email: 'admin@bhawanijewellers.com', passwordHash: hash, name: 'Bhawani Admin' },
  });

  // Categories
  const cats = [
    { name: 'Bridal Jewellery',   slug: 'bridal',    description: 'Exquisite bridal sets for your special day', order: 1 },
    { name: 'Gold Jewellery',     slug: 'gold',      description: 'Handcrafted 22K & 24K gold pieces', order: 2 },
    { name: 'Platinum Jewellery', slug: 'platinum',  description: 'Timeless platinum jewellery', order: 3 },
    { name: 'Gemstone Jewellery', slug: 'gemstone',  description: 'Vibrant gemstone-studded creations', order: 4 },
    { name: 'Diamond Jewellery',  slug: 'diamond',   description: 'Certified diamond jewellery', order: 5 },
    { name: 'Custom / Bespoke',   slug: 'bespoke',   description: 'One-of-a-kind pieces designed for you', order: 6 },
  ];
  for (const cat of cats) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
  }
  const catMap: Record<string, string> = {};
  const allCats = await prisma.category.findMany();
  for (const c of allCats) catMap[c.slug] = c.id;

  // Products
  const products = [
    { sku: 'BJ-1001', name: 'Kundan Bridal Necklace Set', slug: 'kundan-bridal-necklace-set', metalType: MetalType.GOLD_22K, weight: 45.5, isTopTrending: true, isNewArrival: false, isSpecialSelection: true, categorySlug: 'bridal', description: 'Stunning kundan bridal necklace with matching earrings and maang tikka, crafted in 22K gold.' },
    { sku: 'BJ-1002', name: 'Temple Gold Bangles (Pair)', slug: 'temple-gold-bangles', metalType: MetalType.GOLD_22K, weight: 22.3, isTopTrending: true, isNewArrival: true, isSpecialSelection: false, categorySlug: 'gold', description: 'Traditional South Indian temple design bangles in 22K gold, sold as a pair.' },
    { sku: 'BJ-1003', name: 'Solitaire Diamond Pendant', slug: 'solitaire-diamond-pendant', metalType: MetalType.DIAMOND, weight: 3.1, isTopTrending: true, isNewArrival: true, isSpecialSelection: true, categorySlug: 'diamond', description: 'Certified 0.5ct solitaire diamond pendant set in 18K white gold.' },
    { sku: 'BJ-1004', name: 'Platinum Wedding Band', slug: 'platinum-wedding-band', metalType: MetalType.PLATINUM, weight: 8.7, isTopTrending: false, isNewArrival: true, isSpecialSelection: true, categorySlug: 'platinum', description: 'Classic platinum wedding band with a matte finish, ideal for couples.' },
    { sku: 'BJ-1005', name: 'Ruby & Gold Choker', slug: 'ruby-gold-choker', metalType: MetalType.GOLD_22K, weight: 18.9, isTopTrending: true, isNewArrival: false, isSpecialSelection: true, categorySlug: 'gemstone', description: 'Handcrafted 22K gold choker adorned with natural rubies.' },
    { sku: 'BJ-1006', name: 'Heritage Gold Chain', slug: 'heritage-gold-chain', metalType: MetalType.GOLD_22K, weight: 12.4, isTopTrending: false, isNewArrival: true, isSpecialSelection: false, categorySlug: 'gold', description: 'Classic heritage-style 22K gold chain, perfect for daily wear.' },
    { sku: 'BJ-1007', name: 'Emerald Drop Earrings', slug: 'emerald-drop-earrings', metalType: MetalType.GOLD_22K, weight: 6.2, isTopTrending: true, isNewArrival: true, isSpecialSelection: false, categorySlug: 'gemstone', description: 'Elegant drop earrings featuring natural emeralds in 22K gold bezels.' },
    { sku: 'BJ-1008', name: 'Bespoke Anniversary Ring', slug: 'bespoke-anniversary-ring', metalType: MetalType.GOLD_18K, weight: 4.5, isTopTrending: false, isNewArrival: false, isSpecialSelection: true, categorySlug: 'bespoke', description: 'Custom-designed anniversary ring crafted to your specifications in 18K gold.' },
  ];
  for (const p of products) {
    const { categorySlug, ...data } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...data,
        categoryId: catMap[categorySlug],
        images: {
          create: [{
            url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
            alt: p.name,
            isPrimary: true,
            order: 0,
          }],
        },
      },
    });
  }

  // Metal Rates
  await prisma.metalRate.upsert({ where: { id: 'rate-24k' }, update: { ratePerGram: 7250.00 }, create: { id: 'rate-24k', metalType: 'GOLD_24K', ratePerGram: 7250.00 } });
  await prisma.metalRate.upsert({ where: { id: 'rate-22k' }, update: { ratePerGram: 6645.00 }, create: { id: 'rate-22k', metalType: 'GOLD_22K', ratePerGram: 6645.00 } });

  // Testimonials
  const testimonials = [
    { customerName: 'Priya M.', location: 'Palghar', reviewText: 'My bridal set from Bhawani Jewellers was absolutely breathtaking. The craftsmen paid attention to every tiny detail, and I received so many compliments on my wedding day. Truly heirloom quality!', rating: 5, order: 1 },
    { customerName: 'Rahul K.', location: 'Vasai', reviewText: 'I brought in my grandmother\'s old necklace to be redesigned, and the team transformed it into a stunning modern piece while preserving its sentimental character. Exceptional skill and care.', rating: 5, order: 2 },
    { customerName: 'Neha & Amit', location: 'Mumbai', reviewText: 'Shopping for our wedding jewellery was stress-free at Bhawani Jewellers. They explained every detail about purity, pricing, and craftsmanship transparently. We left as very satisfied customers.', rating: 5, order: 3 },
    { customerName: 'Sunita R.', location: 'Palghar', reviewText: 'The hallmarking service gave me complete peace of mind about my gold bangles. Quick, professional, and trustworthy.', rating: 5, order: 4 },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.upsert({ where: { id: t.customerName.replace(/[^a-z]/gi, '-').toLowerCase() }, update: {}, create: { id: t.customerName.replace(/[^a-z]/gi, '-').toLowerCase(), ...t } });
  }

  // Services
  const services = [
    { title: 'Bespoke Jewellery Design', shortDescription: 'Work directly with our master craftsmen to create one-of-a-kind pieces that reflect your vision.', detailedDescription: 'Our bespoke design service starts with a personal consultation where you share your vision, preferred metal, gemstones, and style references. Our artisans then sketch, model, and craft your unique piece from scratch, keeping you involved at every stage.', icon: 'pencil-ruler', order: 1 },
    { title: 'Redesign & Restoration', shortDescription: 'Transform old or inherited jewellery into contemporary masterpieces while preserving their sentimental value.', detailedDescription: 'Breathe new life into heirloom jewellery. We carefully dismantle your existing piece, retain the precious metals and stones, and redesign it into a modern creation that honours its heritage.', icon: 'refresh-cw', order: 2 },
    { title: 'BIS Hallmarking', shortDescription: 'Certified hallmarking for gold and silver jewellery, guaranteeing metal purity and authenticity.', detailedDescription: 'We provide official BIS hallmarking services, ensuring your jewellery carries the government-recognised purity stamp. Hallmarked jewellery gives you and future buyers complete confidence in quality.', icon: 'shield-check', order: 3 },
    { title: 'Jewellery Valuation', shortDescription: 'Professional valuation reports for insurance, taxation, estate planning, or personal records.', detailedDescription: 'Our certified valuers assess your jewellery based on current market rates, craftsmanship, and gemstone quality, providing a detailed valuation certificate accepted by banks and insurers.', icon: 'trending-up', order: 4 },
    { title: 'Quality Assurance', shortDescription: 'Every piece sold by Bhawani Jewellers undergoes rigorous multi-point quality checks before delivery.', detailedDescription: 'From metal purity tests to setting inspections and finish checks, we ensure that every jewellery piece that leaves our store meets the highest standards of craftsmanship and durability.', icon: 'badge-check', order: 5 },
    { title: 'Free Cleaning & Polishing', shortDescription: 'Complimentary professional cleaning and polishing to keep your jewellery sparkling for life.', detailedDescription: 'Bring in any jewellery purchased from us for a complimentary cleaning and polishing session. We use ultrasonic and steam cleaning techniques to restore the original brilliance of your pieces.', icon: 'sparkles', order: 6 },
  ];
  for (const s of services) {
    await prisma.service.upsert({ where: { id: s.title.replace(/[^a-z]/gi, '-').toLowerCase() }, update: {}, create: { id: s.title.replace(/[^a-z]/gi, '-').toLowerCase(), ...s } });
  }

  // Blog Posts
  const blogs = [
    { title: 'How to Choose the Perfect Bridal Necklace', slug: 'how-to-choose-bridal-necklace', excerpt: 'From kundan to polki, here is everything you need to know before selecting your bridal necklace.', content: '## Choosing Your Bridal Necklace\n\nYour bridal necklace is perhaps the most important jewellery you will ever wear. Here are the key things to consider...\n\n### 1. Match Your Neckline\nA deep V-neck pairs beautifully with a long pendant necklace, while a high-neck blouse complements a statement choker.\n\n### 2. Consider Your Face Shape\nOval and round faces suit longer, angular necklaces. Heart-shaped faces look stunning with layered chokers.\n\n### 3. Metal Type Matters\n22K gold offers warmth and richness suited to traditional bridal looks. Platinum and 18K white gold complement contemporary gowns.\n\n### 4. Budget Wisely\nAllocate 30–40% of your overall jewellery budget to the necklace set as it will be the focal piece.\n\nVisit Bhawani Jewellers in Palghar to explore our exclusive bridal collection and get personalised guidance from our experts.', isPublished: true, publishedAt: new Date('2024-08-15') },
    { title: 'Tips for Maintaining Gold Jewellery Shine', slug: 'tips-maintaining-gold-jewellery-shine', excerpt: 'Keep your gold jewellery gleaming with these simple, expert-backed care tips.', content: '## Keeping Gold Jewellery Radiant\n\n### Daily Care\n- Remove jewellery before bathing, swimming, or exercising\n- Avoid contact with perfumes, lotions, and household chemicals\n- Wipe gently with a soft cotton cloth after wearing\n\n### Storage\nStore each piece separately in a soft pouch or lined box to prevent scratches. Keep away from humidity.\n\n### Professional Cleaning\nBring your gold pieces to Bhawani Jewellers every 6–12 months for our complimentary ultrasonic cleaning and polishing service.\n\n### When to Seek Help\nIf you notice discolouration, loose settings, or damaged clasps, bring the piece in immediately for inspection.', isPublished: true, publishedAt: new Date('2024-09-20') },
    { title: 'Understanding Gold Purity: 24K, 22K, and 18K Explained', slug: 'understanding-gold-purity', excerpt: 'Not all gold is the same. Learn the differences between 24K, 22K, and 18K gold before your next purchase.', content: '## Gold Purity Guide\n\n### 24K Gold (999)\nPurest form of gold — 99.9% gold. Soft and not ideal for jewellery with intricate details, but perfect for coins and bars. High investment value.\n\n### 22K Gold (916)\nMost popular for jewellery in India. Contains 91.6% gold mixed with silver or copper for added strength. Ideal for necklaces, bangles, and rings.\n\n### 18K Gold (750)\nContains 75% gold. Harder and more durable, making it ideal for diamond and gemstone jewellery. Has a slightly less intense colour but greater scratch resistance.\n\n### BIS Hallmark\nAlways look for the BIS Hallmark certification when buying gold jewellery. Bhawani Jewellers provides hallmarked jewellery with certified purity guarantees.', isPublished: true, publishedAt: new Date('2024-10-05') },
  ];
  for (const b of blogs) {
    await prisma.blogPost.upsert({ where: { slug: b.slug }, update: {}, create: b });
  }

  // Settings
  const settings = [
    { key: 'store_name', value: 'Bhawani Jewellers' },
    { key: 'tagline', value: 'Premium Gold & Platinum Jewellery in Palghar' },
    { key: 'address', value: 'Shop No 3, Opposite Hutatma Chowk, Mahim Road, Palghar West - 401404' },
    { key: 'phone', value: '+91 86989 09955' },
    { key: 'email', value: 'info@bhawanijewellers.com' },
    { key: 'hours', value: 'Open Daily 9 AM – 8:30 PM' },
    { key: 'whatsapp', value: '918698909955' },
    { key: 'instagram', value: 'https://instagram.com/bhawanijewellers' },
    { key: 'facebook', value: 'https://facebook.com/bhawanijewellers' },
    { key: 'hero_heading', value: 'Premium Gold & Platinum Jewellery in Palghar' },
    { key: 'hero_subheading', value: 'Exquisite handcrafted gold, platinum, and gemstone pieces blending traditional Indian artistry with contemporary elegance.' },
  ];
  for (const s of settings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
  }

  console.log('✅ Seed complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
