import { useState, useEffect, useRef } from 'react';

interface Transform {
  scale: number;
  x: number;
  y: number;
}

export const useMapInteraction = (initialScale = 1) => {
  const [transform, setTransform] = useState<Transform>({ scale: initialScale, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  // Zoom İşlemleri
  const handleZoom = (delta: number) => {
    setTransform(prev => {
      const newScale = Math.min(Math.max(prev.scale + delta, 1), 4); // Min 1x, Max 4x zoom
      return { ...prev, scale: newScale };
    });
  };

  // Sürükleme Başlangıcı
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startPos.current = { x: clientX - transform.x, y: clientY - transform.y };
  };

  // Sürükleme Sırası
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Sayfanın kaymasını engelle
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setTransform(prev => ({
      ...prev,
      x: clientX - startPos.current.x,
      y: clientY - startPos.current.y
    }));
  };

  // Sürükleme Bitişi
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return { transform, isDragging, handleMouseDown, handleZoom, setTransform };
};