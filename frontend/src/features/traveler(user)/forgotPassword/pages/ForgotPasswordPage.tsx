import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f4faff] to-[#e9f6fd] flex flex-col items-center justify-center p-6 font-sans">
      <div className="flex flex-col items-center gap-2 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl font-black text-[#6c63ff] tracking-tighter">
          TripNest
        </h1>
      </div>

      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
