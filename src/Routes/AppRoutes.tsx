import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes.constants";
import OtpPage from "@/features/traveler(user)/otp/pages/OtpPage";
import RegisterPage from "@/features/traveler(user)/register/pages/RegisterPage";
import LoginPage from "@/features/traveler(user)/auth/pages/LoginPage";
import HomePage from "@/features/traveler(user)/home/pages/HomePage";
import ForgotPasswordPage from "@/features/traveler(user)/forgotPassword/pages/ForgotPasswordPage";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedPage from "@/features/traveler(user)/errorPages/pages/UnauthorizedPage";
import NotFoundPage from "@/features/traveler(user)/errorPages/pages/NotFoundPage";
import ResetPasswordPage from "@/features/traveler(user)/forgotPassword/pages/ResetPasswordPage";
import UserProfile from "@/features/traveler(user)/dashboard/profile/pages/UserProfile";
import UserLayout from "@/layouts/UserLayout";
import { Page } from "@/shared/layouts/page";
// import PublicRoute from "./PublicRoute";
// import { UserProfile } from "@/features/traveler(user)/dashboard/profile/pages/UserProfile";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          {/* <Route element={<PublicRoute />}> */}
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
          <Route path="/otp-verification" element={<OtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          {/* </Route> */}

          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/page" element={<Page />} />
          </Route>

          {/* Traveler Routes */}
          {/* <Route
            element={<ProtectedRoute allowedRoles={["TRAVELER"]} />} */}

          {/* ></Route> */}

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}></Route>

          {/* Forbidden */}
          <Route path="/403" element={<UnauthorizedPage />} />

          {/* Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
