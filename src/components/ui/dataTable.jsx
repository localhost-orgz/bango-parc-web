import React from "react";

export default function DataTable({ data = [], columns = [] }) {
  return (
    <div className="overflow-x-auto border border-[#0F131F]/10 bg-white">
      <table className="w-full text-sm text-left">
        <thead className="sticky top-0 bg-white z-10 border-b border-[#0F131F]/10">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-black/40"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-16 text-sm text-black/30 bg-white"
              >
                Tidak ada data tersedia.
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-[#0F131F]/5 last:border-0 transition-colors hover:bg-[#f9f8f6] border-l-2 border-l-transparent"
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-5 py-4 whitespace-nowrap text-sm text-[#0F131F]/80">
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

