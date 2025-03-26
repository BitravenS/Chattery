import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";
// import "./shiny-text.css";
const ShinyText = ({
  children,
  speedInMs = 5000,
  className,
  ...props
}: {
  children: ReactNode;
  speedInMs?: number;
} & ComponentProps<"div">) => {
  return (
    <>
      <style>
        {`
        @keyframes shine {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
        `}
      </style>
      <div
        className={cn(
          "inline-block bg-clip-text text-transparent",
          "bg-linear-to-r from-35% via-50% to-65%",
          "from-white via-zinc-300 to-white",
          "dark:from-neutral-500 dark:via-neutral-50 dark:to-neutral-500",
          className
        )}
        style={{
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          animation: `shine ${speedInMs}ms linear infinite`,
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export default ShinyText;
