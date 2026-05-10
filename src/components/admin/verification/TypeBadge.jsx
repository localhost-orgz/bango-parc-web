function TypeBadge({ type }) {
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 border ${
        type === "Wedding"
          ? "border-[#896d51] text-[#896d51] bg-[#896d51]/5"
          : "border-[#0F131F]/30 text-[#0F131F]/60 bg-[#0F131F]/3"
      }`}
    >
      {type}
    </span>
  );
}

export default TypeBadge;
