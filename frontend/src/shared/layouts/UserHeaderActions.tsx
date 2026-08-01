import { Bell, ChevronDown } from "lucide-react";
import AccountDropdown from "./AccountDropdown";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";
import { useHeader } from "../hooks/useHeader";

const UserHeaderActions = () => {
  const user = useSelector(selectUser);

  const hasProfileImage = Boolean(user?.profileImage);

  const { dropdownRef, isDropdownOpen, toggleDropdown, closeDropdown } =
    useHeader();

  return (
    <div className="flex items-center gap-5">
      {/* Notifications */}

      <button
        className="
          relative
          rounded-full
          p-2
          transition
          hover:bg-gray-100
        "
      >
        <Bell size={18} />

        <span
          className="
            absolute
            right-2
            top-2
            h-2.5
            w-2.5
            rounded-full
            bg-red-500
          "
        />
      </button>

      {/* Avatar */}

      <div ref={dropdownRef} className="relative">
        <button
          onClick={toggleDropdown}
          className="
            flex
            items-center
            gap-2
            rounded-full
            transition
          "
        >
          {hasProfileImage ? (
            <img
              src={user!.profileImage}
              alt="profile"
              className="h-10 w-10 rounded-full border-2 border-green-600 object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-600 bg-green-600 text-lg font-bold text-white">
              {user?.fullName?.[0]?.toUpperCase() || "U"}
            </div>
          )}

          <ChevronDown
            size={16}
            className={`transition ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isDropdownOpen && <AccountDropdown onClose={closeDropdown} />}
      </div>
    </div>
  );
};

export default UserHeaderActions;
