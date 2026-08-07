import {
  BarChart3,
  Flag,
  Gavel,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

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

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-slate-200 flex flex-col">
      <div className="p-8">
        <h1 className="text-2xl font-black text-[#2e7d32] tracking-tighter uppercase mb-1">
          TripNest Admin
        </h1>

        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">
          Super Admin Console
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all
                ${
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
    </aside>
  );
};

export default AdminSidebar;
