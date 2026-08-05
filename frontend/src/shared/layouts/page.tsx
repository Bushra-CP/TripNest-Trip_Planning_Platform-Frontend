import React, { useState, useMemo } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Circle,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

/**
 * TripNest Reset Password Component
 *
 * A high-fidelity reset password screen for a travel planning platform.
 * Features:
 * - Clean, minimalist card-based layout with floating secondary card
 * - Real-time password strength validation (Uppercase, Number, Special Char, Length)
 * - Immersive background with a soft, misty aesthetic
 * - Framework: React + Vite + Tailwind CSS + Lucide React
 */

const Page: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation requirements logic
  const requirements = useMemo(
    () => [
      { label: "Uppercase", valid: /[A-Z]/.test(password) },
      { label: "Number", valid: /[0-9]/.test(password) },
      { label: "Special Char", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
      { label: "8+ Characters", valid: password.length >= 8 },
    ],
    [password],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      requirements.every((req) => req.valid) &&
      password === confirmPassword
    ) {
      console.log("Password successfully reset");
      // API call to update password would go here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4faff] to-[#e9f6fd] flex flex-col items-center justify-center p-6 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      {/* Background Decor / Gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#2e7d32]/5 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#6c63ff]/5 to-transparent rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      {/* Brand Header */}
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

      <div className="relative w-full max-w-[1100px] h-[600px] flex items-center justify-center z-10">
        {/* Main Reset Card */}
        <div className="relative z-20 w-full max-w-[480px] bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white animate-in zoom-in-95 duration-500">
          <header className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              New Password
            </h2>
            <p className="text-gray-500 text-xs font-medium">
              Create a new secure password for your account.
            </p>
          </header>
          <div className="relative z-20 w-full max-w-[480px]">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* New Password Input */}
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

              {/* Confirm Password Input */}
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
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Requirements Grid */}
              <div className="grid grid-cols-2 gap-y-3 pt-2">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {req.valid ? (
                      <CheckCircle2 size={16} className="text-[#2e7d32]" />
                    ) : (
                      <Circle size={16} className="text-gray-300" />
                    )}
                    <span
                      className={`text-xs font-semibold ${req.valid ? "text-gray-900" : "text-gray-400"}`}
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-14 bg-[#2e7d32] hover:bg-[#256628] active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-[#2e7d32]/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                Update Password
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
            <button className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#2e7d32] transition-colors">
              <HelpCircle size={18} />
              Need help with your account?
            </button>
          </div>
        </div>

        {/* Floating Side Card */}
        <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 z-10">
          <div className="w-[240px] h-[360px] rotate-9 hover:rotate-0 transition-transform duration-500">
            <div className="absolute inset-0 bg-white rounded-[32px] shadow-2xl border border-white">
              <div className="h-full w-full rounded-2xl overflow-hidden relative group">
                <img
                  src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600"
                  alt="Kerala Tea Gardens"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-black text-xl leading-tight mb-2">
                    Security at every step.
                  </h3>

                  <p className="text-white/80 text-xs">
                    Explore Kerala with peace of mind knowing your data is
                    protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-auto pt-12 pb-6 z-10 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
          Secure Your Journey <span className="text-gray-300">•</span> TripNest
          AI
        </p>
        <p className="text-[9px] text-gray-300 mt-2">
          © 2024 TripNest Travel Technologies. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Page;
