import React from "react";

type TTableProps = {
  column: Column[];
  row: (item: any) => React.ReactNode;
  data: any[];
};

export default function Table({ column, data, row }: TTableProps) {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {column.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data?.map((item) => row(item))}</tbody>
    </table>
  );
}
