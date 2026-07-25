import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../validation/login.schema";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/authThunk";
import type { AppDispatch } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { selectAuthLoading } from "../redux/authSelectors";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector(selectAuthLoading);

  const navigate = useNavigate();

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
    try {
      const response = await dispatch(loginThunk(values)).unwrap();

      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(error as string);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
  };
};
