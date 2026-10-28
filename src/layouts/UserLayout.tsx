import AppHeader from "@/shared/layouts/userLayout/AppHeader";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <AppHeader />

      <main className="min-h-screen bg-gray-50 pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
