import {
  User,
  Map,
  Bookmark,
  FileText,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";
import { clearAuth } from "@/features/traveler(user)/auth/redux/authSlice";

interface MenuItem {
  label: string;
  sub: string;
  path?: string;
  icon: React.ElementType;
  danger?: boolean;
}

interface AccountDropdownProps {
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  {
    label: "My Profile",
    sub: "Manage your personal details",
    path: "/profile",
    icon: User,
  },
  {
    label: "My Trips",
    sub: "View your planned trips",
    path: "/my-trips",
    icon: Map,
  },
  {
    label: "Saved Trips",
    sub: "Your bookmarked destinations",
    path: "/saved-trips",
    icon: Bookmark,
  },
  {
    label: "My Posts",
    sub: "Travel stories you've shared",
    path: "/posts",
    icon: FileText,
  },
  {
    label: "Notifications",
    sub: "Latest updates and alerts",
    path: "/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    sub: "Privacy and account preferences",
    path: "/settings",
    icon: Settings,
  },
];

const AccountDropdown = ({ onClose }: AccountDropdownProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const user = useSelector(selectUser);

  const handleLogout = () => {
    onClose();
    dispatch(clearAuth());
  };

  return (
    <div
      className="
      absolute
      right-0
      mt-4
      w-72
      overflow-hidden
      rounded-3xl
      border
      border-[#cfdce4]/30
      bg-white
      shadow-2xl
      animate-in
      fade-in
      slide-in-from-top-4
      duration-300
    "
    >
      {/* User Info */}

      <div className="border-b border-[#cfdce4]/30 bg-[#f8fbf4] p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#6c63ff] text-lg font-bold text-[#6c63ff]">
            {user?.fullName?.[0]?.toUpperCase() || "U"}
          </div>

          <div>
            <p className="text-base font-black">{user?.fullName}</p>

            <p className="text-xs font-medium text-slate-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Menu */}

      <div className="max-h-100 overflow-y-auto p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path!}
              onClick={onClose}
              className={`
              mb-2
              flex
              items-center
              gap-3
              rounded-2xl
              px-3 py-2.5
              transition-all
              ${
                active
                  ? "bg-[#6c63ff] text-white shadow-lg shadow-[#6c63ff]/20"
                  : "text-slate-600 hover:bg-slate-50"
              }
            `}
            >
              <div className={active ? "text-white" : "text-[#6c63ff]"}>
                <Icon size={18} />
              </div>

              <div className="flex-1 text-left">
                <p className="text-[13px] font-bold leading-none">
                  {item.label}
                </p>

                <p
                  className={`mt-1 text-[9px] font-medium ${
                    active ? "text-white/80" : "text-slate-400"
                  }`}
                >
                  {item.sub}
                </p>
              </div>

              {active && <ChevronRight size={15} />}
            </Link>
          );
        })}
      </div>

      {/* Logout */}

      <div className="border-t border-[#cfdce4]/30 p-3">
        <button
          onClick={handleLogout}
          className="
          flex
          w-full
          items-center
          gap-4
          rounded-2xl
          p-3
          text-red-500
          transition-all
          hover:bg-red-50
        "
        >
          <LogOut size={18} />

          <div className="text-left">
            <p className="text-sm font-bold leading-none">Logout</p>

            <p className="mt-1 text-[10px] font-medium text-slate-400">
              Sign out of your account
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AccountDropdown;
