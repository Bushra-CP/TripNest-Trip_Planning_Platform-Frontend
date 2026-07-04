import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
    rememberDevice: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Add authentication logic here
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-6 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="w-full max-w-6xl min-h-[720px] bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_25px_80px_rgba(0,0,0,0.12)] flex">
        {/* Left Section: Hero Content */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2069"
            alt="Mist-covered tea gardens"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Breathtaking Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />

          <div className="relative z-10 p-16 mt-auto max-w-2xl">
            <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
              TripNest
            </h1>
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative overflow-hidden">
          {/* Textured Background (Subtle Dot Pattern) */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#2e7d32 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="w-full max-w-[480px] z-10 flex flex-col items-center">
            {/* Header Section */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-[#2e7d32] tracking-tighter uppercase mb-1">
                TripNest Admin
              </h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                Access authorized community controls
              </p>
            </div>

            {/* Login Card */}
            <div className="w-full bg-white border border-gray-100 rounded-[4px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] animate-in fade-in zoom-in-95 duration-500">
             

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Admin ID / Email */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
                    Admin ID / Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2e7d32] transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="text"
                      value={formData.adminId}
                      onChange={(e) =>
                        setFormData({ ...formData, adminId: e.target.value })
                      }
                      placeholder="admin.username@tripnest.com"
                      className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-[4px] focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/5 transition-all outline-none text-gray-900 font-medium placeholder:text-gray-300"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
                    Secure Password
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2e7d32] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="••••••••••••"
                      className="w-full h-14 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-[4px] focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/5 transition-all outline-none text-gray-900 font-medium placeholder:text-gray-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Helpers */}
                <div className="flex items-center justify-between py-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.rememberDevice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rememberDevice: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-[#2e7d32] focus:ring-[#2e7d32]"
                    />
                    <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                      Remember device
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-xs font-bold text-[#2e7d32] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-14 bg-[#2e7d32] hover:bg-[#256628] active:scale-[0.98] text-white font-bold rounded-[4px] shadow-lg shadow-[#2e7d32]/20 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <LogIn size={20} />
                  Sign In to Dashboard
                </button>
              </form>

              
            </div>

            {/* Status Badge */}
            <div className="mt-12 flex flex-col items-center gap-6">
              <div className="bg-[#0b1326] px-5 py-2.5 rounded-full flex items-center gap-3 shadow-xl">
                <div className="w-2 h-2 bg-[#00e676] rounded-full animate-pulse shadow-[0_0_8px_#00e676]" />
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.1em]">
                  Secure Admin Terminal
                </span>
              </div>

              {/* Footer Links */}
              <div className="text-center space-y-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Authorized Personnel Only
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
