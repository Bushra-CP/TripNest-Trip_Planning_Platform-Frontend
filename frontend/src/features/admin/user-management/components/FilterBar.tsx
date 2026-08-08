import { Search } from "lucide-react";

import type { UserStatus } from "../types/user.types";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: UserStatus | "All";
  onStatusChange: (value: UserStatus | "All") => void;
}

const FilterBar = ({
  search,
  onSearchChange,

  status,
  onStatusChange,
}: FilterBarProps) => {
  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            placeholder="Search by name, email or ID..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value as UserStatus | "All")
            }
            className="h-11 w-44 rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-[#2e7d32]"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
