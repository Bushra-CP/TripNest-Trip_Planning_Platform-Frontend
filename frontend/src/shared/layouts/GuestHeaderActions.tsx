import { Link } from "react-router-dom";

const GuestHeaderActions = () => {
  return (
    <div
      className="flex items-center gap-1 rounded-xl
          border
          border-slate-600
          px-5
          py-2
          text-sm
          font-semibold
          text-slate-600
          transition"
    >
      <Link to="/login" className="hover:text-[#6c63ff] transition-colors">
        Login
      </Link>
      /
      <Link to="/register" className="hover:text-[#6c63ff] transition-colors">
        SignUp
      </Link>
    </div>
  );
};

export default GuestHeaderActions;
