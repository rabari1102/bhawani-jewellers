import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSidebar from './AdminSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token');
  if (!token) redirect('/admin/login');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 lg:overflow-auto">
        {/* Mobile top bar spacer */}
        <div className="lg:hidden h-14" />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
