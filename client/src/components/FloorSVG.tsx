import React, { useMemo, useRef } from 'react';
import { getRoomsForFloor } from '@/data/rooms';

interface FloorSVGProps {
  svgContent: string; // Raw text from file
  onRoomClick: (roomId: string) => void;
  floor: number;
}

const FloorSVG: React.FC<FloorSVGProps> = ({ svgContent, onRoomClick, floor }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Get rooms for this floor
  const floorsRooms = useMemo(() => {
    return getRoomsForFloor(floor);
  }, [floor]);

  // Process SVG content: Find gray areas and add class/data attributes
  const processedSVG = useMemo(() => {
    let roomCounter = 0;
    let processed = svgContent;

    // 1. Extract original width and height from SVG tag
    const widthMatch = processed.match(/width="(\d+)"/i);
    const heightMatch = processed.match(/height="(\d+)"/i);
    
    if (widthMatch && heightMatch) {
      const width = widthMatch[1];
      const height = heightMatch[1];
      
      // 2. Inject viewBox if missing
      if (!processed.includes('viewBox')) {
        processed = processed.replace(
          /<svg/i,
          `<svg viewBox="0 0 ${width} ${height}"`
        );
      }
      
      // 3. Replace fixed width/height with 100%
      processed = processed.replace(/width="\d+"/i, 'width="100%"');
      processed = processed.replace(/height="\d+"/i, 'height="100%"');
    }
    
    // 4. Find gray areas (#E4E4E4) and add interactive classes with actual room IDs
    processed = processed.replace(/fill="#E4E4E4"/gi, (match) => {
      const room = floorsRooms[roomCounter];
      roomCounter++;
      
      if (room) {
        // Use actual room ID from data
        return `${match} class="room-interactive cursor-pointer transition-all duration-200 hover:opacity-70" data-room-id="${room.id}"`;
      }
      return match;
    });

    return processed;
  }, [svgContent, floorsRooms]);

  // Click event handler (Event Delegation)
  // Instead of adding onClick to each path individually, we attach it to the container and check what was clicked.
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Was the clicked element an "interactive room"?
    if (target.classList.contains('room-interactive') || target.closest('.room-interactive')) {
      const el = target.classList.contains('room-interactive') ? target : target.closest('.room-interactive') as HTMLElement;
      const roomId = el.getAttribute('data-room-id');
      
      if (roomId) {
        // Temporarily change the clicked room's color (Feedback)
        el.style.fill = "#c40e20"; // Primary color
        setTimeout(() => { el.style.fill = "#E4E4E4"; }, 300); // Restore
        
        onRoomClick(roomId);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full floor-svg-container"
      onClick={handleClick}
      // Safely embed HTML string into React
      dangerouslySetInnerHTML={{ __html: processedSVG }}
    />
  );
};

export default FloorSVG;