function RecentReservations({ bookedDates }) {
  const recentReservations = Object.entries(bookedDates)
    .flatMap(([date, data], index) =>
      data.events.map((event, eventIndex) => ({
        code: `B-${String(index + eventIndex + 1).padStart(3, "0")}`,
        event: `${event.name} - ${date}`,
        status:
          data.status === "wedding" || data.status === "full"
            ? "Approved"
            : "Pending",
      })),
    )
    .slice(0, 5);
  return (
    <div className="bg-white border border-[#0F131F]/10 p-5 flex flex-col gap-4">
      <h3 className="font-crimson-pro text-xl text-[#0F131F]">
        Reservasi Terbaru
      </h3>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#0F131F]/10">
              <th className="text-left pb-3 text-xs font-semibold uppercase tracking-wide text-black/40">
                Kode
              </th>
              <th className="text-left pb-3 text-xs font-semibold uppercase tracking-wide text-black/40">
                Acara
              </th>
              <th className="text-right pb-3 text-xs font-semibold uppercase tracking-wide text-black/40">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {recentReservations.map((r) => (
              <tr
                key={r.code}
                className="border-b border-[#0F131F]/5 last:border-0"
              >
                <td className="py-3 text-black/60 font-mono text-xs">
                  {r.code}
                </td>
                <td className="py-3 text-[#0F131F]">{r.event}</td>
                <td className="py-3 text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold ${
                      r.status === "Canceled"
                        ? "bg-red-100 text-red-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default RecentReservations;
