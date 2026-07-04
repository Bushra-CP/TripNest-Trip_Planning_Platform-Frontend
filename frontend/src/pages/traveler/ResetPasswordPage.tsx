import React, { useState, useMemo } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation logic
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
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f4faff] to-[#e9f6fd] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Brand Header */}
      <div className="flex flex-col items-center gap-2 mb-8 z-10">
        <h1 className="text-3xl font-black text-[#2e7d32] tracking-tighter">
          TripNest
        </h1>
      </div>

      <div className="max-w-250 w-full flex flex-col md:flex-row items-center justify-center gap-12 z-10">
        {/* Main Reset Card */}
        <div className="max-w-120 w-full bg-white rounded-4xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white animate-in zoom-in-95 duration-500">
          <header className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              New Password
            </h2>
            <p className="text-gray-500 text-xs font-medium">
              Create a new secure password for your account.
            </p>
          </header>

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

        {/* Floating Side Card (Kerala Context) */}
        <div className="hidden lg:block relative w-[320px] h-110 rotate-3 hover:rotate-0 transition-transform duration-500">
          <div className="absolute inset-0 bg-white rounded-4xl p-4 shadow-2xl border border-white">
            <div className="h-full w-full rounded-2xl overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600"
                alt="Kerala Tea Gardens"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-black text-xl leading-tight mb-2 uppercase">
                  Security at every step.
                </h3>
                <p className="text-white/80 text-xs font-medium">
                  Explore India with peace of mind knowing your data is
                  protected.
                </p>
              </div>
            </div>
          </div>
          {/* Subtle Accent Circles */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-amber-400/20 rounded-full blur-xl" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#2e7d32]/10 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-auto pt-12 pb-6 z-10">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] flex items-center gap-2">
          Secure Your Journey <span className="text-gray-300">•</span> TripNest
          AI
        </p>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-linear-to-bl from-[#2e7d32]/5 to-transparent rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-[#6c63ff]/5 to-transparent rounded-full blur-3xl -ml-20 -mb-20" />
    </div>
  );
};

export default ResetPasswordPage;
