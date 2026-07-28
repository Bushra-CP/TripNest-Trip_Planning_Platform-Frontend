import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <div className="flex items-center gap-8">
        <div className="text-2xl font-black text-[#6c63ff] tracking-tight">
          TripNest
        </div>
      </div>
    </Link>
  );
};

export default Logo;
