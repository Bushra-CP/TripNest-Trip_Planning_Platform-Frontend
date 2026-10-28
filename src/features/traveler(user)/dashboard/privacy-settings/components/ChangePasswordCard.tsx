import { LockKeyhole, ChevronRight } from "lucide-react";
import { usePrivacySettings } from "../hooks/usePrivacySettings";

const ChangePasswordCard = () => {
  const { onChangePassword } = usePrivacySettings();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border border-slate-100 hover:bg-slate-50/50 transition-all">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2e7d32]/10 text-[#6c63ff] flex items-center justify-center shrink-0">
        <LockKeyhole size={18} className="sm:w-5 sm:h-5" />
      </div>

      <div className="flex-1">
        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">
          Password
        </p>

        <p className="text-xs sm:text-sm text-gray-900 tracking-[0.25em] sm:tracking-[0.35em]">
          ••••••••••••••••
        </p>

        <p className="hidden sm:block text-xs text-slate-400 mt-1">
          Change your account password regularly for better security.
        </p>
      </div>

      <button
        onClick={onChangePassword}
        className="h-9 sm:h-10 px-4 sm:px-5 text-xs sm:text-sm rounded-xl border-2 border-[#6c63ff] text-[#6c63ff] hover:bg-[#6c63ff] hover:text-white transition flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        Change
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default ChangePasswordCard;
