import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "../features/traveler(user)/register/pages/RegisterPage";
import HomePage from "../pages/traveler/HomePage";
import ForgotPasswordPage from "../pages/traveler/ForgotPassword";
import ResetPasswordPage from "../pages/traveler/ResetPasswordPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { ROUTES } from "../shared/constants/routes.constants";
import OtpPage from "../features/traveler(user)/otp/pages/OtpPage";
import LoginPage from "../features/auth/pages/LoginPage";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          //TRAVELER ROUTES
          <Route path="/" element={<HomePage />} />
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/otp-verification" element={<OtpPage />} />
          //ADMIN ROUTES
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
