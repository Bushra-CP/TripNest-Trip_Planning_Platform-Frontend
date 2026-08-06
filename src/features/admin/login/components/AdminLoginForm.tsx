import {
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useLogin } from "@/features/traveler(user)/auth/hooks/useLogin";

const AdminLoginForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
    showPassword,
    togglePasswordVisibility,
  } = useLogin();

  return (
    <div className="w-full bg-white border border-gray-100 rounded-sm p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
      <header className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          Administrator Login
        </h3>

        <p className="text-gray-500 text-sm font-medium">
          Access authorized community controls
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Admin ID */}

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
            Email
          </label>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2e7d32]">
              <Mail size={18} />
            </div>

            <input
              type="text"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-sm focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/5 outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
            Password
          </label>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2e7d32]">
              <Lock size={18} />
            </div>

            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••••••"
              className="w-full h-14 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-sm focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/5 outline-none"
              required
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember */}

        <div className="flex items-center justify-between">
          <button type="button" className="text-xs font-bold text-[#2e7d32]">
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full h-14 bg-[#2e7d32] hover:bg-[#256628] text-white rounded-sm font-bold flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <LoaderCircle size={20} className="animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              Sign In to Dashboard
              <LogIn size={20} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-50 flex items-start gap-3">
        <ShieldCheck className="text-[#2e7d32]" size={18} />

        <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
          BY ACCESSING THIS TERMINAL, YOU AGREE TO SYSTEM MONITORING. ALL
          ACTIONS ARE LOGGED AND AUDITED UNDER TRIPNEST SECURITY PROTOCOL 4.2.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginForm;
