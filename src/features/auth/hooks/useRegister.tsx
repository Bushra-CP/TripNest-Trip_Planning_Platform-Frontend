import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormValues,
} from "../validation/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: { agreeToTerms: false },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
  };

  return {
    register,
    handleSubmit,
    setError,
    errors,
    onSubmit,
  };
};
