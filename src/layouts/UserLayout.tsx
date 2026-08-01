import AppHeader from "@/shared/layouts/AppHeader";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <AppHeader />

      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
