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

function CategoryCard({ categoryData, venueData }) {
  return (
    <div className="bg-white border border-[#0F131F]/10 p-5 flex flex-col gap-5">
      <div>
        <h3 className="font-crimson-pro text-xl text-[#0F131F]">
          Kategori Event
        </h3>
      </div>

      {/* Pie Chart */}
      <div className="flex items-center justify-center">
        <PieChart width={220} height={160}>
          <Pie
            data={categoryData}
            cx={110}
            cy={75}
            innerRadius={40}
            outerRadius={75}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            paddingAngle={2}
            label={({ name }) => name}
            labelLine={false}
          >
            {categoryData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div className="flex flex-col gap-2">
        {categoryData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: item.color }}
              />
              <span className="text-black/60">{item.name}</span>
            </div>
            <span className="font-semibold text-[#0F131F]">{item.value}%</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#0F131F]/10" />

      {/* Tren Venue */}
      <div>
        <h3 className="font-crimson-pro text-lg text-[#0F131F] mb-3">
          Tren Venue
        </h3>
        <div className="flex flex-col gap-3">
          {venueData.map((v) => (
            <div key={v.name} className="flex items-center gap-3">
              <span className="text-xs text-black/50 w-24 shrink-0">
                {v.name}
              </span>
              <div className="flex-1 h-2 bg-[#0F131F]/8 rounded-none">
                <div
                  className="h-full bg-[#0F131F] transition-all"
                  style={{ width: `${(v.count / v.max) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-[#0F131F] w-5 text-right">
                {v.count}x
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
