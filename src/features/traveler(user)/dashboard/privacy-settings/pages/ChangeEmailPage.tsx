import ChangeEmailForm from "../components/ChangeEmailForm";

const ChangeEmailPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f4faff] to-[#e9f6fd] flex flex-col items-center justify-center p-6 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-linear-to-bl from-[#2e7d32]/5 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-[#6c63ff]/5 to-transparent rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="min-h-screen bg-linear-to-br from-[#f4faff] to-[#e9f6fd] flex flex-col items-center justify-center p-6 font-sans">
        <div className="flex flex-col items-center gap-2 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-3xl font-black text-[#6c63ff] tracking-tighter">
            TripNest
          </h1>
        </div>

        <ChangeEmailForm />
      </div>

      <div className="mt-auto pt-12 pb-6 text-center">
        <p className="text-[9px] text-gray-300">
          © 2024 TripNest Travel Technologies. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ChangeEmailPage;
