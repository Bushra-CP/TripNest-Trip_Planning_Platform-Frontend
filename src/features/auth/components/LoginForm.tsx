import { Eye, EyeOff, ArrowRight, User } from "lucide-react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const { register, handleSubmit, errors, onSubmit } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>

        <p className="text-gray-500 text-sm">
          Sign in to resume your Indian adventure.
        </p>
      </header>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider ml-1 block">
            Email
          </label>

          <div className="relative group">
            <input
              {...register("email")}
              placeholder="Enter your email or phone"
              className="w-full h-14 pl-4 pr-12 bg-[#f8fbf4] border rounded-2xl border-[#cfdce4] focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/10 outline-none"
            />

            <User
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}

        <div className="space-y-2">
          <div className="flex justify-between px-1">
            <label className="text-xs font-bold uppercase tracking-wider">
              Password
            </label>

            <button type="button" className="text-xs font-bold text-[#b45309]">
              Forgot Password?
            </button>
          </div>

          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full h-14 pl-4 pr-12 bg-[#f8fbf4] border rounded-2xl border-[#cfdce4] focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/10 outline-none"
            />

            <button
              type="submit"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <button className="w-full h-14 bg-[#6c63ff] text-white rounded-2xl flex justify-center items-center gap-2 hover:bg-[#534afe]">
          Sign In
          <ArrowRight size={20} />
        </button>
      </form>

      {/* Divider */}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="border-t border-gray-200 w-full" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Google */}

      <button className="w-full h-14 border rounded-2xl border-[#cfdce4] flex justify-center items-center gap-3 hover:bg-gray-50">
        {/* SVG */}
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
        Google
      </button>

      <p className="text-center mt-6 text-sm">
        Don't have an account?{" "}
        <button className="font-bold text-[#6c63ff]">Sign Up</button>
      </p>
    </>
  );
};

export default LoginForm;
