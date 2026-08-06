import { ArrowLeft, Eye, EyeOff, Info, Lock, Mail } from "lucide-react";
import { useChangeEmail } from "../hooks/useChangeEmail";

const ChangeEmailForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,

    errors,
    isSubmitting,

    showPassword,
    togglePassword,

    handleBack,
  } = useChangeEmail();

  return (
    <div className="max-w-135 w-full bg-white/90 backdrop-blur-sm rounded-4xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white animate-in zoom-in-95 duration-500 z-10">
      <header className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
          Change Email
        </h2>

        <p className="text-gray-500 text-sm font-medium leading-relaxed">
          Update your account email address. You will need to verify your new
          email for security.
        </p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Current Email */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest block ml-1 text-gray-700">
            Current Email
          </label>

          <div className="relative">
            <input
              type="email"
              {...register("currentEmail")}
              readOnly
              className="w-full h-14 pl-12 pr-12 bg-[#f0f4f8] border border-[#cfdce4] rounded-2xl text-gray-500 cursor-not-allowed"
            />

            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Lock
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
            />
          </div>
        </div>

        {/* New Email */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest block ml-1 text-gray-700">
            New Email
          </label>

          <div className="relative group">
            <input
              type="email"
              placeholder="Enter new email address"
              {...register("newEmail")}
              className="w-full h-14 pl-12 pr-4 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl outline-none transition-all focus:border-[#6c63ff] focus:ring-4 focus:ring-[#2e7d32]/10"
            />

            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6c63ff]"
            />
          </div>

          {errors.newEmail && (
            <p className="text-xs text-red-500">{errors.newEmail.message}</p>
          )}
        </div>

        {/* Confirm Email */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest block ml-1 text-gray-700">
            Confirm New Email
          </label>

          <div className="relative group">
            <input
              type="email"
              placeholder="Re-enter new email address"
              {...register("confirmEmail")}
              className="w-full h-14 pl-12 pr-4 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl outline-none transition-all focus:border-[#6c63ff] focus:ring-4 focus:ring-[#2e7d32]/10"
            />

            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6c63ff]"
            />
          </div>

          {errors.confirmEmail && (
            <p className="text-xs text-red-500">
              {errors.confirmEmail.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest block ml-1 text-gray-700">
            Current Password
          </label>

          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("currentPassword")}
              className="w-full h-14 pl-12 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl outline-none transition-all focus:border-[#6c63ff] focus:ring-4 focus:ring-[#2e7d32]/10"
            />

            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.currentPassword && (
            <p className="text-xs text-red-500">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* Info */}
        <div className="bg-[#eef4f9] border border-[#cfdce4]/50 rounded-2xl p-4 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
            <Info size={20} className="text-[#6c63ff]" />
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            A verification OTP will be sent to your new email address. Your
            email will only be updated after successful verification.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 bg-[#6c63ff] hover:bg-[#534afe] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg transition-all"
        >
          {isSubmitting ? "Sending OTP..." : "Continue"}
        </button>
      </form>

      {/* Back */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#6c63ff] transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Account Settings
        </button>
      </div>
    </div>
  );
};

export default ChangeEmailForm;
