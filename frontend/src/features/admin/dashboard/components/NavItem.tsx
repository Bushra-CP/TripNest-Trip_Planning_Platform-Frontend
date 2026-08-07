import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  path: string;
}

const NavItem = ({
  label,
  icon: Icon,
  path,
}: NavItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
          isActive
            ? "bg-[#2e7d32]/10 text-[#2e7d32] shadow-sm shadow-[#2e7d32]/5"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={20}
            className={
              isActive
                ? "text-[#2e7d32]"
                : "text-slate-400"
            }
          />

          <span className="text-sm">{label}</span>

          {isActive && (
            <div className="ml-auto w-1 h-5 rounded-full bg-[#2e7d32]" />
          )}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;