import { Outlet } from "react-router-dom";
import AdminSidebar from "../shared/layouts/adminLayout/AdminSidebar";
import AdminTopbar from "../shared/layouts/adminLayout/AdminTopbar";

const AdminLayout = () => {
  return (
        <div className="flex min-h-screen bg-[#f7f9fb] font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">

      <AdminSidebar />

      <div className="ml-[260px]">
        <AdminTopbar />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
