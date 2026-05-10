import React from "react";

function AreasContent() {
  const areas_list = [
    { id: 1, src: "/indoor.jpg", text: "Indoor" },
    { id: 2, src: "/semi-indoor.jpg", text: "Semi-indoor" },
    { id: 3, src: "/outdoor.jpg", text: "Outdoor" },
  ];
  return (
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

              <span className="text-sm">EXPLORE 360°</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AreasContent;
