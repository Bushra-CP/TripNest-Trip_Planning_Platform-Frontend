import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormValues,
} from "../validation/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../../../app/store";
import { registerThunk } from "../redux/registerThunk";
import { selectRegisterLoading } from "../redux/registerSelectors";
import { toast } from "sonner";

export const useRegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const isLoading = useSelector(selectRegisterLoading);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: { agreeToTerms: false },
  });

  const onSubmit = async (data: RegisterFormValues): Promise<void> => {
    try {
      await dispatch(
        registerThunk({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          password: data.password,
          referenceId: data.referenceId || undefined,
        }),
      ).unwrap();

      navigate("/otp-verification");
    } catch (error) {
      console.log(error);
      toast.error(error as string);
    }
  };

  return {
    register,
    handleSubmit,
    setError,
    errors,
    isLoading,
    onSubmit,
  };
};
