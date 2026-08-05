import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import type { AppDispatch } from "../../../../app/store";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../validations/forgot-password.schema";
import { forgotPasswordThunk } from "../redux/forgot-password.thunk";
import { selectForgotPasswordLoading } from "../redux/forgot-password.selector";

export const useForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isLoading = useSelector(selectForgotPasswordLoading);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });

  const onSubmit = async (data: ForgotPasswordFormData): Promise<void> => {
    try {
      await dispatch(
        forgotPasswordThunk({
          email: data.email,
        }),
      ).unwrap();

      navigate("/otp-verification");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return {
    form,
    onSubmit,
    handleBackToLogin,
    isLoading,
  };
};
