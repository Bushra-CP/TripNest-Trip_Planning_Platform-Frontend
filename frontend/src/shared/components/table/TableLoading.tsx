interface TableLoadingProps {
  columnCount: number;
  selectable?: boolean;
  rowCount?: number;
}

const TableLoading = ({
  columnCount,
  selectable = false,
  rowCount = 5,
}: TableLoadingProps) => {
  const totalColumns = selectable ? columnCount + 1 : columnCount;

  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-slate-100 animate-pulse">
          {Array.from({ length: totalColumns }).map((_, columnIndex) => (
            <td key={columnIndex} className="px-6 py-4">
              <div className="h-4 w-full rounded-md bg-slate-200" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableLoading;
