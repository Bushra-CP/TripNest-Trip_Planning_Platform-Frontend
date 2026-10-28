import type { TableColumn } from "./types";

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  selectable?: boolean;
}

const TableHeader = <T,>({
  columns,
  selectable = false,
}: TableHeaderProps<T>) => {
  return (
    <thead className="bg-slate-50 border-b border-slate-200">
      <tr>
        {selectable && (
          <th className="w-14 px-6 py-4 text-center">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-300"
            />
          </th>
        )}

        {columns.map((column) => (
          <th
            key={column.key}
            className={`
              px-6
              py-4
              text-[11px]
              font-bold
              uppercase
              tracking-wider
              text-slate-500
              ${
                column.align === "center"
                  ? "text-center"
                  : column.align === "right"
                    ? "text-right"
                    : "text-left"
              }
            `}
            style={{
              width: column.width,
            }}
          >
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
