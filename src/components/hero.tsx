"use client";
import React, { useState, useEffect } from "react";
import ShinyText from "@/components/ui/shiny-text";

export default function Hero({
  fadeOut,
}: {
  fadeOut: React.SetStateAction<boolean>;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (fadeOut) {
      // Wait for the animation to finish before hiding the component
      const timeout = setTimeout(() => setIsVisible(false), 500); // Match the duration of the animation
      return () => clearTimeout(timeout);
    } else {
      setIsVisible(true); // Show the component again if fadeOut is false
    }
  }, [fadeOut]);

  if (!isVisible) return null; // Don't render the component if it's not visible

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      {/* Japanese text at the top */}
      <div
        className={`absolute top-4 flex justify-center font transition-all duration-500 ease-in-out ${
          fadeOut
            ? "translate-y-[-50px] opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <h2 className="text-xl JP text-neutral-100">ることのでき</h2>
      </div>
      {/* Centered content */}
      <div
        className={`relative inset-0 flex flex-col items-center m-8 justify-center transition-opacity duration-500 ease-in-out ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-6xl text-neutral-100">Chatster</h1>
        <ShinyText speedInMs={10000} className="text-2xl text-center">
          Real-time chat application written in Go and Next.js
        </ShinyText>
      </div>
    </div>
  );
}
