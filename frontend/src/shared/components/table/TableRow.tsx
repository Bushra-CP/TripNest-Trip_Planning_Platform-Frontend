import type { TableColumn } from "./types";

interface TableRowProps<T> {
  row: T;
  columns: TableColumn<T>[];
  selectable?: boolean;
}

const TableRow = <T,>({
  row,
  columns,
  selectable = false,
}: TableRowProps<T>) => {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      {selectable && (
        <td className="px-6 py-4 text-center">
          <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
        </td>
      )}

      {columns.map((column) => (
        <td
          key={column.key}
          className={`
            px-6
            py-4
            ${
              column.align === "center"
                ? "text-center"
                : column.align === "right"
                  ? "text-right"
                  : "text-left"
            }
          `}
        >
          {column.render(row)}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
