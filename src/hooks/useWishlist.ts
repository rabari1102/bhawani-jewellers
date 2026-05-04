'use client';
import { useState, useEffect, useCallback } from 'react';
import type { WishlistItem } from '@/types';

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('bj_wishlist');
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  const save = (next: WishlistItem[]) => {
    setItems(next);
    try { sessionStorage.setItem('bj_wishlist', JSON.stringify(next)); } catch {}
  };

  const add = useCallback((item: WishlistItem) => {
    setItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      const next = [...prev, item];
      try { sessionStorage.setItem('bj_wishlist', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== id);
      try { sessionStorage.setItem('bj_wishlist', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggle = useCallback((item: WishlistItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      const next = exists ? prev.filter(i => i.id !== item.id) : [...prev, item];
      try { sessionStorage.setItem('bj_wishlist', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const has = useCallback((id: string) => items.some(i => i.id === id), [items]);

  return { items, add, remove, toggle, has, count: items.length };
}
