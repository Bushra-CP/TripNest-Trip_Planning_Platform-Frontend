import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OtpForm from "../components/OtpForm";
import type { PendingOtpData } from "../hooks/useOtp";

const OtpPage: React.FC = () => {
  const navigate = useNavigate();

  const pendingRegistration = sessionStorage.getItem("pendingRegistration");
  const pendingPasswordReset = sessionStorage.getItem("pendingPasswordReset");

  const pendingData: PendingOtpData | null = pendingRegistration
    ? JSON.parse(pendingRegistration)
    : pendingPasswordReset
      ? JSON.parse(pendingPasswordReset)
      : null;

  useEffect(() => {
    if (!pendingData) {
      navigate("/login", { replace: true });
    }
  }, [navigate, pendingData]);

  if (!pendingData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f4faff] flex flex-col items-center justify-center p-6 font-sans">
      {/* Brand Header */}
      <div className="flex flex-col items-center gap-2 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl font-black text-[#6c63ff] tracking-tighter">
          TripNest
        </h1>

        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
          Verify Your Identity
        </p>
      </div>

      <OtpForm userId={pendingData.userId} email={pendingData.email} />
    </div>
  );
};

export default OtpPage;
