import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import type { DataTableProps } from "./types";

const DataTable = <T,>({
  columns,
  data,
  loading = false,
  selectable = false,
  emptyMessage = "No data found.",
  pagination,
}: DataTableProps<T>) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHeader columns={columns} selectable={selectable} />

          <TableBody
            data={data}
            columns={columns}
            loading={loading}
            selectable={selectable}
            emptyMessage={emptyMessage}
          />
        </table>
      </div>

      {pagination && (
        <TablePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
};

export default DataTable;
