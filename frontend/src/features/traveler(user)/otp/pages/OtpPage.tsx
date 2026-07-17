import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OtpForm from "../components/OtpForm";

interface PendingRegistration {
  userId: string;
  email: string;
  expiresAt: number;
}

const OtpPage: React.FC = () => {
  const navigate = useNavigate();

  const pendingRegistration = sessionStorage.getItem("pendingRegistration");

  useEffect(() => {
    if (!pendingRegistration) {
      navigate("/register", { replace: true });
    }
  }, [navigate, pendingRegistration]);

  if (!pendingRegistration) {
    return null;
  }

  const registration: PendingRegistration = JSON.parse(pendingRegistration);

  return (
    <div className="min-h-screen bg-[#f4faff] flex flex-col items-center justify-center p-6 font-sans">
      {/* Brand Header */}
      <div className="flex flex-col items-center gap-2 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl font-black text-[#2e7d32] tracking-tighter">
          TripNest
        </h1>

        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
          Verify Your Identity
        </p>
      </div>

      <OtpForm userId={registration.userId} email={registration.email} />
    </div>
  );
};

export default OtpPage;
