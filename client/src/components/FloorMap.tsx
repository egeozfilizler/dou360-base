import { useState, useMemo, useEffect } from "react";
import { useMapInteraction } from "@/hooks/use-map-interaction"; 
import { toast } from "sonner";
import { ZoomIn, ZoomOut, Layers, MapPin, Search as SearchIcon, X } from "lucide-react";
import FloorSVG from "./FloorSVG";
import { search, type SearchResult } from "@/lib/Search";

import floorMinus2Raw from "@/assets/floors/floor-minus-2.txt?raw";
import floorMinus1Raw from "@/assets/floors/floor-minus-1.txt?raw";
import floor0Raw from "@/assets/floors/floor-0.txt?raw";
import floor1Raw from "@/assets/floors/floor-1.txt?raw";
import floor2Raw from "@/assets/floors/floor-2.txt?raw";
import floor3Raw from "@/assets/floors/floor-3.txt?raw";

const FloorMap = () => {
  const [currentFloorId, setCurrentFloorId] = useState("1");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchResult(null);
      setShowSearchResults(false);
      return;
    }

    const result = search(searchQuery);
    setSearchResult(result);
    setShowSearchResults(true);

    if (!result) {
      toast.error("Sonuç bulunamadı");
    } else {
      toast.success("Sonuçlar bulundu");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResult(null);
    setShowSearchResults(false);
  };

  return (
    <div className="flex h-full w-full relative overflow-hidden bg-gray-100/50">
      
      {/* SOL: HARİTA ALANI */}
      <div className={`flex-1 relative transition-all duration-300 ${selectedRoomId ? 'mr-0 md:mr-96' : ''}`}>

        {/* Arama Çubuğu */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-xl px-6">
          <form onSubmit={handleSearch} className="relative">
            <div className="bg-white/95 backdrop-blur shadow-lg border border-gray-200 rounded-2xl overflow-hidden">
              <div className="flex items-center">
                <SearchIcon className="w-5 h-5 text-gray-400 ml-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Öğretmen, oda veya 'Öğretmen + Ders' ara..."
                  className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-2 hover:bg-gray-100 rounded-full mr-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 hover:bg-primary/90 transition-colors font-medium"
                >
                  Ara
                </button>
              </div>
            </div>

            {/* Arama Sonuçları */}
            {showSearchResults && searchResult && (
              <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur shadow-xl border border-gray-200 rounded-2xl p-4 animate-in slide-in-from-top-2 duration-200 z-1000">
                {searchResult.type === 'teacher' && (
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{searchResult.teacher}</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Dersler:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {searchResult.subjects.map((subject) => (
                            <span key={subject} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Dersler Verilen Odalar:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {searchResult.rooms.map((room) => (
                            <span key={room} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              {room}
                            </span>
                          ))}
                        </div>
                      </div>
                      {searchResult.teacherRooms && searchResult.teacherRooms.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Öğretmen Odası:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {searchResult.teacherRooms.map((room) => (
                              <span key={room} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                                {room}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {searchResult.type === 'room' && (
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{searchResult.room}</h3>
                    {searchResult.currentSubject ? (
                      <div className="space-y-2">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-green-900">Şu Anki Ders</p>
                          <p className="text-lg font-bold text-green-700 mt-1">{searchResult.currentSubject.subject}</p>
                          <p className="text-sm text-green-600">{searchResult.currentSubject.time}</p>
                          {searchResult.currentSubject.teacher && (
                            <p className="text-sm text-green-600">Öğretmen: {searchResult.currentSubject.teacher}</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="text-sm text-gray-600">{searchResult.message || 'Şu anda ders yok'}</p>
                      </div>
                    )}
                  </div>
                )}

                {searchResult.type === 'teacher-subject' && (
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {searchResult.teacher} - {searchResult.subject}
                    </h3>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-2">Bu dersin verildiği odalar:</p>
                      <div className="flex flex-wrap gap-1">
                        {searchResult.rooms.map((room) => (
                          <span key={room} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                            {room}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {searchResult.type === 'subject' && (
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-3">{searchResult.subject}</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {searchResult.classes.map((classItem, index) => (
                        <div
                          key={`${classItem.room}-${classItem.day}-${classItem.time}-${index}`}
                          className="bg-amber-50 border border-amber-200 rounded-lg p-3"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-amber-900">{classItem.room}</p>
                              <p className="text-sm text-amber-700">{classItem.teacher}</p>
                              <p className="text-xs text-amber-600 mt-1">{classItem.day}</p>
                              <p className="text-xs text-amber-600">{classItem.time}</p>
                            </div>
                            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                              {classItem.day}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {showSearchResults && !searchResult && (
              <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur shadow-xl border border-gray-200 rounded-2xl p-4 animate-in slide-in-from-top-2 duration-200 z-50">
                <p className="text-gray-500 text-sm">Sonuç bulunamadı</p>
              </div>
            )}
          </form>
        </div>
        
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