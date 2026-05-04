# Bhawani Jewellers — Production-Ready Jewellery Showroom

A full-stack Next.js 14 jewellery showroom web application for **Bhawani Jewellers**, Palghar.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (REST)
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: JWT (httpOnly cookies) + bcryptjs
- **Deployment**: Vercel-ready

## Features

### Public Site
- Home page with hero, metal rate widget, product sections, testimonials, services, blog preview
- About Us page
- Collections & product listing pages
- Product detail with WhatsApp enquiry
- Services page
- Testimonials page
- Blog (list + detail)
- Contact form
- Terms & Conditions
- Wishlist (localStorage)

### Admin Panel (`/admin`)
- Secure login (email + password)
- Dashboard with stats
- Products CRUD (with image upload)
- Categories CRUD
- Metal Rates management (24K & 22K)
- Testimonials CRUD
- Services CRUD
- Blog Posts CRUD
- Enquiries viewer
- Store Settings

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/rabari1102/bhawani-jewellers.git
cd bhawani-jewellers
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/bhawani_jewellers"
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Push schema to DB
npx prisma db push

# Seed with sample data (categories, products, testimonials, services, blog posts, admin user)
npx prisma db seed
```

**Default admin credentials (from seed):**
- Email: `admin@bhawanijewellers.com`
- Password: `admin123`

> ⚠️ Change this immediately after first login via Settings.

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rabari1102/bhawani-jewellers)

### Manual Deploy

1. Push to GitHub (already done)
2. Go to [vercel.com](https://vercel.com) → New Project → Import `bhawani-jewellers`
3. Add Environment Variables in Vercel dashboard:
   - `DATABASE_URL` — your PostgreSQL connection string (use [Neon](https://neon.tech) or [Supabase](https://supabase.com) for free PostgreSQL)
   - `JWT_SECRET` — a random 32+ char string
   - `NEXT_PUBLIC_SITE_URL` — your Vercel deployment URL
4. Deploy!
5. After deploy, run migrations:
   ```bash
   npx prisma db push  # from your local machine with prod DATABASE_URL
   npx prisma db seed
   ```

### Recommended Free PostgreSQL: Neon

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project → Copy the connection string
3. Paste as `DATABASE_URL` in Vercel env vars

## Project Structure

```
bhawani-jewellers/
├── prisma/
│   ├── schema.prisma          # Database models
│   └── seed.ts                # Seed data
├── public/
│   └── uploads/               # Uploaded images stored here
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages
│   │   │   ├── page.tsx       # Home
│   │   │   ├── about/
│   │   │   ├── collections/
│   │   │   ├── products/
│   │   │   ├── services/
│   │   │   ├── testimonials/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   ├── wishlist/
│   │   │   └── terms/
│   │   ├── admin/             # Admin panel
│   │   │   ├── login/
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── metal-rates/
│   │   │   ├── testimonials/
│   │   │   ├── services/
│   │   │   ├── blog/
│   │   │   ├── enquiries/
│   │   │   └── settings/
│   │   └── api/               # API routes
│   │       ├── contact/
│   │       ├── products/
│   │       └── admin/
│   ├── components/
│   │   ├── public/            # Public UI components
│   │   └── admin/             # Admin UI components
│   ├── hooks/
│   │   └── useWishlist.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   └── types/
├── middleware.ts               # Route protection
└── vercel.json
```

## Brand Details

- **Store**: Bhawani Jewellers
- **Address**: Shop No 3, Opposite Hutatma Chowk, Mahim Road, Palghar West - 401404
- **Phone**: +91 86989 09955
- **Hours**: Open daily 9 AM – 8:30 PM
- **Email**: info@bhawanijewellers.com

## License

Private — All rights reserved © 2024 Bhawani Jewellers
