import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="h-screen bg-[#f4faff] flex items-center justify-center p-4 overflow-hidden font-sans">
      <div className="w-full max-w-6xl h-[92vh] bg-white rounded-4xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col md:flex-row">
        {/* Hero */}

        <div className="relative hidden md:block md:w-[45%]">
          <img
            src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2069&auto=format&fit=crop"
            alt="Kerala Backwaters"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <h1 className="text-5xl font-black text-white">TripNest</h1>

            <p className="text-white/90 mt-4 max-w-xs">
              Experience the heart of India with AI-driven journeys tailored
              just for you.
            </p>
          </div>
        </div>

        {/* Form */}

        <div className="w-full md:w-[55%] px-8 py-6 lg:px-12 flex flex-col justify-center overflow-y-auto">
          <div className="max-w-md mx-auto w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
