'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, FolderOpen, Star, BookOpen, MessageSquare } from 'lucide-react';

interface Stats {
  products: number;
  categories: number;
  testimonials: number;
  blogPosts: number;
  enquiries: number;
  unreadEnquiries: number;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  interest: string | null;
  createdAt: string;
  isRead: boolean;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes, testRes, blogRes, enqRes] = await Promise.all([
          fetch('/api/admin/products?limit=1'),
          fetch('/api/admin/categories'),
          fetch('/api/admin/testimonials'),
          fetch('/api/admin/blog'),
          fetch('/api/admin/enquiries'),
        ]);
        const [prodData, catData, testData, blogData, enqData] = await Promise.all([
          prodRes.json(),
          catRes.json(),
          testRes.json(),
          blogRes.json(),
          enqRes.json(),
        ]);

        const enquiries: Enquiry[] = enqData.data || [];
        setStats({
          products: prodData.total ?? 0,
          categories: (catData.data || []).length,
          testimonials: (testData.data || []).length,
          blogPosts: (blogData.data || []).length,
          enquiries: enquiries.length,
          unreadEnquiries: enquiries.filter((e) => !e.isRead).length,
        });
        setRecentEnquiries(enquiries.slice(0, 5));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    { label: 'Products', value: stats?.products ?? '-', icon: Package, href: '/admin/products', color: 'text-amber-600' },
    { label: 'Categories', value: stats?.categories ?? '-', icon: FolderOpen, href: '/admin/categories', color: 'text-blue-600' },
    { label: 'Testimonials', value: stats?.testimonials ?? '-', icon: Star, href: '/admin/testimonials', color: 'text-yellow-600' },
    { label: 'Blog Posts', value: stats?.blogPosts ?? '-', icon: BookOpen, href: '/admin/blog', color: 'text-green-600' },
    { label: 'Enquiries', value: stats?.enquiries ?? '-', icon: MessageSquare, href: '/admin/enquiries', color: 'text-purple-600', badge: stats?.unreadEnquiries },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {statCards.map(({ label, value, icon: Icon, href, color, badge }) => (
              <Link key={label} href={href} className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                  </div>
                  <Icon className={color} size={24} />
                </div>
                {badge !== undefined && badge > 0 && (
                  <span className="mt-2 inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {badge} unread
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Enquiries</h2>
              <Link href="/admin/enquiries" className="text-sm text-amber-600 hover:text-amber-700">View all →</Link>
            </div>
            {recentEnquiries.length === 0 ? (
              <p className="text-gray-500 text-sm">No enquiries yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4 text-gray-600 font-medium">Name</th>
                      <th className="text-left py-2 pr-4 text-gray-600 font-medium">Email</th>
                      <th className="text-left py-2 pr-4 text-gray-600 font-medium">Interest</th>
                      <th className="text-left py-2 pr-4 text-gray-600 font-medium">Date</th>
                      <th className="text-left py-2 text-gray-600 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEnquiries.map((enq) => (
                      <tr key={enq.id} className={`border-b border-gray-100 ${!enq.isRead ? 'bg-yellow-50' : ''}`}>
                        <td className="py-2 pr-4 font-medium text-gray-900">{enq.name}</td>
                        <td className="py-2 pr-4 text-gray-600">{enq.email}</td>
                        <td className="py-2 pr-4 text-gray-600">{enq.interest || '—'}</td>
                        <td className="py-2 pr-4 text-gray-600">{new Date(enq.createdAt).toLocaleDateString()}</td>
                        <td className="py-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${enq.isRead ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-800'}`}>
                            {enq.isRead ? 'Read' : 'Unread'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/products/new" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">+ New Product</Link>
              <Link href="/admin/blog/new" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">+ New Blog Post</Link>
              <Link href="/admin/categories" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors">Manage Categories</Link>
              <Link href="/admin/metal-rates" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors">Update Metal Rates</Link>
              <Link href="/admin/settings" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors">Settings</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
