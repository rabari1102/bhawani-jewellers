'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  sku: string;
  name: string;
  category: Category | null;
  weight: number | null;
  metalType: string;
  isTopTrending: boolean;
  isNewArrival: boolean;
  isSpecialSelection: boolean;
  isVisible: boolean;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch('/api/admin/products?limit=200');
    const data = await res.json();
    setProducts(data.data || []);
    setLoading(false);
  }

  useEffect(() => { fetchProducts(); }, []);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const Bool = ({ val }: { val: boolean }) =>
    val ? <span className="text-green-600 font-bold">✓</span> : <span className="text-gray-400">✗</span>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link href="/admin/products/new" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search by name or SKU…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full max-w-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {loading ? (
          <p className="p-6 text-gray-500">Loading…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['SKU', 'Name', 'Category', 'Weight', 'Metal', 'Trend', 'New', 'Special', 'Visible', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-gray-600 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={10} className="px-4 py-8 text-center text-gray-500">No products found.</td></tr>
                ) : (
                  filtered.map((p, i) => (
                    <tr key={p.id} className={`border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{p.sku}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                      <td className="px-4 py-3 text-gray-600">{p.category?.name || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{p.weight ? `${p.weight}g` : '—'}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{p.metalType}</td>
                      <td className="px-4 py-3 text-center"><Bool val={p.isTopTrending} /></td>
                      <td className="px-4 py-3 text-center"><Bool val={p.isNewArrival} /></td>
                      <td className="px-4 py-3 text-center"><Bool val={p.isSpecialSelection} /></td>
                      <td className="px-4 py-3 text-center"><Bool val={p.isVisible} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/admin/products/${p.id}/edit`)}
                            className="text-amber-600 hover:text-amber-800 text-xs font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="text-red-600 hover:text-red-800 text-xs font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
