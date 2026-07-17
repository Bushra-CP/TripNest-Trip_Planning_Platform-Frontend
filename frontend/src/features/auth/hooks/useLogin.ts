import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../validation/login.schema";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { loginThunk } from "../redux/authThunk";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },

    mode: "all",
  });

  const onSubmit = async (values: LoginFormData) => {
    console.log(values);

    await dispatch(loginThunk(values));
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
