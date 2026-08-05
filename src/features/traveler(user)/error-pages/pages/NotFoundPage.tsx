import { Search, Home, HelpCircle } from "lucide-react";

/**
 * TripNest 404 Page Not Found Component
 *
 * A high-fidelity, universal 404 error screen.
 * Features:
 * - Minimalist centered layout with a dotted background texture
 * - Brand-aligned styling using the Vibrant Authority design system (#2e7d32)
 * - Clear recovery actions: Back to Dashboard and Search
 * - System status indicator for operational transparency
 * - Framework: React + Vite + Tailwind CSS + Lucide Icons
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif] flex flex-col relative overflow-hidden">
      {/* Background Texture (Subtle Dot Pattern) */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#2e7d32 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Global Header */}
      <header className="h-16 flex items-center justify-between px-6 md:px-12 bg-white relative z-10">
        <div className="text-2xl font-black text-[#2e7d32] tracking-tighter uppercase">
          TripNest
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <HelpCircle size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        {/* Error Illustration / Icon */}
        <div className="mb-8 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center relative">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#2e7d32]"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#2e7d32] rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Messaging */}
        <div className="text-center max-w-xl mx-auto space-y-4 mb-12">
          <h1 className="text-[120px] md:text-[160px] font-black text-slate-100 leading-none tracking-tighter select-none">
            404
          </h1>
          <div className="relative -mt-12 md:-mt-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Page Not Found
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-sm mx-auto">
              The page you are looking for might have been moved, renamed, or is
              temporarily unavailable.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <button className="w-full sm:w-auto h-12 px-8 bg-[#2e7d32] hover:bg-[#256628] text-white font-bold rounded-lg shadow-lg shadow-[#2e7d32]/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            <Home size={18} />
            Back to Dashboard
          </button>
          <button className="w-full sm:w-auto h-12 px-8 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            <Search size={18} />
            Search
          </button>
        </div>

        {/* System Status Indicator */}
        <div className="mt-16 flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full animate-in fade-in duration-1000 delay-500">
          <div className="w-2 h-2 bg-[#2e7d32] rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            System Operational
          </span>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="text-sm font-bold text-slate-900 uppercase tracking-tighter">
          TripNest
        </div>
        <div className="flex items-center gap-8">
          {["Support", "System Status", "Privacy"].map((link) => (
            <button
              key={link}
              className="text-[11px] font-bold text-slate-400 hover:text-[#2e7d32] transition-colors uppercase tracking-widest"
            >
              {link}
            </button>
          ))}
        </div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          © 2024 TripNest. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;
