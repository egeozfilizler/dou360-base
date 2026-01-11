import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getRoomsForFloor } from '@/data/rooms';

interface FloorSVGProps {
  svgContent: string;
  onRoomClick: (roomId: string) => void;
  floor: number;
  highlightedRoomId?: string | null;
}

const FloorSVG: React.FC<FloorSVGProps> = ({ svgContent, onRoomClick, floor, highlightedRoomId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastHighlightedRef = useRef<HTMLElement | null>(null);
  
  const [hoveredRoomName, setHoveredRoomName] = useState<string | null>(null);

  // Get rooms for this floor
  const floorsRooms = useMemo(() => {
    return getRoomsForFloor(floor);
  }, [floor]);

  // Process SVG content
  const processedSVG = useMemo(() => {
    let roomCounter = 0;
    let processed = svgContent;

    const widthMatch = processed.match(/width="(\d+)"/i);
    const heightMatch = processed.match(/height="(\d+)"/i);
    
    if (widthMatch && heightMatch) {
      const width = widthMatch[1];
      const height = heightMatch[1];
      if (!processed.includes('viewBox')) {
        processed = processed.replace(/<svg/i, `<svg viewBox="0 0 ${width} ${height}"`);
      }
      processed = processed.replace(/width="\d+"/i, 'width="100%"');
      processed = processed.replace(/height="\d+"/i, 'height="100%"');
    }
    
    processed = processed.replace(/fill="#E4E4E4"/gi, (match) => {
      const room = floorsRooms[roomCounter];
      roomCounter++;
      if (room) {
        return `${match} class="room-interactive cursor-pointer transition-all duration-200 hover:opacity-70" data-room-id="${room.id}" data-room-name="${room.name}"`;
      }
      return match;
    });

    return processed;
  }, [svgContent, floorsRooms]);

  // Click Handler
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('room-interactive') || target.closest('.room-interactive')) {
      const el = target.classList.contains('room-interactive') ? target : target.closest('.room-interactive') as HTMLElement;
      const roomId = el.getAttribute('data-room-id');
      
      if (roomId) {
        el.style.fill = "#c40e20";
        setTimeout(() => { el.style.fill = "#E4E4E4"; }, 300);
        onRoomClick(roomId);
      }
    }
  };

  // Mouse Over
  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('room-interactive') || target.closest('.room-interactive')) {
      const el = target.classList.contains('room-interactive') ? target : target.closest('.room-interactive') as HTMLElement;
      const roomName = el.getAttribute('data-room-name');
      if (roomName) setHoveredRoomName(roomName);
    }
  };

  // Mouse Out
  const handleMouseOut = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('room-interactive') || target.closest('.room-interactive')) {
      setHoveredRoomName(null);
    }
  };

  // Highlight effect
  useEffect(() => {
    if (lastHighlightedRef.current) {
      const prevEl = lastHighlightedRef.current;
      const prevFill = prevEl.getAttribute('data-prev-fill');
      if (prevFill) prevEl.setAttribute('fill', prevFill);
      prevEl.style.filter = '';
      lastHighlightedRef.current = null;
    }
    if (!highlightedRoomId || !containerRef.current) return;
    const el = containerRef.current.querySelector(`[data-room-id="${highlightedRoomId}"]`) as HTMLElement | null;
    if (!el) return;
    const prevFill = el.getAttribute('fill') || '#E4E4E4';
    el.setAttribute('data-prev-fill', prevFill);
    el.setAttribute('fill', '#c40e20');
    el.style.filter = 'drop-shadow(0 0 8px rgba(196, 14, 32, 0.75))';
    lastHighlightedRef.current = el;
  }, [highlightedRoomId]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      
      {/* SVG Container */}
      <div 
        ref={containerRef}
        className="w-full h-full floor-svg-container"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        dangerouslySetInnerHTML={{ __html: processedSVG }}
      />

      {/* Big Label at the Bottom */}
      {/* absolute bottom-8: Haritanın alt kısmına sabitler */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center pointer-events-none z-20">
        <h1 
          className={`
            text-6xl font-bold text-gray-800 tracking-tight
            transition-all duration-300 transform
            ${hoveredRoomName ? 'opacity-40 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {hoveredRoomName}
        </h1>
      </div>
    </div>
  );
};

export default FloorSVG;