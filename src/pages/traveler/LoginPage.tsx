import { Eye, ArrowRight, User } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="h-screen bg-[#f4faff] flex items-center justify-center p-4 overflow-hidden font-sans">
      <div className="w-full max-w-6xl h-[92vh] bg-white rounded-4xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col md:flex-row">
        {/* Left Side: Hero Image Section */}
        <div className="relative hidden md:block md:w-[45%]">
          <img
            src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2069&auto=format&fit=crop"
            alt="Kerala Backwaters Houseboat"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

          {/* Brand & Badge Overlay */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <div className="self-start"></div>

            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                TripNest
              </h1>
              <p className="text-white/90 text-sm md:text-base max-w-70 leading-relaxed">
                Experience the heart of India with AI-driven journeys tailored
                just for you.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="w-full md:w-[55%] px-8 py-6 lg:px-12 flex flex-col justify-center overflow-y-auto">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm">
                Sign in to resume your Indian adventure.
              </p>
            </header>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Email/Phone Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block ml-1">
                  Email or Phone Number
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Enter your email or phone"
                    className="w-full h-14 pl-4 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/10 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                  />
                  <User
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6c63ff] transition-colors"
                    size={20}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-bold text-[#b45309] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full h-14 pl-4 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/10 transition-all outline-none text-gray-900"
                  />
                  <Eye
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6c63ff] transition-colors cursor-pointer"
                    size={20}
                  />
                </div>
              </div>

              {/* Sign In Button */}
              <button className="w-full h-14 bg-[#6c63ff] hover:bg-[#534afe] active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-[#6c63ff]/20 transition-all flex items-center justify-center gap-2">
                Sign In
                <ArrowRight size={20} />
              </button>
            </form>

            {/* Social Login Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}

            <div className="flex justify-center">
              <button className="flex items-center justify-center gap-2 h-14 w-full max-w-xs border border-[#cfdce4] rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98]">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.75c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-semibold text-gray-700">
                  Google
                </span>
              </button>
            </div>

            {/* Footer Link */}
            <p className="text-center mt-6 text-sm text-gray-600">
              Don't have an account?{" "}
              <button className="font-bold text-[#6c63ff] hover:underline">
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
