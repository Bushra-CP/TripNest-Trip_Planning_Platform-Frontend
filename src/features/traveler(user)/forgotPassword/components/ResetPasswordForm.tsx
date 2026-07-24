import React from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Circle,
  LoaderCircle,
} from "lucide-react";

import { useResetPassword } from "../hooks/useResetPassword";

const ResetPasswordForm: React.FC = () => {
  const {
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    requirements,
    isLoading,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleSubmit,
  } = useResetPassword();

  return (
    <div className="max-w-120 w-full bg-white rounded-4xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white animate-in zoom-in-95 duration-500">
      <header className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">New Password</h2>

        <p className="text-gray-500 text-xs font-medium">
          Create a new secure password for your account.
        </p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* New Password */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
            New Password
          </label>

          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-14 pl-12 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none text-gray-900 font-medium placeholder:text-gray-400"
              required
            />

            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2e7d32] transition-colors"
              size={20}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <p className="text-[10px] text-gray-400 ml-1 italic">
            Must be at least 8 characters long.
          </p>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
            Confirm New Password
          </label>

          <div className="relative group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-14 pl-12 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none text-gray-900 font-medium placeholder:text-gray-400"
              required
            />

            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2e7d32] transition-colors"
              size={20}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="grid grid-cols-2 gap-y-3 pt-2">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2">
              {req.valid ? (
                <CheckCircle2 size={16} className="text-[#2e7d32]" />
              ) : (
                <Circle size={16} className="text-gray-300" />
              )}

              <span
                className={`text-xs font-semibold ${
                  req.valid ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {req.label}
              </span>
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-[#2e7d32] hover:bg-[#256628] disabled:opacity-50 disabled:hover:bg-[#2e7d32] active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-[#2e7d32]/20 transition-all flex items-center justify-center gap-2 mt-4"
        >
          {isLoading ? (
            <>
              <LoaderCircle size={20} className="animate-spin" />
              Updating Password...
            </>
          ) : (
            <>
              Update Password
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
