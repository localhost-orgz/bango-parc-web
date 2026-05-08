import HelpLink from "./HelpLink";
import PriceBreakdown from "./PriceBreakdown";
import TrustBadges from "./TrustBadges";

export default function RightColumn({ data }) {
  return (
    <div className="col-span-12 lg:col-span-5">
      <div className="lg:sticky lg:top-6 flex flex-col gap-4">
        <PriceBreakdown data={data} />
        <TrustBadges />
        <HelpLink />
      </div>
    </div>
  );
}
