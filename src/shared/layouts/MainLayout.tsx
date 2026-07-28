import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

const MainLayout = () => {
  return (
    <>
      <AppHeader />

      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;