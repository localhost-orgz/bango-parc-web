function StatCard({ title, value, sub, accent, highlight }) {
  return (
    <div
      className={`flex-1 min-w-0 border p-5 flex flex-col gap-2 ${
        highlight
          ? "bg-white border-red-500 ring-1 ring-red-500"
          : "bg-white border-[#0F131F]/10"
      }`}
    >
      <p className={`text-sm ${highlight ? "text-black/50" : "text-black/50"}`}>
        {title}
      </p>
      <p
        className={`font-crimson-pro leading-none ${
          accent
            ? "text-red-500 text-5xl"
            : highlight
              ? "text-[#0F131F] text-5xl"
              : "text-[#0F131F] text-4xl"
        }`}
      >
        {value}
      </p>
      <p
        className={`text-xs ${highlight ? "text-red-400 font-semibold" : "text-black/40"}`}
      >
        {sub}
      </p>
    </div>
  );
}

export default StatCard;
