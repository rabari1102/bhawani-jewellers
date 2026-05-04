import type { Product, Category, ProductImage, Testimonial, Service, BlogPost, MetalRate, Setting } from '@prisma/client';

export type ProductWithImages = Product & { images: ProductImage[]; category: Category | null };
export type ProductWithCategory = Product & { category: Category | null };
export type CategoryWithProducts = Category & { products: Product[] };

export interface WishlistItem {
  id: string;
  sku: string;
  name: string;
  imageUrl: string;
  slug: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export type { Testimonial, Service, BlogPost, MetalRate, Setting };
