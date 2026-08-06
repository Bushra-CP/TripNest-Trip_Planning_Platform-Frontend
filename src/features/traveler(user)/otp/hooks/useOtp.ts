import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../app/store";
import {
  resendOtpThunk,
  verifyRegistrationThunk,
} from "../../register/redux/register.thunk";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import {
  selectResendOtpLoading,
  selectVerifyOtpLoading,
} from "../redux/otp.selectors";
import {
  resendResetOtpThunk,
  verifyResetOtpThunk,
} from "../../forgot-password/redux/forgot-password.thunk";
import {
  resendChangeEmailOtpThunk,
  verifyChangeEmailOtpThunk,
} from "../../dashboard/privacy-settings/redux/privacy-settings.thunk";

export interface OtpProps {
  userId: string;
  email: string;
}

export interface PendingOtpData {
  userId: string;
  email: string;
  expiresAt: number;
}

export const useOtp = ({ userId, email }: OtpProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isVerifyOtpLoading = useSelector(selectVerifyOtpLoading);
  const isResendOtpLoading = useSelector(selectResendOtpLoading);

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const [timer, setTimer] = useState<number>(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const registration = sessionStorage.getItem("pendingRegistration");
  const passwordReset = sessionStorage.getItem("pendingPasswordReset");
  const changeEmail = sessionStorage.getItem("pendingChangeEmail");

  const flow = registration
    ? "register"
    : passwordReset
      ? "resetPassword"
      : changeEmail
        ? "changeEmail"
        : null;

  const pendingData: PendingOtpData | null = registration
    ? JSON.parse(registration)
    : passwordReset
      ? JSON.parse(passwordReset)
      : changeEmail
        ? JSON.parse(changeEmail)
        : null;

  /* ----------------------------
      TIMER
  ----------------------------- */
  useEffect(() => {
    const updateTimer = () => {
      if (!pendingData) {
        setTimer(0);
        return;
      }

      const remaining = Math.max(
        0,
        Math.floor((pendingData.expiresAt - Date.now()) / 1000),
      );

      setTimer(remaining);
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [pendingData]);

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
      switch (flow) {
        case "register": {
          const data = await dispatch(
            verifyRegistrationThunk({
              userId,
              otp: otpValue,
            }),
          ).unwrap();

          sessionStorage.removeItem("pendingRegistration");

          toast.success(data.data.message);

          navigate("/");

          break;
        }

        case "resetPassword": {
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

          break;
        }

        case "changeEmail": {
          await dispatch(
            verifyChangeEmailOtpThunk({
              email,
              otp: otpValue,
            }),
          ).unwrap();

          sessionStorage.removeItem("pendingChangeEmail");

          toast.success("Email updated successfully.");

          navigate("/settings");

          break;
        }
      }
    } catch (error) {
      toast.error(error as string);

      console.error(error);
    }
  };

  /* ----------------------------
      RESEND OTP
  ----------------------------- */
  const handleResend = async (): Promise<void> => {
    try {
      switch (flow) {
        case "register":
          await dispatch(resendOtpThunk({ userId })).unwrap();

          break;

        case "resetPassword":
          await dispatch(resendResetOtpThunk({ email })).unwrap();

          break;

        case "changeEmail":
          await dispatch(
            resendChangeEmailOtpThunk({
              email,
            }),
          ).unwrap();

          break;
      }

      setOtp(["", "", "", "", "", ""]);

      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error(error);
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

  /* ----------------------------
      BACK TO LOGIN BUTTON
  ----------------------------- */

  const handleBackToLogin = () => {
    navigate("/login");
  };

  /* ----------------------------
      TO MASK EMAIL 
  ----------------------------- */
  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");

    if (!name || !domain) return email;

    const visible = name.slice(0, 3);
    const masked = "*".repeat(Math.max(name.length - 3, 0));

    return `${visible}${masked}@${domain}`;
  };

  return {
    isVerifyOtpLoading,
    isResendOtpLoading,
    email,
    otp,
    timer,
    inputRefs,
    setOtp,
    handleChange,
    handleKeyDown,
    handleVerify,
    handleResend,
    formatTime,
    handleBackToLogin,
    maskEmail,
  };
};
