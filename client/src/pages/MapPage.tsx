import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloorMap from "@/components/FloorMap";
import { useMapInteraction } from "@/hooks/use-map-interaction";
import { type Room } from "@/data/rooms";
import { search, type SearchResult } from "@/lib/search";
import { cn } from "@/lib/utils";
import { 
  X, 
  Navigation, 
  Share2, 
  LogOut,
  User,
  Clock,
  Search,
  Plus,
  Minus,
  MapPin
} from "lucide-react";

export default function MapPage() {
  const navigate = useNavigate();
  const [currentFloor, setCurrentFloor] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [highlightedRoomId, setHighlightedRoomId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Getting values from the hook
  const { transform, handleMouseDown, handleZoom, setTransform } = useMapInteraction();
  // Helper function to get current class for a room
  const getCurrentClass = (room: Room | null) => {
    if (!room || !room.schedule) return null;

    const now = new Date();
    const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);
    const daySchedule = room.schedule[currentDay];

    if (!daySchedule || daySchedule.length === 0) return null;

    // Get current time in HH:MM format
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Find the current or next class
    return daySchedule.find(item => {
      const [startTime] = item.time.split(' - ');
      return currentTime >= startTime;
    }) || daySchedule[0];
  };

  // Helper function to get all classes for a room today
  const getTodayClasses = (room: Room | null) => {
    if (!room || !room.schedule) return [];

    const now = new Date();
    const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);
    return room.schedule[currentDay] || [];
  };

  // Navigate to a room: switch floor, flash/highlight, then open sidebar
  const navigateToRoom = (room: Room) => {
    console.log("Search click -> room", room.id, room.name);
    setCurrentFloor(room.floor);
    setHighlightedRoomId(room.id);

    // Open sidebar shortly after floor change
    setTimeout(() => {
      setSelectedRoom(room);
      setIsSidebarOpen(true);
    }, 120);

    // Clear highlight after a short pulse
    setTimeout(() => {
      setHighlightedRoomId(null);
    }, 1800);

    setShowSearchResults(false);
    setSearchQuery("");
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const results = search(query);
      setSearchResults(results);
      setShowSearchResults(!!results);
    } else {
      setSearchResults(null);
      setShowSearchResults(false);
    }
  };

  // Handle search result selection
  const handleSearchResultClick = (result: SearchResult) => {
    if (!result) return;

    if (result.type === 'room') {
      navigateToRoom(result.room);
    } else if (result.type === 'teacher') {
      // If teacher has multiple rooms, go to first room
      if (result.rooms.length > 0) {
        navigateToRoom(result.rooms[0].room);
      }
    } else if (result.type === 'subject') {
      // If subject has multiple classes, go to first one
      if (result.classes.length > 0) {
        navigateToRoom(result.classes[0].room);
      }
    } else if (result.type === 'teacher-subject') {
      // If teacher+subject has multiple rooms, go to first room
      if (result.rooms.length > 0) {
        navigateToRoom(result.rooms[0]);
      }
    }

  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideInput = searchInputRef.current?.contains(target);
      const insideContainer = searchContainerRef.current?.contains(target);
      if (!insideInput && !insideContainer) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  const handleZoomIn = () => handleZoom(0.2);
  const handleZoomOut = () => handleZoom(-0.2);

  const onWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    handleZoom(delta);
  };

  const handleRoomClick = (room: Room) => {
    if (!room) return;
    setSelectedRoom(room);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const currentClass = selectedRoom ? getCurrentClass(selectedRoom) : null;
  const todayClasses = selectedRoom ? getTodayClasses(selectedRoom) : [];

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
               highlightedRoomId={highlightedRoomId}
             />
        </div>
      </div>

      {/* LAYER 1: UI OVERLAY */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        
        {/* Search Bar */}
        <div ref={searchContainerRef} className="absolute top-6 left-6 pointer-events-auto w-[360px] max-w-[calc(100vw-48px)] relative">
            <div className="group flex w-full items-center rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all h-12 focus-within:w-[400px]">
                <div className="flex items-center justify-center pl-4 pr-2 text-gray-400">
                    <Search size={20} />
                </div>
                <input 
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-slate-900 placeholder:text-gray-400 h-full w-full"
                    placeholder="Search for classroom, lab or office..."
                />
                <div className="pr-3 text-gray-300">
                    <span className="text-xs font-mono border border-gray-200 rounded px-1.5 py-0.5">/</span>
                </div>
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {searchResults.type === 'room' && (
                  <button
                    onClick={() => navigateToRoom(searchResults.room)}
                      className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Room {searchResults.room.id}</p>
                        <p className="text-xs text-gray-500">Floor {searchResults.room.floor}</p>
                      </div>
                      {searchResults.currentSubject && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">In Progress</span>
                      )}
                    </div>
                  </button>
                )}

                {searchResults.type === 'teacher' && (
                  <>
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Teacher</p>
                      <p className="text-sm font-semibold text-slate-900">{searchResults.teacher}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {searchResults.subjects.length} subject(s) • {searchResults.rooms.length} room(s)
                        {searchResults.teacherRoom && ` • Teacher room - ${searchResults.teacherRoom.id}`}
                      </p>
                    </div>
                    <div className="max-h-[200px] overflow-y-auto">
                      {searchResults.rooms.map((roomWithSubjects) => (
                        <button
                          key={roomWithSubjects.room.id}
                          onClick={() => navigateToRoom(roomWithSubjects.room)}
                            className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors text-sm"
                        >
                          <p className="font-medium text-slate-900">Room {roomWithSubjects.room.id}</p>
                          <p className="text-xs text-gray-500">Floor {roomWithSubjects.room.floor} • {roomWithSubjects.subjects.join(', ')}</p>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {searchResults.type === 'subject' && (
                  <>
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Subject</p>
                      <p className="text-sm font-semibold text-slate-900">{searchResults.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">{searchResults.classes.length} class(es)</p>
                    </div>
                    <div className="max-h-[200px] overflow-y-auto">
                      {searchResults.classes.map((cls, idx) => (
                        <button
                          key={idx}
                          onClick={() => navigateToRoom(cls.room)}
                            className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors text-sm"
                        >
                          <p className="font-medium text-slate-900">Room {cls.room.id} • {cls.day}</p>
                          <p className="text-xs text-gray-500">{cls.time} • {cls.teacher}</p>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {searchResults.type === 'teacher-subject' && (
                  <>
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Teacher • Subject</p>
                      <p className="text-sm font-semibold text-slate-900">{searchResults.teacher}</p>
                      <p className="text-xs text-gray-500 mt-1">{searchResults.subject}</p>
                    </div>
                    <div className="max-h-[200px] overflow-y-auto">
                      {searchResults.rooms.map((room) => (
                        <button
                          key={room.id}
                          onClick={() => navigateToRoom(room)}
                            className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors text-sm"
                        >
                          <p className="font-medium text-slate-900">Room {room.id}</p>
                          <p className="text-xs text-gray-500">Floor {room.floor}</p>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
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
                    {/* Dynamic Data from Schedule */}
                    <div className="px-6 py-2">
                        {currentClass ? (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-primary text-xs font-semibold uppercase tracking-wide">Class in Progress</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                            <span className="relative flex h-2 w-2 bg-blue-400 rounded-full"></span>
                            <span className="text-blue-600 text-xs font-semibold uppercase tracking-wide">Available</span>
                          </div>
                        )}
                    </div>
                    <div className="p-6 pt-4">
                        {currentClass ? (
                          <div className="space-y-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">Current Class</div>
                              </div>
                              <div className="border-l-2 border-primary pl-3">
                                <p className="text-slate-900 text-sm font-semibold">{currentClass.subject}</p>
                                <p className="text-gray-500 text-xs mt-1">Instructor: {currentClass.teacher || "TBA"}</p>
                                <p className="text-gray-500 text-xs flex items-center gap-1 mt-1"><Clock size={12} /> {currentClass.time}</p>
                              </div>
                            </div>
                            {todayClasses.length > 1 && (
                              <>
                                <div className="h-px bg-gray-200/50 w-full" />
                                <div className="space-y-2">
                                  <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">Today's Schedule</div>
                                  <div className="space-y-2">
                                    {todayClasses.map((cls, idx) => (
                                      <div key={idx} className="text-xs py-1">
                                        <p className="text-slate-700 font-medium">{cls.time}</p>
                                        <p className="text-gray-500">{cls.subject}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="text-gray-500 text-sm">
                              <p className="font-medium mb-2">Today's Schedule:</p>
                              {todayClasses.length > 0 ? (
                                <div className="space-y-2">
                                  {todayClasses.map((cls, idx) => (
                                    <div key={idx} className="text-xs py-1">
                                      <p className="text-slate-700 font-medium">{cls.time}</p>
                                      <p className="text-gray-500">{cls.subject}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-400 text-xs italic">No classes scheduled for today</p>
                              )}
                            </div>
                          </div>
                        )}
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