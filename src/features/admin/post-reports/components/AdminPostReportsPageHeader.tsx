import { Download, Flag } from "lucide-react";

interface AdminPostReportsPageHeaderProps {
  onExport: () => void;
}

const AdminPostReportsPageHeader = ({
  onExport,
}: AdminPostReportsPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Page title and description */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Post Report Management
          </h1>

          <span className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
            <Flag size={12} />
            MODERATION ENGINE
          </span>
        </div>

        <p className="text-sm text-gray-500">
          Review reported posts, investigate violations, and manage report
          resolutions.
        </p>
      </div>

      {/* Export button */}
      <button
        type="button"
        onClick={onExport}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
      >
        <Download size={16} />
        Export Current Page
      </button>
    </div>
  );
};

export default AdminPostReportsPageHeader;
