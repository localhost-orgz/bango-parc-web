const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-[#0F131F]/90 backdrop-blur-md border border-[#896d51]/30 px-4 py-3 shadow-2xl flex flex-col gap-1 border-l-4 border-l-[#896d51]">
        <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
          Bulan {label}
        </span>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-xl font-bold text-white tracking-tight leading-none">
            {value}
          </span>
          <span className="text-[11px] text-[#896d51] font-semibold">
            reservasi
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
