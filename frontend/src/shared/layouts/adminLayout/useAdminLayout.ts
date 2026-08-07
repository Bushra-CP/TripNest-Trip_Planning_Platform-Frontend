import type { AppDispatch } from "@/app/store";
import { logoutThunk } from "@/features/traveler(user)/auth/redux/authThunk";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAdminLayout = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const notificationCount = 2;

  const admin = {
    name: "Admin User",
    email: "admin@tripnest.com",
    avatar: "https://i.pravatar.cc/150?u=admin",
  };

  const handleLogout = () => {
    console.log("Logout");

    dispatch(logoutThunk());
    navigate("/admin/login");
  };

  return {
    search,
    setSearch,
    notificationCount,
    admin,
    handleLogout,
  };
};
