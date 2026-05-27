import React from "react";

export default function DataTable({ data = [], columns = [] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 tracking-wider">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-gray-600">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-gray-400"
              >
                Tidak ada data tersedia.
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {/* Jika ada fungsi render kustom, jalankan fungsinya. Jika tidak, ambil properti objek berdasarkan key */}
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
