import { User, Sparkles } from "lucide-react";



export const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f4faff] font-['Plus_Jakarta_Sans',sans-serif] text-[#1a1c1e]">
      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-12">
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"> */}
        {/* Personal Information Form */}
        <section className="lg:col-span-2 bg-white rounded-[40px] border border-[#cfdce4]/40 shadow-sm p-8 md:p-12 space-y-10">
          <header className="flex items-center gap-4 border-b border-[#cfdce4]/30 pb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#2e7d32]/10 text-[#2e7d32] flex items-center justify-center">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight">
                Personal Information
              </h3>
              <p className="text-sm text-slate-400 font-medium">
                Update your account details and travel preferences
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-3">
              <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Arjun Sharma"
                className="w-full h-16 px-6 bg-[#f8fbf4] border border-[#cfdce4]/40 rounded-2xl focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none font-bold text-lg"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Username
              </label>
              <input
                type="text"
                defaultValue="arjun_explorer"
                className="w-full h-16 px-6 bg-[#f8fbf4] border border-[#cfdce4]/40 rounded-2xl focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none font-bold text-lg"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="arjun.s@travelmail.com"
                className="w-full h-16 px-6 bg-[#f8fbf4] border border-[#cfdce4]/40 rounded-2xl focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none font-bold text-lg"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+91 98765 43210"
                className="w-full h-16 px-6 bg-[#f8fbf4] border border-[#cfdce4]/40 rounded-2xl focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none font-bold text-lg"
              />
            </div>
          </div>

          <div className="pt-6">
            <button className="w-full h-16 bg-white border-2 border-[#2e7d32] text-[#2e7d32] font-black text-lg rounded-2xl hover:bg-[#2e7d32] hover:text-white transition-all active:scale-95 shadow-md">
              Save Profile Changes
            </button>
          </div>
        </section>

        {/* Right Sidebar Widgets */}
        <aside className="space-y-10">
          {/* AI Call-to-Action Bar */}
          <section className="bg-[#1a1c1e] rounded-[32px] p-8 shadow-2xl relative group overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2e7d32]/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform">
                  <Sparkles className="text-white" size={28} />
                </div>
                <div>
                  <p className="text-white font-black text-lg leading-tight">
                    Ready for your next trip?
                  </p>
                  <p className="text-white/40 text-[11px] font-black uppercase tracking-widest mt-1.5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full animate-pulse" />
                    AI Powered Planner
                  </p>
                </div>
              </div>
              <button className="px-8 h-12 bg-[#2e7d32] hover:bg-[#256628] text-white text-xs font-black rounded-full transition-all active:scale-95 shadow-lg shadow-black/20 uppercase tracking-widest">
                Plan Now
              </button>
            </div>
          </section>
        </aside>
        {/* </div> */}
      </main>

      {/* Site Footer */}
      <footer className="py-16 border-t border-[#cfdce4]/30 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-2xl font-black text-[#2e7d32] tracking-tighter uppercase">
              TripNest AI
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Exploring the heart of Bharat
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-10 text-[12px] font-black text-slate-500 uppercase tracking-widest">
            <button className="hover:text-[#2e7d32] transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-[#2e7d32] transition-colors">
              Terms of Service
            </button>
            <button className="hover:text-[#2e7d32] transition-colors">
              Help Center
            </button>
            {/* <button className="hover:text-[#2e7d32] transition-colors">Safety Guidelines</button> */}
          </div>

          <div className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] text-center">
            &copy; 2024 Exploring Bharat
          </div>
        </div>
      </footer>
    </div>
  );
};
