import { Lock, Headphones, ExternalLink, ShieldAlert } from "lucide-react";

const UnauthorizedPage = () => {
  // Metadata for the error - would typically come from an API or error boundary
  const errorDetails = {
    sourceIp: "192.168.1.1",
    eventTime: "2024-10-27 14:32:01 UTC",
    referenceId: "TN-X-403-FORBIDDEN-091",
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col">
      {/* Global Header */}
      <header className="h-16 flex items-center justify-between px-6 md:px-12 bg-white/50 backdrop-blur-sm">
        <div className="text-2xl font-black text-[#2e7d32] tracking-tighter uppercase">
          TripNest
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:bg-white rounded-full transition-all">
            <ShieldAlert size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?u=admin"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 -mt-16">
        {/* Error Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-white border border-slate-200 rounded-[20px] shadow-sm flex items-center justify-center animate-in fade-in zoom-in duration-500">
            <Lock className="text-red-600" size={40} strokeWidth={1.5} />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 rounded-full border-4 border-[#f7f9fb] flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Messaging */}
        <div className="text-center max-w-xl mx-auto space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Access Denied
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
            You do not have permission to view this page. Please contact your
            administrator or return to your dashboard.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <button className="w-full sm:w-auto h-14 px-8 bg-[#2e7d32] hover:bg-[#256628] text-white font-bold rounded-lg shadow-lg shadow-[#2e7d32]/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            <ExternalLink size={20} />
            Go to Dashboard
          </button>
          <button className="w-full sm:w-auto h-14 px-8 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            <Headphones size={20} />
            Contact Support
          </button>
        </div>

        {/* Technical Footer */}
        <div className="mt-16 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-1000 delay-500">
          <div className="bg-white/40 border border-slate-100 rounded-xl p-4 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Source IP
            </span>
            <code className="text-xs font-mono font-semibold text-slate-600">
              {errorDetails.sourceIp}
            </code>
          </div>
          <div className="bg-white/40 border border-slate-100 rounded-xl p-4 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Event Time
            </span>
            <code className="text-xs font-mono font-semibold text-slate-600">
              {errorDetails.eventTime}
            </code>
          </div>
          <div className="bg-white/40 border border-slate-100 rounded-xl p-4 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Reference ID
            </span>
            <code className="text-xs font-mono font-semibold text-slate-600">
              {errorDetails.referenceId}
            </code>
          </div>
        </div>

        {/* Inline Status */}
        <div className="mt-8 flex items-center gap-3 px-4 py-2 bg-slate-100/50 rounded-full animate-in fade-in duration-1000 delay-700">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Error Code 403 • Unauthorized Access
          </span>
        </div>
      </main>

      {/* Site Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-slate-100 flex flex-col md:row justify-between items-center gap-6">
        <div className="text-sm font-bold text-[#2e7d32] uppercase tracking-tighter">
          TripNest
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {["Privacy Policy", "Terms of Service", "Security Audit"].map(
            (link) => (
              <button
                key={link}
                className="text-[11px] font-bold text-slate-400 hover:text-[#2e7d32] transition-colors uppercase tracking-widest"
              >
                {link}
              </button>
            ),
          )}
        </div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          © 2024 TripNest. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default UnauthorizedPage;
