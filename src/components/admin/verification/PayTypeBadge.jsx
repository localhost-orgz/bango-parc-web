function PayTypeBadge({ type }) {
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 ${
        type === "DP"
          ? "bg-blue-50 border border-blue-200 text-blue-700"
          : "bg-purple-50 border border-purple-200 text-purple-700"
      }`}
    >
      {type}
    </span>
  );
}

export default PayTypeBadge;
