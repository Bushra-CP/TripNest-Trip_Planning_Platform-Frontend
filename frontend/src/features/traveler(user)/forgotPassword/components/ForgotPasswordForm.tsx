import { ArrowLeft, ArrowRight, LoaderCircle, Mail } from "lucide-react";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPasswordForm = () => {
  const { form, onSubmit, handleBackToLogin, isLoading } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="max-w-120 w-full bg-white rounded-4xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white animate-in zoom-in-95 duration-500">
      <header className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
          Forgot password?
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed">
          Enter your email to receive a password reset link. We'll help you get
          back to your travel planning.
        </p>
      </header>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="name@example.com"
              {...register("email")}
              className="w-full h-14 pl-12 pr-4 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none text-gray-900 font-medium placeholder:text-gray-400"
            />

            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2e7d32] transition-colors"
            />
          </div>

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-[#2e7d32] hover:bg-[#256628] disabled:opacity-60 active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-[#2e7d32]/20 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <LoaderCircle size={20} className="animate-spin" />
              Sending OTP...
            </>
          ) : (
            <>
              Send Reset OTP
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center">
        <button
          type="button"
          onClick={handleBackToLogin}
          className="flex items-center gap-2 text-sm font-bold text-[#b45309] hover:text-[#92400e] transition-colors"
        >
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
  );
};

export default ForgotPasswordForm;
