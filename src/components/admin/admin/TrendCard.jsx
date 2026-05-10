import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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

import { PieChart, Pie, Legend } from "recharts";

const trendData = [
  { month: "Jan", count: 6 },
  { month: "Feb", count: 12 },
  { month: "Mar", count: 6 },
  { month: "Apr", count: 6 },
  { month: "Mei", count: 6 },
  { month: "Jun", count: 6 },
];

const venueData = [
  { name: "Area Depan", count: 3, max: 14 },
  { name: "Area Tengah", count: 9, max: 14 },
  { name: "Area Belakang", count: 2, max: 14 },
];
function TrendCard() {
  return (
    <div className="bg-white border border-[#0F131F]/10 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-crimson-pro text-xl text-[#0F131F]">
            Tren Reservasi Per Bulan
          </h3>
          <p className="text-xs text-black/40 mt-0.5">
            Reservasi acara yang telah dilaksanakan pada Bango Parc per bulan
            nya
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-7 w-7 border border-[#0F131F]/20 flex items-center justify-center hover:bg-[#0F131F]/5 transition-colors">
            <ChevronLeft size={14} />
          </button>
          <div className="flex items-center gap-1 border border-[#0F131F]/20 px-3 py-1.5 text-xs font-semibold">
            2025
            <ChevronDown size={12} />
          </div>
          <button className="h-7 w-7 border border-[#0F131F]/20 flex items-center justify-center hover:bg-[#0F131F]/5 transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={trendData} barSize={32}>
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
            {trendData.map((entry, index) => (
              <Cell key={index} fill="#0F131F" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendCard;
