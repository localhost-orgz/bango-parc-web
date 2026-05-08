import Link from "next/link";
import BookingNotice from "./BookingNotice";
import BookingSummaryCard from "./BookingSummaryCard";
import OrdererForm from "./OrdererForm";
import { ArrowLeft } from "lucide-react";

export default function LeftColumn({ data }) {
  return (
    <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
      <BookingSummaryCard data={data} />
      <OrdererForm />
      <BookingNotice />
      <Link
        href={"/venue/detail"}
        className="flex items-center gap-2 text-sm text-[#0F131F]/60 hover:text-[#0F131F] transition-colors w-fit"
      >
        <ArrowLeft size={15} strokeWidth={1.5} />
        <span>Kembali ke Detail Venue</span>
      </Link>
    </div>
  );
}
