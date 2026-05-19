"use client";
import { X } from "lucide-react";
import React, { useState } from "react";

function AreasContent() {
  const [is360, setIs360] = useState(false);
  const areas_list = [
    { id: 1, src: "/depan.jpg", text: "Depan" },
    { id: 2, src: "/tengah.jpg", text: "Ruang Tengah" },
    { id: 3, src: "/belakang.jpg", text: "Belakang" },
  ];
  return (
    <>
      <div className="grid-12 mt-5">
        {areas_list.map((area) => (
          <div
            key={area.id}
            className="relative lg:col-span-4 col-span-12 w-full h-auto aspect-video bg-slate-200"
          >
            <div
              style={{ backgroundImage: `url('${area.src}')` }}
              className="absolute inset-0 top-0 left-0 bg-cover bg-center"
            />
            <div className="bg-black/40 absolute inset-0 flex justify-center items-center">
              <span className="font-crimson-text text-white text-2xl">
                {area.text}
              </span>
              <div className="absolute bottom-3 right-3 py-1.5 px-2.5 flex flex-row gap-2 bg-white items-center">
                <svg
                  className="w-5 h-5"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_148_32)">
                    <path
                      d="M32 42.6666H42.6667V53.3333"
                      stroke="black"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M51.8879 29.4446C54.1812 23.1353 53.8132 17.2313 50.2879 13.7113C44.2292 7.64727 31.1279 10.9246 21.0266 21.0259C10.9253 31.1273 7.64792 44.2286 13.7093 50.2899C19.6479 56.2259 32.3412 53.2046 42.3492 43.5833"
                      stroke="black"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_148_32">
                      <rect width="64" height="64" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <button onClick={() => setIs360(true)} className="text-sm">
                  EXPLORE 360°
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {is360 && (
        <div className="fixed inset-0 bg-black/70 z-[999999] flex justify-center items-center p-4">
          <div className="relative sm:w-[90%] w-full sm:h-[600px] h-full overflow-hidden">
            {/* Tombol Close */}
            <button
              onClick={() => setIs360(false)}
              className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            {/* Iframe */}
            <iframe
              src="https://momento360.com/e/u/b706016ed4454f81a739a96f52ac3184?utm_campaign=embed&amp;utm_source=other&amp;heading=148.33&amp;pitch=0.1&amp;field-of-view=60.33&amp;size=medium&amp;display-plan=true"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AreasContent;
