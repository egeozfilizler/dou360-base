"use client";

import { cn } from "@/lib/utils";

interface AutoScrollProps {
  children: React.ReactNode;
  className?: string;
  duration?: number; // Loop duration in seconds
  gap?: number; // Gap in pixels
}

export function AutoScroll({ 
  children, 
  className, 
  duration = 30, 
  gap = 32 
}: AutoScrollProps) {
  return (
    <div 
      className={cn("flex overflow-hidden w-full select-none", className)}
      style={{ 
          // Marquee animation in tailwind config uses these variables
          "--gap": `${gap}px`, 
          "--duration": `${duration}s` 
      } as React.CSSProperties}
    >
      {/* First copy */}
      <div className="flex shrink-0 min-w-full items-center justify-around gap-[var(--gap)] animate-marquee">
        {children}
      </div>
      {/* Second copy (creates the infinite loop illusion) */}
      <div aria-hidden="true" className="flex shrink-0 min-w-full items-center justify-around gap-[var(--gap)] animate-marquee">
        {children}
      </div>
    </div>
  );
}