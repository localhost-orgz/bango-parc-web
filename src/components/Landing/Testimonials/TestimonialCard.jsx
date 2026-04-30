import React from "react";

function TestimonialCard({ testi }) {
  return (
    <div
      key={testi.id}
      className="col-span-3 w-full h-auto aspect-square bg-[#f1f0ee] px-7 py-10 rounded-lg gap-8 flex flex-col justify-between"
    >
      <div className="flex flex-col">
        <svg
          className="w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 290 290"
        >
          <path
            d="M22.12 145v97.65h97.65V145H70.95c0-26.92 21.9-48.82 48.82-48.82V47.35c-53.93 0-97.65 43.72-97.65 97.65zm245.76-48.82V47.35c-53.93 0-97.65 43.72-97.65 97.65v97.65h97.65V145h-48.82c-.01-26.92 21.89-48.82 48.82-48.82z"
            fill="#646952"
          ></path>
        </svg>
        {/* <div className="h-0.5 w-full bg-[#C08B5C]" /> */}
        <p className="font-crimson-text text-lg leading-5.5 mt-3">
          {testi.review}
        </p>
      </div>
      <div className="flex flex-row items-center justify-start gap-2">
        <div className="h-10 w-10 bg-slate-300 rounded-full"></div>
        <div className="flex flex-col">
          <span className="font-crimson-pro text-xl">{testi.name}</span>
          <span className="text-xs">{testi.role}</span>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
