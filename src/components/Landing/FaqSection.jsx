import { faq_list } from "@/constants/faq";
import React, { useState } from "react";
import FaqItem from "./FaqItem";

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-layout">
      <div className="grid-12">
        <div className="lg:col-span-5 col-span-12 flex flex-col gap-3">
          <h3 className="section-headline">FAQ (Frequently Asked Questions)</h3>
          <p className="section-subheadline lg:w-[80%]">
            {`Kami kumpulkan pertanyaan yang paling sering ditanyakan. Kalau belum
            terjawab, jangan ragu untuk langsung `}
            <a href="#" className="underline">
              menghubungi kami.
            </a>
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 col-span-12">
          {faq_list.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
