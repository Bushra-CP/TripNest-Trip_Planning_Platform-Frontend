import AdminLoginForm from "../components/AdminLoginForm";
import adminLogin from "@/assets/images/adminLogin.png";

const AdminLoginPage = () => {
  return (
    <div className="min-h-screen w-full flex bg-[#f7f9fb]">
      {/* Left Hero */}

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={adminLogin}
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-linear-to-br from-black/40 via-transparent to-black/60" />

        <div className="relative z-10 p-16 mt-auto max-w-2xl">
          <h1 className="text-2xl font-bold text-white">
            Precision Tools for Premium Travel Management.
          </h1>
        </div>
      </div>

      {/* Right */}

      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-120">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#2e7d32] uppercase">
              TripNest Admin
            </h2>

            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
              Internal Management Systems
            </p>
          </div>

          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
