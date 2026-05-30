"use client";

import { ReactLenis } from "lenis/react";

export default function LenisProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.15,         // Higher value (0.15 vs 0.1) catches up to user scroll faster
        duration: 1.0,     // Snappy duration of 1.0s (vs 1.5s) completes scroll animation faster
        smoothWheel: true, // Smooth mouse wheel scrolling
        smoothTouch: false // Keeps native scrolling on mobile for a natural touch response
      }}
    >
      {children}
    </ReactLenis>
  );
}
