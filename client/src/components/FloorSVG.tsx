import React, { useMemo, useRef } from 'react';

interface FloorSVGProps {
  svgContent: string; // Dosyadan gelen ham metin
  onRoomClick: (roomId: string) => void;
}

const FloorSVG: React.FC<FloorSVGProps> = ({ svgContent, onRoomClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG içeriğini işle: Gri alanları bul ve onlara sınıf/data ekle
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
    
    // 4. Find gray areas (#E4E4E4) and add interactive classes (preserve existing logic)
    processed = processed.replace(/fill="#E4E4E4"/gi, (match) => {
      roomCounter++;
      // Keep original color but add class and data-id
      return `${match} class="room-interactive cursor-pointer transition-all duration-200 hover:opacity-70" data-room-id="Room-${roomCounter}"`;
    });

    return processed;
  }, [svgContent]);

  // Tıklama Olayı (Event Delegation)
  // Her path'e tek tek onClick eklemek yerine, kapsayıcıya ekleyip "Neye tıklandı?" diye bakıyoruz.
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Tıklanan şey bir "interactive room" mu?
    if (target.classList.contains('room-interactive') || target.closest('.room-interactive')) {
      const el = target.classList.contains('room-interactive') ? target : target.closest('.room-interactive') as HTMLElement;
      const roomId = el.getAttribute('data-room-id');
      
      if (roomId) {
        // Tıklanan odanın rengini geçici olarak değiştir (Geri bildirim)
        el.style.fill = "#4F46E5"; // Primary renk
        setTimeout(() => { el.style.fill = "#E4E4E4"; }, 300); // Geri al
        
        onRoomClick(roomId);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full floor-svg-container"
      onClick={handleClick}
      // HTML stringini güvenli bir şekilde React içine gömüyoruz
      dangerouslySetInnerHTML={{ __html: processedSVG }}
    />
  );
};

export default FloorSVG;