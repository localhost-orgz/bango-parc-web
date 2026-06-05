import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomTooltip from "./CustomTooltip";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function TrendCard({ trendData = [], activeYear, onYearChange }) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  // Populate all 12 months for the selected activeYear
  const chartData = monthNames.map((name, index) => {
    const monthNum = String(index + 1).padStart(2, "0");
    const monthKey = `${activeYear}-${monthNum}`;
    
    // Find matching item in trendData
    const match = (trendData || []).find((item) => item.month === monthKey);
    
    return {
      month: name,
      count: match ? match.count : 0,
    };
  });

  return (
    <div className="bg-white border border-[#0F131F]/10 p-5 flex flex-col gap-4 min-h-[320px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-crimson-pro text-xl text-[#0F131F]">
            Tren Reservasi Per Bulan
          </h3>
          <p className="text-xs text-black/40 mt-0.5">
            Reservasi acara yang telah dilaksanakan pada Bango Parc per bulan nya
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button 
            onClick={() => onYearChange(activeYear - 1)}
            className="h-7 w-7 border border-[#0F131F]/20 flex items-center justify-center hover:bg-[#0F131F]/5 transition-colors cursor-pointer"
            title="Tahun Sebelumnya"
          >
            <ChevronLeft size={14} />
          </button>
          <select
            value={activeYear}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="flex items-center gap-1 border border-[#0F131F]/20 px-2 py-1.5 text-xs font-semibold bg-white text-[#0F131F] outline-none cursor-pointer rounded-none"
          >
            {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(yr => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
          <button 
            onClick={() => onYearChange(activeYear + 1)}
            className="h-7 w-7 border border-[#0F131F]/20 flex items-center justify-center hover:bg-[#0F131F]/5 transition-colors cursor-pointer"
            title="Tahun Berikutnya"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="w-full flex-1">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={32}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#00000066", fontSize: 11 }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#0F131F08" }} />
            <Bar
              dataKey="count"
              radius={0}
              label={{ position: "top", fontSize: 10, fill: "#00000055" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill="#0F131F" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TrendCard;
