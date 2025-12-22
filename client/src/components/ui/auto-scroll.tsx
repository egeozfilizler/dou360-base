"use client";

import { cn } from "@/lib/utils";

interface AutoScrollProps {
  children: React.ReactNode;
  className?: string;
  duration?: number; // Saniye cinsinden tur süresi
  gap?: number; // Piksel cinsinden boşluk
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
          // Tailwind config dosyasındaki marquee animasyonu bu değişkenleri kullanıyor
          "--gap": `${gap}px`, 
          "--duration": `${duration}s` 
      } as React.CSSProperties}
    >
      {/* 1. Kopya */}
      <div className="flex shrink-0 min-w-full items-center justify-around gap-[var(--gap)] animate-marquee">
        {children}
      </div>
      {/* 2. Kopya (Sonsuz döngü illüzyonu için) */}
      <div aria-hidden="true" className="flex shrink-0 min-w-full items-center justify-around gap-[var(--gap)] animate-marquee">
        {children}
      </div>
    </div>
  );
}