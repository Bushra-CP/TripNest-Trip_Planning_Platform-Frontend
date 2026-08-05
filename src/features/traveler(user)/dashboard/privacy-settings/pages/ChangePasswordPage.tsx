import ChangePasswordForm from "../components/ChangePasswordForm";
import { ShieldCheck } from "lucide-react";

const ChangePasswordPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4faff] to-[#e9f6fd] flex flex-col items-center justify-center p-6 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#2e7d32]/5 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#6c63ff]/5 to-transparent rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      {/* Logo */}
      <div className="flex flex-col items-center gap-2 mb-8 z-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="w-12 h-12 bg-[#2e7d32] rounded-xl flex items-center justify-center shadow-lg shadow-[#2e7d32]/20">
          <ShieldCheck className="text-white" size={24} />
        </div>

        <h1 className="text-3xl font-black text-[#2e7d32] tracking-tighter">
          TripNest
        </h1>

        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
          Secure Your Identity
        </p>
      </div>

      {/* Form */}
      <ChangePasswordForm />

      {/* Footer */}
      <div className="mt-auto pt-12 pb-6 z-10 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
          Secure Your Journey
          <span className="text-gray-300">•</span>
          TripNest AI
        </p>

        <p className="text-[9px] text-gray-300 mt-2">
          © 2024 TripNest Travel Technologies. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ChangePasswordPage;