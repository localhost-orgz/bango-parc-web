import { ArrowRight, CalendarDays, Clock } from "lucide-react";

const VenueInfo = ({ orderData }) => {
  return (
    <div className="bg-white border border-[#0f131f]/15 p-5 flex flex-col gap-3">
      <h5 className="font-crimson-text font-semibold text-xl text-[#0f131f] pb-2 border-b border-[#0f131f]/15">
        Detail Venue
      </h5>
      <div
        className="w-full aspect-video bg-gray-300 bg-cover bg-center"
        style={{ backgroundImage: "url(/about-us2.jpg)" }}
      />
      <div className="flex flex-col gap-1.5">
        <h6 className="font-crimson-pro text-2xl text-[#0f131f]">
          {orderData.venueName}
        </h6>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-black/60 bg-[#0f131f]/5 border border-[#0f131f]/15 px-3 py-2">
          <CalendarDays size={12} strokeWidth={1.5} color="#0f131f" />
          <span>{orderData.date}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-black/60 bg-[#0f131f]/5 border border-[#0f131f]/15 px-3 py-2">
          <Clock size={12} strokeWidth={1.5} color="#0f131f" />
          <span>{orderData.startTime}</span>
          <ArrowRight size={10} strokeWidth={1.5} color="#0f131f" />
          <span>{orderData.endTime}</span>
          <span className="text-black/30 ml-auto">
            {orderData.duration} jam
          </span>
        </div>
      </div>
    </div>
  );
};

export default VenueInfo;
