import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes.constants";
import OtpPage from "@/features/traveler(user)/otp/pages/OtpPage";
import RegisterPage from "@/features/traveler(user)/register/pages/RegisterPage";
import LoginPage from "@/features/traveler(user)/auth/pages/LoginPage";
import HomePage from "@/features/traveler(user)/home/pages/HomePage";
import ForgotPasswordPage from "@/features/traveler(user)/forgot-password/pages/ForgotPasswordPage";
// import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedPage from "@/features/traveler(user)/error-pages/pages/UnauthorizedPage";
import NotFoundPage from "@/features/traveler(user)/error-pages/pages/NotFoundPage";
import ResetPasswordPage from "@/features/traveler(user)/forgot-password/pages/ResetPasswordPage";
import UserProfile from "@/features/traveler(user)/dashboard/profile/pages/UserProfile";
import UserLayout from "@/layouts/UserLayout";
import PrivacySettingsPage from "@/features/traveler(user)/dashboard/privacy-settings/pages/PrivacySettingsPage";
import Page from "@/shared/layouts/userLayout/page";
import ChangePasswordPage from "@/features/traveler(user)/dashboard/privacy-settings/pages/ChangePasswordPage";
import ChangeEmailPage from "@/features/traveler(user)/dashboard/privacy-settings/pages/ChangeEmailPage";
import AdminLoginPage from "@/features/admin/login/pages/AdminLoginPage";
import AdminDashboardPage from "@/features/admin/dashboard/pages/AdminDashboardPage";
import AdminLayout from "@/layouts/AdminLayout";
import UserManagement from "@/features/admin/user-management/pages/UserManagement";
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

            <Route path="/settings" element={<PrivacySettingsPage />} />
          </Route>

          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/change-email" element={<ChangeEmailPage />} />
          <Route path="/page" element={<Page />} />
          {/* Traveler Routes */}
          {/* <Route
            element={<ProtectedRoute allowedRoles={["TRAVELER"]} />} */}

          {/* ></Route> */}

          {/* Admin Routes */}
          {/* <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}></Route> */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<UserManagement />} />
          </Route>

          {/* Forbidden */}
          <Route path="/403" element={<UnauthorizedPage />} />

          {/* Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
