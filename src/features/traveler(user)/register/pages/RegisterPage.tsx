import RegisterForm from "../components/RegisterForm";
import GoogleButton from "../../auth/components/GoogleButton";

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
              <GoogleButton />
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
