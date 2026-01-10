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
    
    // 1. Gri alanları bul (#E4E4E4) ve değiştir
    // Not: Regex, SVG içindeki fill="#E4E4E4" kısmını bulur ve içine class ekler.
    return svgContent.replace(/fill="#E4E4E4"/gi, (match) => {
      roomCounter++;
      // Orijinal rengi koru ama class ve data-id ekle
      // "group" class'ı hover efektleri için, "room-interactive" tıklama için
      return `${match} class="room-interactive cursor-pointer transition-all duration-200 hover:opacity-70" data-room-id="Room-${roomCounter}"`;
    });
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