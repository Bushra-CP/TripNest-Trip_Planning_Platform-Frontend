import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "../validation/change-password.schema";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { changePasswordThunk } from "../redux/privacy-settings.thunk";
import { toast } from "sonner";

export const useChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting, isValid },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "all",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      console.log(data);

      const res = await dispatch(
        changePasswordThunk({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      ).unwrap();

      toast.success(res.message);

      navigate("/settings");
    } catch (error) {
      console.error(error);

      // Error toast
    }
  };

  const handleBack = () => {
    navigate("/settings");
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,

    showCurrent,
    showNew,
    showConfirm,

    toggleCurrentPassword: () => setShowCurrent((prev) => !prev),
    toggleNewPassword: () => setShowNew((prev) => !prev),
    toggleConfirmPassword: () => setShowConfirm((prev) => !prev),

    onSubmit,
    handleBack,
  };
};
