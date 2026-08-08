import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../shared/layouts/adminLayout/AdminSidebar";
import AdminTopbar from "../shared/layouts/adminLayout/AdminTopbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f9fb] font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-col min-h-screen lg:ml-[260px]">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
