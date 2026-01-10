import { useState, useMemo } from "react";
import { useMapInteraction } from "@/hooks/use-map-interaction"; 
import { toast } from "sonner";
import { ZoomIn, ZoomOut, Layers, MapPin } from "lucide-react";
import FloorSVG from "./FloorSVG"; // Yeni bileşenimiz

// DOSYALARI HAM METİN OLARAK IMPORT ET (?raw ÇOK ÖNEMLİ)
import floorMinus2Raw from "@/assets/floors/floor-minus-2.txt?raw";
import floorMinus1Raw from "@/assets/floors/floor-minus-1.txt?raw";
import floor0Raw from "@/assets/floors/floor-0.txt?raw";
import floor1Raw from "@/assets/floors/floor-1.txt?raw";
import floor2Raw from "@/assets/floors/floor-2.txt?raw";
import floor3Raw from "@/assets/floors/floor-3.txt?raw";

const FloorMap = () => {
  const [currentFloorId, setCurrentFloorId] = useState("1"); // Varsayılan: 1. Kat
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const { transform, handleMouseDown, handleZoom, isDragging } = useMapInteraction(1);

  // Kat Listesi ve Dosya Eşleştirmesi
  const FLOORS = useMemo(() => [
    { id: "-2", label: "-2", content: floorMinus2Raw },
    { id: "-1", label: "-1", content: floorMinus1Raw },
    { id: "0", label: "Z", content: floor0Raw },
    { id: "1", label: "1", content: floor1Raw },
    { id: "2", label: "2", content: floor2Raw },
    { id: "3", label: "3", content: floor3Raw },
  ], []);

  // Şu anki katın SVG içeriğini bul
  const currentFloorData = FLOORS.find(f => f.id === currentFloorId);

  const handleRoomClick = (roomId: string) => {
    if (isDragging) return;
    
    // Odanın gerçek ismini bulmak için burada bir eşleştirme (mapping) yapabiliriz.
    // Şimdilik SVG sırasına göre "Room-1", "Room-2" geliyor.
    setSelectedRoomId(roomId); 
    
    // Mobil için bildirim
    if (window.innerWidth < 768) {
      toast.success(`${roomId} görüntülendi`);
    }
  };

  return (
    <div className="flex h-full w-full relative overflow-hidden bg-gray-50/50">
      
      {/* SOL: HARİTA ALANI */}
      <div className={`flex-1 relative transition-all duration-300 ${selectedRoomId ? 'mr-0 md:mr-96' : ''}`}>
        
        {/* Kat Seçici */}
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur shadow-sm border border-gray-200 rounded-xl p-1.5 flex flex-col gap-1">
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
            className="origin-center transition-transform duration-100 w-full h-full flex items-center justify-center p-4 md:p-10"
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            }}
          >
            <div className="relative shadow-2xl bg-white rounded-lg border border-gray-100 overflow-hidden w-full h-full md:w-auto md:h-auto">
               
               {/* AKILLI SVG RENDERER */}
               {currentFloorData ? (
                 <FloorSVG 
                   svgContent={currentFloorData.content} 
                   onRoomClick={handleRoomClick}
                 />
               ) : (
                 <div className="flex items-center justify-center p-20 text-gray-400">Kat verisi yüklenemedi</div>
               )}

            </div>
          </div>
        </div>

        {/* Zoom Butonları */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-20">
          <button onClick={() => handleZoom(0.2)} className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 text-gray-700">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button onClick={() => handleZoom(-0.2)} className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 text-gray-700">
            <ZoomOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* SAĞ: BİLGİ PANELİ */}
      <div 
        className={`fixed md:absolute top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 z-30 ${
          selectedRoomId ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedRoomId && (
          <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur-sm">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedRoomId}</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">Sınıf</span>
                   <span className="text-xs text-gray-500 flex items-center gap-1">
                     <MapPin className="w-3 h-3" /> {currentFloorId}. Kat
                   </span>
                </div>
              </div>
              <button onClick={() => setSelectedRoomId(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500">✕</button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-500 text-sm">
                Burası dinamik olarak seçilen odanın verilerini gösterecek. 
                <br /><br />
                Şu anki ID: <strong>{selectedRoomId}</strong>
                <br />
                (Bu ID, SVG içindeki sırasına göre otomatik atandı. İleride gerçek isimlerle eşleştireceğiz.)
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default FloorMap;