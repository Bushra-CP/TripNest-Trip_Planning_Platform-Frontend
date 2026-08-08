interface TableEmptyProps {
  columnCount: number;
  selectable?: boolean;
  message?: string;
}

const TableEmpty = ({
  columnCount,
  selectable = false,
  message = "No data found.",
}: TableEmptyProps) => {
  return (
    <tr>
      <td
        colSpan={selectable ? columnCount + 1 : columnCount}
        className="px-6 py-16 text-center"
      >
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-700">{message}</h3>

          <p className="text-sm text-slate-500">
            There are no records to display.
          </p>
        </div>
      </td>
    </tr>
  );
};

export default TableEmpty;
