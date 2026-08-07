import { useSelector } from "react-redux";
import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import UserHeaderActions from "./UserHeaderActions";
import GuestHeaderActions from "./GuestHeaderActions";

const AppHeader = () => {
  const user = useSelector(selectUser);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <Navigation />
        </div>

        <SearchBar />

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
