import React from "react";
import { Smartphone, ArrowRight, ArrowLeft, LoaderCircle } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useOtp } from "../hooks/useOtp";

interface OtpFormProps {
  userId: string;
  email: string;
}

const OtpForm: React.FC<OtpFormProps> = ({ userId, email }) => {
  const navigate = useNavigate();

  const {
    isVerifyLoading,
    isResendOtpLoading,
    otp,
    timer,
    inputRefs,
    handleChange,
    handleKeyDown,
    handleVerify,
    handleResend,
    formatTime,
  } = useOtp({
    userId,
    email,
  });

  return (
    <div className="max-w-120 w-full bg-white rounded-4xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white animate-in zoom-in-95 duration-500">
      <header className="mb-10 text-center">
        <div className="w-16 h-16 bg-[#e8f5e9] text-[#6c63ff] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Smartphone size={32} strokeWidth={1.5} />
        </div>

        <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
          Verify Your Email
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed max-w-70 mx-auto font-medium">
          Enter the 6-digit code sent to
          <br />
          <span className="text-gray-900 font-bold">{email}</span>
        </p>
      </header>

      <form onSubmit={handleVerify} className="space-y-10">
        <div className="flex justify-between gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              autoFocus={index === 0}
              className="w-10 h-14 sm:w-14 sm:h-14 text-center text-xl font-bold bg-[#f8fbf4] border border-[#cfdce4] rounded-xl focus:border-[#6c63ff] focus:ring-4 focus:ring-[#2e7d32]/10 transition-all outline-none text-gray-900"
            />
          ))}
        </div>

        <div className="space-y-6">
          <button
            type="submit"
            disabled={
              otp.join("").length < 6 || isVerifyLoading || isResendOtpLoading
            }
            className="w-full h-14 bg-[#6c63ff] hover:bg-[#534afe] disabled:opacity-50 disabled:hover:bg-[#6c63ff] active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-[#2e7d32]/20 transition-all flex items-center justify-center gap-2"
          >
            {isVerifyLoading ? (
              <>
                <LoaderCircle size={20} className="animate-spin" />
                Verifying OTP...
              </>
            ) : (
              <>
                Verify OTP
                <ArrowRight size={20} />
              </>
            )}
          </button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500 font-medium">
              Didn't receive the code?
            </p>

            {timer > 0 ? (
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Resend Code ({formatTime(timer)})
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResendOtpLoading}
                className="text-xs font-black text-[#b45309] hover:underline uppercase tracking-wider"
              >
                {isResendOtpLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoaderCircle size={10} className="animate-spin" />
                    Resending OTP...
                  </span>
                ) : (
                  <>Resend OTP Now</>
                )}
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#6c63ff] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default OtpForm;
