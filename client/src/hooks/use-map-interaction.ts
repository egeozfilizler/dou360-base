import { useState, useEffect, useRef } from 'react';

interface Transform {
  scale: number;
  x: number;
  y: number;
}

export const useMapInteraction = (initialScale = 0.75) => {
  const [transform, setTransform] = useState<Transform>({ scale: initialScale, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  // Zoom operations
  const handleZoom = (delta: number) => {
    setTransform(prev => {
      const newScale = Math.min(Math.max(prev.scale + delta, 0.55), 1.3); // Min 0.05x, Max 4x zoom
      return { ...prev, scale: newScale };
    });
  };

  // Drag start
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startPos.current = { x: clientX - transform.x, y: clientY - transform.y };
  };

  // Drag progress
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent page scroll
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setTransform(prev => ({
      ...prev,
      x: clientX - startPos.current.x,
      y: clientY - startPos.current.y
    }));
  };

  // Drag end
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