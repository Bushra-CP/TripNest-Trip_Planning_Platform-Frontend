import { Eye, EyeOff, ArrowRight, User } from "lucide-react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import GoogleButton from "./GoogleButton";

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
              type="button"
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

        <button
          type="submit"
          className="w-full h-14 bg-[#6c63ff] text-white rounded-2xl flex justify-center items-center gap-2 hover:bg-[#534afe]"
        >
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

      <GoogleButton />

      <p className="text-center mt-6 text-sm">
        Don't have an account?{" "}
        <button className="font-bold text-[#6c63ff]">Sign Up</button>
      </p>
    </>
  );
};

export default LoginForm;
