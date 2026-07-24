import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import type { AppDispatch } from "../../../../app/store";
import {
  selectResendResetOtpLoading,
  selectVerifyResetOtpLoading,
} from "../../forgotPassword/redux/forgot-password.selector";
import {
  resendResetOtpThunk,
  verifyResetOtpThunk,
} from "../../forgotPassword/redux/forgot-password.thunk";

interface UseResetOtpProps {
  userId: string;
  email: string;
}

export const useResetOtp = ({ email }: UseResetOtpProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isVerifyLoading = useSelector(selectVerifyResetOtpLoading);

  const isResendOtpLoading = useSelector(selectResendResetOtpLoading);

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const [timer, setTimer] = useState<number>(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* ----------------------------
      TIMER
  ----------------------------- */
  useEffect(() => {
    const updateTimer = () => {
      const pendingPasswordReset = sessionStorage.getItem(
        "pendingPasswordReset",
      );

      if (!pendingPasswordReset) {
        setTimer(0);
        return;
      }

      const resetData = JSON.parse(pendingPasswordReset);

      const remaining = Math.max(
        0,
        Math.floor((resetData.expiresAt - Date.now()) / 1000),
      );

      setTimer(remaining);
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ----------------------------
      OTP INPUT
  ----------------------------- */
  const handleChange = (index: number, value: string): void => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* ----------------------------
      BACKSPACE
  ----------------------------- */
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* ----------------------------
      VERIFY OTP
  ----------------------------- */
  const handleVerify = async (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ): Promise<void> => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) return;

    try {
      const response = await dispatch(
        verifyResetOtpThunk({
          email,
          otp: otpValue,
        }),
      ).unwrap();

      

      sessionStorage.removeItem("pendingPasswordReset");

      navigate("/reset-password", {
        state: {
          resetToken: response.resetToken,
        },
      });
    } catch (error) {
      toast.error(error as string);
    }
  };

  /* ----------------------------
      RESEND OTP
  ----------------------------- */
  const handleResend = async (): Promise<void> => {
    try {
      await dispatch(
        resendResetOtpThunk({
          email,
        }),
      ).unwrap();

      setOtp(["", "", "", "", "", ""]);

      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error(error as string);
    }
  };

  /* ----------------------------
      FORMAT TIMER
  ----------------------------- */
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    isVerifyLoading,
    isResendOtpLoading,
    email,
    otp,
    timer,
    inputRefs,
    handleChange,
    handleKeyDown,
    handleVerify,
    handleResend,
    formatTime,
  };
};
