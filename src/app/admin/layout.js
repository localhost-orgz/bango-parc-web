import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f3f4f7]">
      <Sidebar />

      <main className="flex-1 min-w-0 overflow-auto">
        <div className="min-h-screen bg-white p-6">{children}</div>
      </main>
    </div>
  );
}
