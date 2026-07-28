import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { KeyboardEvent } from "react";

const SearchBar = () => {
  const navigate = useNavigate();

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const query = e.currentTarget.value.trim();

    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
      <div className="relative w-full hidden sm:block">
        <input
          type="text"
          placeholder="Search experiences..."
          onKeyDown={handleSearch}
          className="w-full h-10 pl-10 pr-4 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#6c63ff]/20 transition-all outline-none"
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
      </div>
    </div>
  );
};

export default SearchBar;
