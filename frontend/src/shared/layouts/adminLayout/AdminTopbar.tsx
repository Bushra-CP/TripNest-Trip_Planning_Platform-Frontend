import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useAdminLayout } from "../../hooks/useAdminLayout";

interface AdminTopbarProps {
  onMenuClick: () => void;
}

const AdminTopbar = ({ onMenuClick }: AdminTopbarProps) => {
  const { search, setSearch, handleLogout } = useAdminLayout();

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-6 lg:px-8">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="relative flex-1 max-w-md group">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2e7d32] transition-colors"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-4 bg-slate-100 rounded-lg text-sm outline-none border-none focus:ring-2 focus:ring-[#2e7d32]/20 transition-all"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="hidden sm:flex h-10 px-6 bg-white border-2 border-slate-100 text-slate-700 text-[11px] font-black uppercase tracking-widest rounded-lg hover:border-[#2e7d32] hover:text-slate-900 transition-all items-center justify-center gap-2"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>

        {/* Mobile Logout */}
        <button
          onClick={handleLogout}
          className="sm:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
