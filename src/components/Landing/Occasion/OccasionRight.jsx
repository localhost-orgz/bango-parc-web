import React from "react";

function OccasionRight() {
  const occasion_list = [
    {
      id: 1,
      src: "/famget.jpg",
      label: "Family Gathering",
    },
    {
      id: 2,
      src: "/yoga.jpg",
      label: "Yoga",
    },
    {
      id: 3,
      src: "/wedding.jpg",
      label: "Wedding",
    },
  ];
  return (
    <>
      {occasion_list.map((occ) => (
        <div
          key={occ.id}
          className="col-span-2 relative bg-black w-full h-auto aspect-9/16"
        >
          <div
            style={{ backgroundImage: `url(${occ.src})` }}
            className="absolute inset-0 bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end py-5 px-3">
            <span className="font-crimson-text text-white text-2xl">
              {occ.label}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export default OccasionRight;
