import { useState, useMemo, useEffect } from "react";
import { useMapInteraction } from "@/hooks/use-map-interaction"; 
import { toast } from "sonner";
import { ZoomIn, ZoomOut, Layers, MapPin } from "lucide-react";
import FloorSVG from "./FloorSVG";

import floorMinus2Raw from "@/assets/floors/floor-minus-2.txt?raw";
import floorMinus1Raw from "@/assets/floors/floor-minus-1.txt?raw";
import floor0Raw from "@/assets/floors/floor-0.txt?raw";
import floor1Raw from "@/assets/floors/floor-1.txt?raw";
import floor2Raw from "@/assets/floors/floor-2.txt?raw";
import floor3Raw from "@/assets/floors/floor-3.txt?raw";

const FloorMap = () => {
  const [currentFloorId, setCurrentFloorId] = useState("1");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  
  // --- DÜZELTME BURADA ---
  // Eski hesaplamayı (4200px'e bölme işlemini) kaldırdık.
  // Harita artık SVG içinden width="100%" olduğu için kendiliğinden sığıyor.
  // Başlangıçta tam sığması için scale: 1 veriyoruz. (Kenarlardan az boşluk kalsın dersen 0.95 yapabilirsin)
  const { transform, handleMouseDown, handleZoom, isDragging, setTransform } = useMapInteraction(1);

  // Pencere boyutu değişirse scale'i koru veya 1'e çek (Opsiyonel, şu an gerek yok)
  // useEffect(() => { ... }, []); // Buradaki resize listener'ı da silebiliriz artık.


  const FLOORS = useMemo(() => [
    { id: "-2", label: "-2", content: floorMinus2Raw },
    { id: "-1", label: "-1", content: floorMinus1Raw },
    { id: "0", label: "Z", content: floor0Raw },
    { id: "1", label: "1", content: floor1Raw },
    { id: "2", label: "2", content: floor2Raw },
    { id: "3", label: "3", content: floor3Raw },
  ], []);

  const currentFloorData = FLOORS.find(f => f.id === currentFloorId);

  const handleRoomClick = (roomId: string) => {
    if (isDragging) return;
    setSelectedRoomId(roomId);
    if (window.innerWidth < 768) {
      toast.success(`${roomId} görüntülendi`);
    }
  };

  return (
    <div className="flex h-full w-full relative overflow-hidden bg-gray-100/50">
      
      {/* SOL: HARİTA ALANI */}
      <div className={`flex-1 relative transition-all duration-300 ${selectedRoomId ? 'mr-0 md:mr-96' : ''}`}>
        
        {/* Kat Seçici */}
        <div className="absolute top-32 left-6 z-20 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur shadow-md border border-gray-200 rounded-xl p-1.5 flex flex-col gap-1 pointer-events-auto">
            {FLOORS.slice().reverse().map((floor) => (
              <button
                key={floor.id}
                onClick={() => setCurrentFloorId(floor.id)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                  currentFloorId === floor.id
                    ? "bg-primary text-white shadow-md scale-105"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                {floor.label}
              </button>
            ))}
          </div>
        </div>

        {/* Harita Canvas */}
        <div 
          className={`w-full h-full cursor-grab active:cursor-grabbing touch-none ${isDragging ? 'cursor-grabbing' : ''}`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div
            className="origin-center transition-transform duration-100 w-full h-full flex items-center justify-center"
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            }}
          >
            {/* SVG Wrapper */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10 filter drop-shadow-xl">
               {currentFloorData ? (
                 <FloorSVG 
                   svgContent={currentFloorData.content} 
                   onRoomClick={handleRoomClick}
                 />
               ) : (
                 <div className="p-20 text-gray-400">Kat verisi yok</div>
               )}
            </div>
          </div>
        </div>

        {/* Zoom Kontrolleri */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-20">
          <button onClick={() => handleZoom(0.2)} className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 text-gray-700 active:scale-95 transition-transform">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button onClick={() => handleZoom(-0.2)} className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 text-gray-700 active:scale-95 transition-transform">
            <ZoomOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* SAĞ: SIDEBAR */}
      <div 
        className={`fixed md:absolute top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 z-30 ${
          selectedRoomId ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedRoomId && (
          <div className="flex flex-col h-full pt-24 md:pt-0">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur-sm">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Seçilen Alan</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-xs text-gray-500 flex items-center gap-1">
                     <MapPin className="w-3 h-3" /> {currentFloorId}. Kat / ID: {selectedRoomId}
                   </span>
                </div>
              </div>
              <button onClick={() => setSelectedRoomId(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500">✕</button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-4">
                <strong>{selectedRoomId}</strong> seçildi.
              </div>
              <button className="w-full btn-primary py-3 rounded-xl shadow-md">Programı Gör</button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default FloorMap;