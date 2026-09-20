import { FileUp, Search, X } from "lucide-react";

interface KnowledgeBaseToolbarProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onUploadClick: () => void;
}

const KnowledgeBaseToolbar = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onUploadClick,
}: KnowledgeBaseToolbarProps) => {
  const handleClearSearch = () => {
    onSearchChange("");
  };

  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left side - Search and Filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search documents..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />

          {search && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        >
          <option value="">All Status</option>
          <option value="PENDING">Uploaded</option>
          <option value="PROCESSING">Processing</option>
          <option value="READY">Ready</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      {/* Upload Button */}
      <button
        type="button"
        onClick={onUploadClick}
        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        <FileUp size={18} />
        Upload Document
      </button>
    </div>
  );
};

export default KnowledgeBaseToolbar;