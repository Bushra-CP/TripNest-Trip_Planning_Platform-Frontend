import { useSelector } from "react-redux";
import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";
import Logo from "./Logo";
import Navigation from "./Navigation";
import UserHeaderActions from "./UserHeaderActions";
import GuestHeaderActions from "./GuestHeaderActions";

const AppHeader = () => {
  const user = useSelector(selectUser);

  return (
    <header className="relative z-50 top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <Navigation />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-5">
            {user ? <UserHeaderActions /> : <GuestHeaderActions />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
