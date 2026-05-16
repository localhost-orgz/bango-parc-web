import React from "react";

function TestimonialCard({ testi }) {
  return (
    <div className="w-full min-h-80 sm:min-h-87.5 bg-[#f1f0ee] px-5 sm:px-7 py-7 sm:py-10 rounded-2xl gap-8 flex flex-col justify-between">
      <div className="flex flex-col">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 290 290"
        >
          <path
            d="M22.12 145v97.65h97.65V145H70.95c0-26.92 21.9-48.82 48.82-48.82V47.35c-53.93 0-97.65 43.72-97.65 97.65zm245.76-48.82V47.35c-53.93 0-97.65 43.72-97.65 97.65v97.65h97.65V145h-48.82c-.01-26.92 21.89-48.82 48.82-48.82z"
            fill="#646952"
          ></path>
        </svg>

        <p className="font-crimson-text text-base sm:text-lg leading-6 mt-4 text-neutral-800">
          {testi.review}
        </p>
      </div>

      <div className="flex flex-row items-center justify-start gap-3">
        <div className="h-10 w-10 sm:h-11 sm:w-11 bg-slate-300 rounded-full relative shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-full"
            style={{
              backgroundImage: `url(${testi.avatar})`,
            }}
          />
        </div>

        <div className="flex flex-col">
          <span className="font-crimson-pro text-lg sm:text-xl leading-none">
            {testi.name}
          </span>

          <span className="text-xs sm:text-sm text-neutral-500 mt-1">
            {testi.role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
