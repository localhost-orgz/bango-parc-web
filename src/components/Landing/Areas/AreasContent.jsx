"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Modal } from "react-aria-components";

function AreasContent() {
  const [activeArea, setActiveArea] = useState(null);

  const areas_list = [
    {
      id: 1,
      src: "/depan.jpg",
      text: "Area Depan",
      iframe:
        "https://momento360.com/e/u/6763d28b74b6454a99ca75fac7749672?utm_campaign=embed&amp;utm_source=other&amp;heading=0&amp;pitch=0&amp;field-of-view=75&amp;size=medium&amp;display-plan=true",
    },
    {
      id: 2,
      src: "/tengah.jpg",
      text: "Ruang Tengah",
      iframe:
        "https://momento360.com/e/u/04009f3d33eb43839b573c84c8401327?utm_campaign=embed&amp;utm_source=other&amp;heading=0&amp;pitch=0&amp;field-of-view=75&amp;size=medium&amp;display-plan=true",
    },
    {
      id: 3,
      src: "/belakang.jpg",
      text: "Area Belakang",
      iframe:
        "https://momento360.com/e/u/b706016ed4454f81a739a96f52ac3184?utm_campaign=embed&utm_source=other&heading=148.33&pitch=0.1&field-of-view=60.33&size=medium&display-plan=true",
    },
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

                <button onClick={() => setActiveArea(area)} className="text-sm">
                  EXPLORE 360°
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activeArea && (
        <Modal360 area={activeArea} onClose={() => setActiveArea(null)} />
      )}
    </>
  );
}

export default AreasContent;

function Modal360({ area, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handle = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handle);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center sm:p-4 md:p-8"
      style={{
        background: "rgba(10,11,18,0.92)",
        backdropFilter: "blur(16px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Card */}
      <div
        className="relative w-full max-w-5xl overflow-hidden sm:h-auto h-full"
        style={{
          background: "#0F131F",
          border: "1px solid rgba(137,109,81,0.25)",
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-4">
            {/* Gold dot */}
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: "#896d51", boxShadow: "0 0 8px #896d5180" }}
            />
            <div>
              <p className="font-crimson-pro text-white text-2xl leading-none">
                {area.text}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Virtual Tour · 360°
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 360 pill */}
            <span
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{
                color: "#896d51",
                border: "1px solid rgba(137,109,81,0.35)",
                background: "rgba(137,109,81,0.08)",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 64 64" fill="none">
                <path
                  d="M32 42.67H42.67V53.33"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M51.89 29.44C54.18 23.14 53.81 17.23 50.29 13.71C44.23 7.65 31.13 10.92 21.03 21.03C10.93 31.13 7.65 44.23 13.71 50.29C19.65 56.23 32.34 53.2 42.35 43.58"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Explore 360°
            </span>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="w-9 h-9 flex items-center justify-center transition-all duration-150"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,0.4)";
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="1" y1="1" x2="12" y2="12" />
                <line x1="12" y1="1" x2="1" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Viewer */}
        <div className="relative w-full sm:aspect-video flex-1 bg-[#050608] h-full">
          <iframe
            src={area.iframe}
            className="w-full h-full border-0 block"
            allowFullScreen
            title={`360° ${area.text}`}
          />
        </div>

        {/* Bottom bar */}
        <div
          className="px-6 py-3 flex items-center gap-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {[
            { icon: "↔", label: "Drag untuk memutar" },
            { icon: "⊕", label: "Scroll untuk zoom" },
            { icon: "Esc", label: "Tutup", mono: true },
          ].map(({ icon, label, mono }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="text-[10px] px-1.5 py-0.5 font-medium"
                style={{
                  fontFamily: mono ? "monospace" : "inherit",
                  color: "#896d51",
                  background: "rgba(137,109,81,0.1)",
                  border: "1px solid rgba(137,109,81,0.2)",
                }}
              >
                {icon}
              </span>
              <span
                className="text-[11px]"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
