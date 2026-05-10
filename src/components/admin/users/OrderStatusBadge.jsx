function OrderStatusBadge({ status }) {
  const map = {
    Finished: "bg-emerald-50 border-emerald-200 text-emerald-700",
    Canceled: "bg-red-50 border-red-200 text-red-600",
    Ongoing: "bg-amber-50 border-amber-200 text-amber-700",
  };
  return (
    <span
      className={`px-2 py-0.5 border text-[10px] font-semibold ${map[status] || map.Ongoing}`}
    >
      {status}
    </span>
  );
}

export default OrderStatusBadge;
