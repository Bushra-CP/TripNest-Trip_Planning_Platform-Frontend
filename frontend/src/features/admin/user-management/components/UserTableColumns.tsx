import type { TableColumn } from "@/shared/components/table";

import { Ban, ExternalLink, MoreVertical } from "lucide-react";
import type { User } from "../types/user.types";

interface UserTableColumnsProps {
  onView(user: User): void;
  onBlock(user: User): void;
}

const statusStyles = {
  Active: {
    text: "text-[#2e7d32]",
    dot: "bg-[#2e7d32]",
  },

  Blocked: {
    text: "text-red-700",
    dot: "bg-red-500",
  },
};

export const getUserTableColumns = ({
  onView,
  onBlock,
}: UserTableColumnsProps): TableColumn<User>[] => [
  {
    key: "user",

    title: "User",

    render: (user) => (
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 overflow-hidden rounded-full ring-1 ring-slate-200">
          <img
            src={user.profileImage || "/images/default-avatar.png"}
            alt={user.fullName}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-black text-slate-900">{user.fullName}</p>

          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            ID : {user.id}
          </p>
        </div>
      </div>
    ),
  },

  {
    key: "contact",

    title: "Contact Details",

    render: (user) => (
      <>
        <p className="text-sm text-slate-600">{user.email}</p>

        <p
          className={`text-[11px] font-bold uppercase tracking-tight ${
            user.phoneNumber ? "text-slate-400" : "italic text-red-400"
          }`}
        >
          {user.phoneNumber ?? "Unverified"}
        </p>
      </>
    ),
  },

  {
    key: "joined",

    title: "Joined Date",

    render: (user) => (
      <span className="text-sm font-bold text-slate-600">
        {new Date(user.createdAt).toLocaleDateString()}
      </span>
    ),
  },

  {
    key: "status",

    title: "Status",

    render: (user) => (
      <div className="flex items-center gap-2">
        <div
          className={`h-1.5 w-1.5 rounded-full ${
            statusStyles[user.status].dot
          }`}
        />

        <span
          className={`text-[10px] font-black uppercase tracking-wider ${
            statusStyles[user.status].text
          }`}
        >
          {user.status}
        </span>
      </div>
    ),
  },

  {
    key: "actions",

    title: "Actions",

    align: "right",

    render: (user) => (
      <div className="flex items-center justify-end gap-1">
        <button
          title="View"
          onClick={() => onView(user)}
          className="rounded-lg p-2 text-slate-400 transition-all hover:bg-white hover:text-[#2e7d32]"
        >
          <ExternalLink size={16} />
        </button>

        <button
          title="Block"
          onClick={() => onBlock(user)}
          className="rounded-lg p-2 text-slate-400 transition-all hover:bg-white hover:text-red-600"
        >
          <Ban size={16} />
        </button>

        <button
          title="More"
          className="rounded-lg p-2 text-slate-300 transition-colors hover:text-slate-900"
        >
          <MoreVertical size={16} />
        </button>
      </div>
    ),
  },
];
