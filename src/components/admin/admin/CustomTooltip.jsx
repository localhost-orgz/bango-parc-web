const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F131F] border border-white/10 px-3 py-2 text-xs text-white">
        <p className="font-semibold">{label}</p>
        <p className="text-[#896d51]">{payload[0].value} reservasi</p>
      </div>
    );
  }
  return null;
};
export default CustomTooltip;
