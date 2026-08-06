// // import type { AppDispatch } from "@/app/store";
// // import { loginThunk } from "@/features/traveler(user)/auth/redux/authThunk";
// import { useState } from "react";
// // import { useDispatch } from "react-redux";



// export const useAdminLogin = () => {

//   // const dispatch=useDispatch<AppDispatch>()

//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState<AdminLoginFormData>({
//     adminId: "",
//     password: "",
//     rememberDevice: false,
//   });

//   const handleChange = (
//     field: keyof AdminLoginFormData,
//     value: string | boolean
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     console.log("Login attempt:", formData);

//     // dispatch(loginThunk(formData))
//     // navigate(...)
//   };

//   return {
//     formData,
//     showPassword,
//     handleChange,
//     togglePasswordVisibility,
//     handleSubmit,
//   };
// };