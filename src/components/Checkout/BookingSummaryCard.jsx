import { ArrowRight, Building2, CalendarDays, Clock } from "lucide-react";

export default function BookingSummaryCard({ data }) {
  return (
    <div className="bg-white border border-[#0F131F]/10 p-5 sm:p-6">
      <h5 className="font-crimson-pro text-xl text-[#0F131F] mb-4 pb-3 border-b border-[#0F131F]/10">
        Ringkasan Booking
      </h5>
      <div className="flex gap-4">
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 bg-cover bg-center shrink-0"
          style={{ backgroundImage: `url(${data.image})` }}
        />
        <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
          <h6 className="font-crimson-pro text-xl sm:text-2xl text-[#0F131F]">
            {data.venueName}
          </h6>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-[#0F131F]/60 bg-[#0F131F]/5 border border-[#0F131F]/12 px-2.5 py-1.5">
              <CalendarDays size={12} strokeWidth={1.5} color="#0F131F" />
              <span>{data.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#0F131F]/60 bg-[#0F131F]/5 border border-[#0F131F]/12 px-2.5 py-1.5">
              <Clock size={12} strokeWidth={1.5} color="#0F131F" />
              <span>
                {data.startTime}
                <ArrowRight
                  size={10}
                  className="inline mx-1"
                  strokeWidth={1.5}
                  color="#0F131F"
                />
                {data.endTime}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#0F131F]/60 bg-[#0F131F]/5 border border-[#0F131F]/12 px-2.5 py-1.5">
              <Building2 size={12} strokeWidth={1.5} color="#0F131F" />
              <span>{data.duration} Jam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
