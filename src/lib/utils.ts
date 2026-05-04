import { MetalType } from '@prisma/client';

export const METAL_LABELS: Record<MetalType, string> = {
  GOLD_24K:  'Gold 24K (999)',
  GOLD_22K:  'Gold 22K (916)',
  GOLD_18K:  'Gold 18K (750)',
  PLATINUM:  'Platinum',
  SILVER:    'Silver',
  DIAMOND:   'Diamond',
  GEMSTONE:  'Gemstone',
  MIXED:     'Mixed Metals',
};

export function waLink(message: string) {
  return `https://wa.me/918698909955?text=${encodeURIComponent(message)}`;
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function formatTime(date: Date | string) {
  return new Date(date).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
