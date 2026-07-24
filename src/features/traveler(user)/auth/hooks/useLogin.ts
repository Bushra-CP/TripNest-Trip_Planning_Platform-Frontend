import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../validation/login.schema";
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/authThunk";
import type { AppDispatch } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

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
    // console.log(values);

    const response = await dispatch(loginThunk(values)).unwrap();

    toast.success(response.data.message);
    navigate("/");
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
