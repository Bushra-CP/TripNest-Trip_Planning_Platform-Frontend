import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-[#f4faff] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-275 w-full bg-white rounded-4xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col md:flex-row min-h-175">
        {/* Left Side: Hero Section */}
        <div className="relative hidden md:block md:w-[45%]">
          <img
            src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2069&auto=format&fit=crop"
            alt="Kerala Backwaters Houseboat"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          {/* Brand & Badge Overlay */}
          <div className="absolute inset-0 p-10 flex flex-col justify-between">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                TripNest
              </h1>
              <p className="text-white/90 text-sm md:text-base max-w-[320px] leading-relaxed">
                Join 50k+ Indian travelers today. Experience the heart of India
                with AI-powered itineraries and a community that feels like
                home.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full md:w-[55%] p-8 md:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
                Create your account
              </h2>
              <p className="text-gray-500 font-medium">
                Begin your journey to authentic Indian experiences.
              </p>
            </header>

            <RegisterForm />

            {/* Social Login */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                <span className="bg-white px-4">Or sign up with</span>
              </div>
            </div>

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
            <p className="text-center mt-10 text-sm text-gray-600 font-medium">
              Already have an account?{" "}
              <button className="font-black text-[#6c63ff] hover:underline">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
