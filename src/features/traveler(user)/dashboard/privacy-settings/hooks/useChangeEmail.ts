import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changeEmailSchema,
  type ChangeEmailFormData,
} from "../validation/change-email.schema";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";
import { changeEmailThunk } from "../redux/privacy-settings.thunk";
import { toast } from "sonner";

export const useChangeEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);

  const currentEmail = user?.email;

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
    mode: "onChange",
    defaultValues: {
      currentEmail: currentEmail,
      newEmail: "",
      confirmEmail: "",
      currentPassword: "",
    },
  });

  const onSubmit = async (data: ChangeEmailFormData) => {
    try {
      console.log(data);

      if (!currentEmail) {
        return;
      }

      await dispatch(
        changeEmailThunk({
          currentEmail,
          newEmail: data.newEmail,
          currentPassword: data.currentPassword,
        }),
      ).unwrap();

      navigate("/otp-verification");
    } catch (error) {
      console.error(error);
      toast.error(error as string);
      // Error toast
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,

    showPassword,
    togglePassword,

    onSubmit,
    handleBack,
  };
};
