import {
  BarChart3,
  Flag,
  Gavel,
  LayoutDashboard,
  Settings,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "User Management",
    icon: Users,
    path: "/admin/users",
  },
  {
    label: "Moderation",
    icon: Gavel,
    path: "/admin/moderation",
  },
  {
    label: "Reports",
    icon: Flag,
    path: "/admin/reports",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[260px]
          bg-white border-r border-slate-200
          flex flex-col
          transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Logo */}
        <div className="px-8 pb-8">
          <h1 className="text-2xl font-black text-[#2e7d32] tracking-tighter uppercase mb-1">
            TripNest Admin
          </h1>

          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">
            Super Admin Console
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                    isActive
                      ? "bg-[#2e7d32]/10 text-[#2e7d32]"
                      : "text-slate-500 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />

                <span className="text-sm">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 mt-auto border-t border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?u=admin"
              alt="Admin"
              className="w-10 h-10 rounded-lg object-cover border-2 border-white ring-1 ring-slate-100"
            />

            <div>
              <p className="text-xs font-bold">Admin User</p>

              <p className="text-[10px] text-slate-400 font-medium truncate w-[140px]">
                admin@tripnest.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
