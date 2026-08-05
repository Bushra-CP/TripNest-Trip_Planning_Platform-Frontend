import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import type { AppDispatch } from "../../../../app/store";

import { resetPasswordThunk } from "../redux/forgot-password.thunk";
import { selectResetPasswordLoading } from "../redux/forgot-password.selector";

export const useResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const location = useLocation();

  const resetToken = location.state?.resetToken;

  const isLoading = useSelector(selectResetPasswordLoading);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requirements = useMemo(
    () => [
      {
        label: "Uppercase",
        valid: /[A-Z]/.test(password),
      },
      {
        label: "Number",
        valid: /\d/.test(password),
      },
      {
        label: "Special Char",
        valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      },
      {
        label: "8+ Characters",
        valid: password.length >= 8,
      },
    ],
    [password],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!requirements.every((item) => item.valid)) {
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    console.log(`resetToken:${resetToken}`);

    if (!resetToken) {
      toast.error("Reset session has expired.");
      navigate("/forgot-password", { replace: true });
      return;
    }

    try {
      await dispatch(
        resetPasswordThunk({
          resetToken,
          password,
        }),
      ).unwrap();

      toast.success("Password reset successfully.");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(error as string);
    }
  };

  return {
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    requirements,
    isLoading,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleSubmit,
  };
};
