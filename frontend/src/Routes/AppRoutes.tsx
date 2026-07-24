import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes.constants";
import OtpPage from "@/features/traveler(user)/otp/pages/OtpPage";
import RegisterPage from "@/features/traveler(user)/register/pages/RegisterPage";
import LoginPage from "@/features/traveler(user)/auth/pages/LoginPage";
import HomePage from "@/features/traveler(user)/home/pages/HomePage";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          //TRAVELER ROUTES
          <Route path="/" element={<HomePage />} />
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
          <Route path="/otp-verification" element={<OtpPage />} />
          //ADMIN ROUTES
        </Routes>
      </BrowserRouter>
    </>
  );
}
