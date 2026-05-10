function TypeBadge({ type }) {
  return (
    <span
      className={`text-[10px] font-bold px-1.5 py-0.5 border ${type === "Wedding" ? "border-[#896d51] text-[#896d51] bg-[#896d51]/5" : "border-[#0F131F]/20 text-[#0F131F]/50"}`}
    >
      {type}
    </span>
  );
}

export default TypeBadge;
