import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { useChangePassword } from "../hooks/useChangePassword";

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,

    showCurrent,
    showNew,
    showConfirm,

    toggleCurrentPassword,
    toggleNewPassword,
    toggleConfirmPassword,


    handleBack,
  } = useChangePassword();

  return (
    <div className="max-w-[1000px] w-full flex flex-col lg:flex-row items-center justify-center gap-12 z-10">
      {/* Main Card */}
      <div className="max-w-[480px] w-full bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white animate-in zoom-in-95 duration-500">
        <header className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
            Change Password
          </h2>

          <p className="text-gray-500 text-xs font-medium">
            Create a new secure password for your TripNest account.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
              Current Password
            </label>

            <div className="relative group">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                {...register("currentPassword")}
                className="w-full h-14 pl-12 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none"
              />

              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <button
                type="button"
                onClick={toggleCurrentPassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.currentPassword && (
              <p className="text-xs text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
              New Password
            </label>

            <div className="relative group">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                {...register("newPassword")}
                className="w-full h-14 pl-12 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none"
              />

              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <button
                type="button"
                onClick={toggleNewPassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.newPassword && (
              <p className="text-xs text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
              Confirm New Password
            </label>

            <div className="relative group">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                {...register("confirmPassword")}
                className="w-full h-14 pl-12 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#2e7d32] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none"
              />

              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>



          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-[#2e7d32] hover:bg-[#256628] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg transition-all"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>

        {/* Back Button */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#2e7d32] transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Account Settings
          </button>
        </div>
      </div>

      {/* Image Card */}
      <div className="hidden lg:block relative w-[320px] h-[440px] rotate-3 hover:rotate-0 transition-transform duration-500">
        <div className="absolute inset-0 bg-white rounded-[32px] p-4 shadow-2xl border border-white">
          <div className="h-full w-full rounded-2xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600"
              alt="Kerala Tea Gardens"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white font-black text-xl leading-tight mb-2 uppercase tracking-tight">
                Security at every step.
              </h3>

              <p className="text-white/80 text-xs font-medium">
                Explore Kerala with peace of mind knowing your data is
                protected.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute -top-6 -right-6 w-12 h-12 bg-amber-400/20 rounded-full blur-xl" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#2e7d32]/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default ChangePasswordForm;
