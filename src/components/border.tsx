import React from "react";

interface BorderWrapperProps {
  children: React.ReactNode;
}

export default function BorderWrapper({ children }: BorderWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen md:p-12 p-4">
      <div className="relative w-full h-full border-6 border-neutral-900 p-8 rounded-2xl">
        {children}
      </div>
    </div>
  );
}
