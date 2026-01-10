import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloorMap from "@/components/FloorMap";
import { useMapInteraction } from "@/hooks/use-map-interaction";
import { cn } from "@/lib/utils";
import { 
  Search, 
  X, 
  Navigation, 
  Share2, 
  Plus, 
  Minus, 
  Compass, 
  MapPin,
  LogOut
} from "lucide-react";

export default function MapPage() {
  const navigate = useNavigate();
  const [currentFloor, setCurrentFloor] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Getting values from the hook
  const { transform, handleMouseDown, handleZoom, setTransform } = useMapInteraction();

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    // Clear any auth-related cookies (if stored in localStorage)
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    // Navigate to signin
    navigate("/");
  };

  // Bind zoom functions to handleZoom
  const handleZoomIn = () => handleZoom(0.2);
  const handleZoomOut = () => handleZoom(-0.2);
  
  // Wrapper function for mouse wheel zoom
  const onWheel = (e: React.WheelEvent) => {
    // Upward scroll (zoom in) positive, downward negative
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    handleZoom(delta);
  };

  const handleResetMap = () => {
    setTransform({ scale: 0.75, x: 0, y: 0 });
  };

  const handleRoomClick = (roomData: any) => {
    if (!roomData) return;
    setSelectedRoom(roomData);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F5F5F5] font-sans text-slate-900">
      
      {/* LAYER 0: MAP */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-[#F5F5F5]"
        onWheel={onWheel} // Wheel event bound here
        onMouseDown={handleMouseDown}
      >
        <div 
            style={{ 
                // Getting values from transform object
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                transition: 'transform 0.1s ease-out',
                width: '100%',
                height: '100%'
            }}
            className="origin-center will-change-transform cursor-grab active:cursor-grabbing"
        >
             {/* Check step 2 below for FloorMap error */}
             <FloorMap 
                floor={currentFloor} 
                onRoomClick={handleRoomClick}
             />
        </div>
      </div>

      {/* LAYER 1: UI OVERLAY */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        
        {/* Search Bar */}
        <div className="absolute top-6 left-6 pointer-events-auto w-[360px] max-w-[calc(100vw-48px)]">
            <div className="group flex w-full items-center rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all h-12 focus-within:w-[400px]">
                <div className="flex items-center justify-center pl-4 pr-2 text-gray-400">
                    <Search size={20} />
                </div>
                <input 
                    type="text"
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-slate-900 placeholder:text-gray-400 h-full w-full"
                    placeholder="Search for classroom, lab or office..."
                />
                <div className="pr-3 text-gray-300">
                    <span className="text-xs font-mono border border-gray-200 rounded px-1.5 py-0.5">/</span>
                </div>
            </div>
        </div>


        {/* Details Sidebar */}
        {isSidebarOpen && selectedRoom && (
            <div className="absolute top-6 right-[60px] pointer-events-auto w-[380px] max-w-[calc(100vw-48px)] flex flex-col gap-4 animate-in slide-in-from-right-10 fade-in duration-300 z-40">
                <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col">
                    <div className="flex items-start justify-between p-6 pb-2">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-slate-900 text-2xl font-bold tracking-tight">
                                    {selectedRoom.id || "Selected Room"}
                                </h2>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Engineering Faculty</p>
                        </div>
                        <button onClick={closeSidebar} className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-slate-700">
                            <X size={20} />
                        </button>
                    </div>
                    {/* Static Sample Data */}
                    <div className="px-6 py-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-primary text-xs font-semibold uppercase tracking-wide">Class in Progress</span>
                        </div>
                    </div>
                    <div className="p-6 pt-4">
                        <div className="grid grid-cols-[30%_1fr] gap-y-5 gap-x-4">
                            <div className="text-gray-400 text-xs font-medium uppercase tracking-wider self-center">Capacity</div>
                            <div className="text-slate-900 text-sm font-medium">45 People</div>
                            <div className="col-span-2 h-px bg-gray-200/50 w-full" />
                            <div className="text-gray-400 text-xs font-medium uppercase tracking-wider self-start pt-0.5">Equipment</div>
                            <div className="text-slate-900 text-sm font-medium leading-relaxed">Projection, Smart Board</div>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex gap-3">
                        <button className="flex-1 bg-slate-900 hover:bg-black text-white text-sm font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                            <Navigation size={18} /> Navigation
                        </button>
                        <button className="aspect-square flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-slate-700 transition-colors shadow-sm w-[42px]">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-8 right-8 pointer-events-auto flex flex-col items-end gap-4">
            <div className="flex flex-col bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] p-1.5 gap-1 border border-gray-100/50">
                {[3, 2, 1, 0, -1, -2].map((floor) => (
                    <button
                        key={floor}
                        onClick={() => setCurrentFloor(floor)}
                        className={cn(
                            "w-10 h-10 flex items-center justify-center rounded-lg text-sm transition-all",
                            currentFloor === floor 
                                ? "bg-primary text-white shadow-md font-bold" 
                                : "text-gray-500 font-semibold hover:bg-gray-50 hover:text-slate-900"
                        )}
                    >
                        {floor === 0 ? "G" : floor > 0 ? floor : `B${Math.abs(floor)}`}
                    </button>
                ))}
            </div>

            <div className="flex flex-col bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] divide-y divide-gray-100 border border-gray-100/50 overflow-hidden">
                <button onClick={handleZoomIn} className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-gray-50 hover:text-primary transition-colors"><Plus size={20} /></button>
                <button onClick={handleZoomOut} className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-gray-50 hover:text-primary transition-colors"><Minus size={20} /></button>
            </div>

            <button onClick={handleLogout} className="w-10 h-10 bg-white rounded-lg shadow-[0_4px_20px_rgb(0,0,0,0.08)] flex items-center justify-center text-slate-700 hover:bg-red-50 hover:text-red-600 border border-gray-100/50 transition-colors">
                <LogOut size={20} />
            </button>
        </div>

        <div className="absolute bottom-6 left-6 pointer-events-auto">
            <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/50 shadow-sm text-xs font-medium text-gray-500 flex items-center gap-2">
                <MapPin size={12} className="text-primary" /> Doğuş University • Dudullu Campus
            </div>
        </div>

      </div>
    </div>
  );
}