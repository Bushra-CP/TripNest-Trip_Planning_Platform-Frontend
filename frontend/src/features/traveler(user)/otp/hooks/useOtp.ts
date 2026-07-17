import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../app/store";
import {
  resendOtpThunk,
  verifyRegistrationThunk,
} from "../../register/redux/registerThunk";
import { useNavigate } from "react-router-dom";

interface UseOtpProps {
  userId: string;
  email: string;
}

export const useOtp = ({ userId, email }: UseOtpProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const [timer, setTimer] = useState<number>(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  //TIMER
  useEffect(() => {
    const updateTimer = () => {
      const pendingRegistration = sessionStorage.getItem("pendingRegistration");

      if (!pendingRegistration) {
        setTimer(0);
        return;
      }

      const registration = JSON.parse(pendingRegistration);

      const remaining = Math.max(
        0,
        Math.floor((registration.expiresAt - Date.now()) / 1000),
      );

      setTimer(remaining);
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  //OTP INPUT
  const handleChange = (index: number, value: string): void => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  //BACKSPACE
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  //VERIFY OTP
  const handleVerify = async (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ): Promise<void> => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) return;

    try {
      await dispatch(
        verifyRegistrationThunk({
          userId,
          otp: otpValue,
        }),
      ).unwrap();

      sessionStorage.removeItem("pendingRegistration");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  //RESEND OTP
  const handleResend = async (): Promise<void> => {
    try {
      await dispatch(
        resendOtpThunk({
          userId,
        }),
      ).unwrap();

      setOtp(["", "", "", "", "", ""]);

      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error(error);
    }
  };

  //FORMAT TIMER
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
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
  };
};
