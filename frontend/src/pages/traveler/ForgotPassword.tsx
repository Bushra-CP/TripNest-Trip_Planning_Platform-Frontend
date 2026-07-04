import React, { useState } from "react";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f4faff] to-[#e9f6fd] flex flex-col items-center justify-center p-6 font-sans">
      {/* Brand Logo */}
      <div className="flex flex-col items-center gap-2 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl font-black text-[#2e7d32] tracking-tighter">
          TripNest
        </h1>
      </div>

      {/* Main Card */}
      <div className="max-w-120 w-full bg-white rounded-4xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white animate-in zoom-in-95 duration-500">
        <header className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
            Forgot password?
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Enter your email to receive a password reset link. We'll help you
            get back to your travel planning.
          </p>
        </header>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-[11px] font-bold text-gray-600 uppercase tracking-widest block ml-1"
            >
              Email address
            </label>
            <div className="relative group">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-14 pl-12 pr-4 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none text-gray-900 font-medium placeholder:text-gray-400"
                required
              />
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2e7d32] transition-colors"
                size={20}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-14 bg-[#2e7d32] hover:bg-[#256628] active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-[#2e7d32]/20 transition-all flex items-center justify-center gap-2"
          >
            Send Reset Link
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center">
          <button className="flex items-center gap-2 text-sm font-bold text-[#b45309] hover:text-[#92400e] transition-colors">
            <ArrowLeft size={16} />
            Back to Login
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
            India's Smartest Travel AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
