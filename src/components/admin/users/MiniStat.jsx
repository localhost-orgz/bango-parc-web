function MiniStat({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="flex-1 min-w-0 border border-[#0F131F]/10 bg-[#f9f8f6] p-3 flex flex-col gap-1">
      <div className={`flex items-center gap-1.5 ${color}`}>
        <Icon size={12} strokeWidth={2} />
        <span className="text-[10px] font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="font-crimson-pro text-2xl text-[#0F131F] leading-tight">
        {value}
      </p>
      {sub && <p className="text-[10px] text-black/35">{sub}</p>}
    </div>
  );
}

export default MiniStat;
