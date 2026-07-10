import { Mail, Lock, Phone, User, Hash, ArrowRight } from "lucide-react";
import { useRegisterForm } from "../hooks/useRegister";

const RegisterForm = () => {
  const { register, handleSubmit, errors, onSubmit } = useRegisterForm();

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {/* Full Name */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
          Full Name
        </label>
        <div className="relative group">
          <input
            type="text"
            {...register("fullName")}
            // placeholder="Full Name"
            className="w-full h-12 pl-4 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/10 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium"
          />
          <User
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6c63ff] transition-colors"
            size={18}
          />
        </div>
        {errors.fullName && (
          <p className="text-[11px] text-red-500 ml-1">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
          Email Address
        </label>
        <div className="relative group">
          <input
            type="email"
            {...register("email")}
            // placeholder="Email Address"
            className="w-full h-12 pl-4 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/10 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium"
          />
          <Mail
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6c63ff] transition-colors"
            size={18}
          />
        </div>
        {errors.email && (
          <p className="text-[11px] text-red-500 ml-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
          Phone Number
        </label>
        <div className="relative group">
          <input
            type="tel"
            {...register("phone")}
            // placeholder="Phone Number"
            className="w-full h-12 pl-4 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/10 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium"
          />
          <Phone
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6c63ff] transition-colors"
            size={18}
          />
        </div>
        {errors.phone && (
          <p className="text-[11px] text-red-500 ml-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Create Password */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest block ml-1">
          Create Password
        </label>
        <div className="relative group">
          <input
            type="password"
            {...register("password")}
            // placeholder="Create Password"
            className="w-full h-12 pl-4 pr-12 bg-[#f8fbf4] border border-[#cfdce4] rounded-2xl focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/10 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium"
          />
          <Lock
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6c63ff] transition-colors"
            size={18}
          />
        </div>
        {errors.password ? (
          <p className="text-[11px] text-red-500 ml-1">
            {errors.password.message}
          </p>
        ) : (
          <p className="text-[10px] text-gray-400 ml-1">
            Password must be at least 8 characters long and include at least one
            uppercase letter, one lowercase letter, one number, and one special
            character.{" "}
          </p>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="space-y-1">
        <div className="flex items-start gap-3 py-2">
          <input
            type="checkbox"
            {...register("agreeToTerms")}
            id="terms"
            className="mt-1 w-4 h-4 border-[#cfdce4] rounded text-[#6c63ff] focus:ring-[#6c63ff]"
          />
          <label htmlFor="terms" className="text-xs text-gray-600 leading-snug">
            I agree to the{" "}
            <button className="font-bold text-[#6c63ff] hover:underline">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="font-bold text-[#6c63ff] hover:underline">
              Privacy Policy
            </button>
            .
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-[11px] text-red-500 ml-1">
            {errors.agreeToTerms.message}
          </p>
        )}
      </div>

      {/* Reference ID */}
      <div className="pt-2 border-t border-gray-100 space-y-1.5">
        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block ml-1">
          Reference ID (Optional)
        </label>
        <div className="relative group">
          <input
            type="text"
            {...register("referenceId")}
            placeholder="REF-12345"
            className="w-full h-12 pl-4 pr-12 bg-gray-50 border border-[#cfdce4] rounded-2xl focus:border-[#6c63ff] focus:ring-4 focus:ring-[#6c63ff]/10 transition-all outline-none text-gray-900 placeholder:text-gray-300 font-mono text-sm"
          />
          <Hash
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#6c63ff] transition-colors"
            size={18}
          />
        </div>
        <p className="text-[10px] text-gray-400 ml-1">
          Enter a friend's referral ID to earn bonus reward points upon
          registration.
        </p>
      </div>

      {/* Create Account Button */}
      <button
        type="submit"
        className="w-full h-14 bg-[#6c63ff] hover:bg-[#534afe] active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-[#6c63ff]/20 transition-all flex items-center justify-center gap-2 mt-6"
      >
        Create Account
        <ArrowRight size={20} />
      </button>
    </form>
  );
};

export default RegisterForm;
