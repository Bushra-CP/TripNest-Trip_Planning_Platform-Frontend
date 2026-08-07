import { Bell, LogOut, Search } from "lucide-react";
import { useAdminLayout } from "./useAdminLayout";

const AdminTopbar = () => {
  const { search, setSearch, handleLogout } = useAdminLayout();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="relative w-[400px] group">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2e7d32] transition-colors"
          size={18}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full h-10 pl-10 pr-4 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#2e7d32]/20 transition-all outline-none"
        />
      </div>

      <div className="flex items-center gap-5">
        {/* <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />

          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button> */}

        <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <button
          onClick={handleLogout}
          className="h-10 px-6 bg-white border-2 border-slate-100 text-slate-700 text-[11px] font-black uppercase tracking-widest rounded-lg hover:border-[#2e7d32] hover:text-slate-900 transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
