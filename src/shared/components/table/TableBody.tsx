import TableEmpty from "./TableEmpty";
import TableLoading from "./TableLoading";
import TableRow from "./TableRow";
import type { TableColumn } from "./types";

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  selectable?: boolean;
  emptyMessage?: string;
}

const TableBody = <T,>({
  data,
  columns,
  loading = false,
  selectable = false,
  emptyMessage = "No data found.",
}: TableBodyProps<T>) => {
  if (loading) {
    return (
      <tbody>
        <TableLoading columnCount={columns.length} selectable={selectable} />
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody>
        <TableEmpty
          columnCount={columns.length}
          selectable={selectable}
          message={emptyMessage}
        />
      </tbody>
    );
  }

  return (
    <tbody className="divide-y divide-slate-100">
      {data.map((row, index) => (
        <TableRow
          key={index}
          row={row}
          columns={columns}
          selectable={selectable}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
