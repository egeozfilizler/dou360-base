import { useMemo } from "react";
import FloorSVG from "./FloorSVG";

// Kat planlarını ham metin (raw) olarak çekiyoruz
import floorMinus2Raw from "@/assets/floors/floor-minus-2.txt?raw";
import floorMinus1Raw from "@/assets/floors/floor-minus-1.txt?raw";
import floor0Raw from "@/assets/floors/floor-0.txt?raw";
import floor1Raw from "@/assets/floors/floor-1.txt?raw";
import floor2Raw from "@/assets/floors/floor-2.txt?raw";
import floor3Raw from "@/assets/floors/floor-3.txt?raw";

interface FloorMapProps {
  floor: number;
  onRoomClick?: (roomId: string) => void;
  highlightedRoomId?: string | null;
}

export default function FloorMap({ floor, onRoomClick, highlightedRoomId }: FloorMapProps) {
  
  // Gelen 'floor' numarasına göre doğru SVG dosyasını seç
  const svgContent = useMemo(() => {
    switch (floor) {
      case -2: return floorMinus2Raw;
      case -1: return floorMinus1Raw;
      case 0: return floor0Raw;
      case 1: return floor1Raw;
      case 2: return floor2Raw;
      case 3: return floor3Raw;
      default: return floor0Raw;
    }
  }, [floor]);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* ESKİ KODLAR SİLİNDİ (Sidebar, Zoom butonları, Search vb.)
          Artık sadece SVG çiziliyor.
      */}
      <FloorSVG
        svgContent={svgContent}
        onRoomClick={(id) => onRoomClick?.(id)}
      />
    </div>
  );
}