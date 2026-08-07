import { MoreHorizontal } from "lucide-react";

interface UserRowProps {
  name: string;
  email: string;
  date: string;
  status: string;
}

const UserRow = ({
  name,
  email,
  date,
  status,
}: UserRowProps) => {
  return (
    <tr className="group hover:bg-slate-50 transition-colors">

      <td className="px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold uppercase">
            {name.charAt(0)}
          </div>

          <div>

            <p className="text-sm font-bold text-slate-900">
              {name}
            </p>

            <p className="text-xs text-slate-400">
              {email}
            </p>

          </div>

        </div>

      </td>

      <td className="px-6 py-4 text-xs font-bold text-slate-600">
        {date}
      </td>

      <td className="px-6 py-4">

        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            status === "Active"
              ? "bg-[#2e7d32]/10 text-[#2e7d32]"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {status}
        </span>

      </td>

      <td className="px-6 py-4 text-right">

        <button className="p-2 rounded-lg hover:bg-white hover:text-[#2e7d32] transition">

          <MoreHorizontal size={18} />

        </button>

      </td>

    </tr>
  );
};

export default UserRow;