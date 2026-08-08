import { Download, UserPlus } from "lucide-react";

import { DataTable } from "@/shared/components/table";

import FilterBar from "../components/FilterBar";
import StatCard from "../components/StatCard";
import UserDetailsModal from "../components/UserDetailsModal";

import useUserManagement from "../hooks/useUserManagement";

const UserManagementPage = () => {
  const {
    users,
    columns,
    loading,
    pagination,

    search,
    setSearch,

    status,
    setStatus,

    selectedUser,
    isUserDetailsOpen,
    closeUserDetails,
  } = useUserManagement();

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-['Plus_Jakarta_Sans',sans-serif] text-[#1a1c1e]">
      {/* Header */}
      <header className="mb-8 flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">
            User Management
          </h1>

          <p className="text-sm font-medium text-slate-500">
            Manage platform members, assign roles, and monitor account status.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 text-sm font-bold shadow-sm transition-colors hover:bg-slate-50">
            <Download size={18} className="text-slate-400" />
            Export CSV
          </button>

          <button className="flex h-11 items-center gap-2 rounded-lg bg-[#2e7d32] px-6 text-sm font-bold text-white shadow-lg shadow-[#2e7d32]/20 transition-all hover:bg-[#256628] active:scale-[0.98]">
            <UserPlus size={18} />
            Add User
          </button>
        </div>
      </header>

      {/* Statistics */}
      <StatCard />

      {/* Filters */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        selectable
        emptyMessage="No users found."
        pagination={pagination}
      />

      {/* View User Modal */}
      <UserDetailsModal
        open={isUserDetailsOpen}
        user={selectedUser}
        onClose={closeUserDetails}
      />
    </div>
  );
};

export default UserManagementPage;
