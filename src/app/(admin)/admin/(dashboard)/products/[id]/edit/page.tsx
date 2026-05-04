'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
}

interface ImageItem {
  id?: string;
  url: string;
  alt?: string;
  isPrimary?: boolean;
  order?: number;
  _delete?: boolean;
}

const METAL_TYPES = ['GOLD_24K', 'GOLD_22K', 'GOLD_18K', 'PLATINUM', 'SILVER', 'GEMSTONE', 'DIAMOND'];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    sku: '', name: '', slug: '', categoryId: '', description: '',
    weight: '', metalType: 'GOLD_22K', price: '', showPrice: false,
    isTopTrending: false, isNewArrival: false, isSpecialSelection: false, isVisible: true,
  });

  useEffect(() => {
    async function load() {
      const [catRes, prodRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch(`/api/admin/products/${id}`),
      ]);
      const [catData, prodData] = await Promise.all([catRes.json(), prodRes.json()]);
      setCategories(catData.data || []);
      const p = prodData.data;
      if (p) {
        setForm({
          sku: p.sku || '', name: p.name || '', slug: p.slug || '',
          categoryId: p.categoryId || '', description: p.description || '',
          weight: p.weight != null ? String(p.weight) : '',
          metalType: p.metalType || 'GOLD_22K',
          price: p.price != null ? String(p.price) : '',
          showPrice: !!p.showPrice, isTopTrending: !!p.isTopTrending,
          isNewArrival: !!p.isNewArrival, isSpecialSelection: !!p.isSpecialSelection,
          isVisible: p.isVisible !== false,
        });
        setImages(p.images || []);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'name' ? { slug: slugify(value) } : {}),
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) setImages((prev) => [...prev, { url: data.url }]);
    }
    setUploading(false);
    e.target.value = '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const activeImages = images.filter((img) => !img._delete);
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          weight: form.weight ? parseFloat(form.weight) : null,
          price: form.price ? parseFloat(form.price) : null,
          images: activeImages,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update product');
      router.push('/admin/products');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="text-gray-500 hover:text-gray-700 text-sm">← Products</Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md text-red-700 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
            <input name="sku" required value={form.sku} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input name="name" required value={form.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input name="slug" value={form.slug} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select name="categoryId" required value={form.categoryId} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none">
              <option value="">Select category…</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Metal Type</label>
            <select name="metalType" value={form.metalType} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none">
              {METAL_TYPES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" rows={3} value={form.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (grams)</label>
            <input type="number" step="0.01" name="weight" value={form.weight} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {([
            ['showPrice', 'Show Price'],
            ['isTopTrending', 'Top Trending'],
            ['isNewArrival', 'New Arrival'],
            ['isSpecialSelection', 'Special Selection'],
            ['isVisible', 'Visible'],
          ] as [keyof typeof form, string][]).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" name={key} checked={!!form[key]} onChange={handleChange} className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
              {label}
            </label>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-3">
              {images.map((img, i) => (
                <div key={i} className={`relative group ${img._delete ? 'opacity-40' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.alt || ''} className="w-20 h-20 object-cover rounded border border-gray-200" />
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.map((im, j) => j === i ? { ...im, _delete: !im._delete } : im))}
                    className={`absolute -top-1.5 -right-1.5 rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${img._delete ? 'bg-green-500' : 'bg-red-500'} text-white`}
                  >
                    {img._delete ? '+' : '×'}
                  </button>
                </div>
              ))}
            </div>
          )}
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading} className="text-sm text-gray-600" />
          {uploading && <p className="text-xs text-gray-500 mt-1">Uploading…</p>}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <Link href="/admin/products" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md text-sm font-medium transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
