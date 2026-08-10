import { BrowserRouter, Routes, Route } from "react-router-dom";

import OtpPage from "@/features/traveler(user)/otp/pages/OtpPage";
import RegisterPage from "@/features/traveler(user)/register/pages/RegisterPage";
import LoginPage from "@/features/traveler(user)/auth/pages/LoginPage";
import HomePage from "@/features/traveler(user)/home/pages/HomePage";
import ForgotPasswordPage from "@/features/traveler(user)/forgot-password/pages/ForgotPasswordPage";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedPage from "@/features/traveler(user)/error-pages/pages/UnauthorizedPage";
import NotFoundPage from "@/features/traveler(user)/error-pages/pages/NotFoundPage";
import ResetPasswordPage from "@/features/traveler(user)/forgot-password/pages/ResetPasswordPage";
import UserProfile from "@/features/traveler(user)/dashboard/profile/pages/UserProfile";
import UserLayout from "@/layouts/UserLayout";
import PrivacySettingsPage from "@/features/traveler(user)/dashboard/privacy-settings/pages/PrivacySettingsPage";
import ChangePasswordPage from "@/features/traveler(user)/dashboard/privacy-settings/pages/ChangePasswordPage";
import ChangeEmailPage from "@/features/traveler(user)/dashboard/privacy-settings/pages/ChangeEmailPage";
import AdminLoginPage from "@/features/admin/login/pages/AdminLoginPage";
import AdminDashboardPage from "@/features/admin/dashboard/pages/AdminDashboardPage";
import AdminLayout from "@/layouts/AdminLayout";
import UserManagement from "@/features/admin/user-management/pages/UserManagement";
import PublicRoute from "./PublicRoute";
import { APP_ROUTES } from "@/shared/constants/routes.constants";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          /*----------------------- PUBLIC ROUTES ------------------------*/
          <Route element={<PublicRoute />}>
            <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={APP_ROUTES.OTP_VERIFICATION} element={<OtpPage />} />
            <Route
              path={APP_ROUTES.FORGOT_PASSWORD}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={APP_ROUTES.RESET_PASSWORD}
              element={<ResetPasswordPage />}
            />
            <Route path={APP_ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
          </Route>
          //
          <Route element={<UserLayout />}>
            <Route path={APP_ROUTES.HOME_PAGE} element={<HomePage />} />
            /*----------------------- USER ROUTES ------------------------*/
            <Route element={<ProtectedRoute allowedRoles={["TRAVELER"]} />}>
              <Route path={APP_ROUTES.PROFILE} element={<UserProfile />} />
              <Route
                path={APP_ROUTES.SETTINGS}
                element={<PrivacySettingsPage />}
              />
              <Route
                path={APP_ROUTES.CHANGE_PASSWORD}
                element={<ChangePasswordPage />}
              />
              <Route
                path={APP_ROUTES.CHANGE_EMAIL}
                element={<ChangeEmailPage />}
              />
            </Route>
          </Route>
          // /*----------------------- ADMIN ROUTES ------------------------*/
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AdminLayout />}>
              <Route
                path={APP_ROUTES.ADMIN_DASHBOARD}
                element={<AdminDashboardPage />}
              />
              <Route
                path={APP_ROUTES.ADMIN_USER_MANAGEMENT}
                element={<UserManagement />}
              />
            </Route>
          </Route>
          /*----------------------- ERROR ROUTES ------------------------*/
          {/* Forbidden */}
          <Route
            path={APP_ROUTES.UNAUTHERISED_PAGE}
            element={<UnauthorizedPage />}
          />
          {/* Not Found */}
          <Route path={APP_ROUTES.NOT_FOUND_PAGE} element={<NotFoundPage />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}
