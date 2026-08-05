import React from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f4faff] to-[#e9f6fd] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="flex flex-col items-center gap-2 mb-8 z-10">
        <h1 className="text-3xl font-black text-[#6c63ff] tracking-tighter">
          TripNest
        </h1>
      </div>

      <div className="max-w-250 w-full flex flex-col md:flex-row items-center justify-center gap-12 z-10">
        <ResetPasswordForm />

        {/* Keep your side image card exactly as it is */}
      </div>

      <div className="mt-auto pt-12 pb-6 z-10">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] flex items-center gap-2">
          Secure Your Journey <span className="text-gray-300">•</span> TripNest
          AI
        </p>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-linear-to-bl from-[#2e7d32]/5 to-transparent rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-[#6c63ff]/5 to-transparent rounded-full blur-3xl -ml-20 -mb-20" />
    </div>
  );
};

export default ResetPasswordPage;
