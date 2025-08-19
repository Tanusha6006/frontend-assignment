import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey as keyof T];
        const bVal = b[sortKey as keyof T];
        if (aVal < bVal) return sortAsc ? -1 : 1;
        if (aVal > bVal) return sortAsc ? 1 : -1;
        return 0;
      })
    : data;

  const toggleRow = (row: T) => {
    let newSelection: T[];
    if (selectedRows.includes(row)) {
      newSelection = selectedRows.filter(r => r !== row);
    } else {
      newSelection = [...selectedRows, row];
    }
    setSelectedRows(newSelection);
    onRowSelect?.(newSelection);
  };

  if (loading) return <p>Loading...</p>;
  if (!data.length) return <p>No data available</p>;

  return (
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="p-2">Select</th>}
          {columns.map(col => (
            <th
              key={col.key}
              className="p-2 cursor-pointer"
              onClick={() => col.sortable && handleSort(col.key)}
            >
              {col.title}
              {sortKey === col.key && (sortAsc ? " 🔼" : " 🔽")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map(row => (
          <tr key={row.id} className="border-t">
            {selectable && (
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => toggleRow(row)}
                />
              </td>
            )}
            {columns.map(col => (
              <td key={col.key} className="p-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
