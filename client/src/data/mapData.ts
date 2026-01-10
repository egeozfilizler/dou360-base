export interface Room {
  id: string;
  name: string;
  // Koordinatlar % cinsinden (0-100 arası) olacak, böylece zoom yapınca kaymaz.
  x: number;      // Soldan uzaklık %
  y: number;      // Üstten uzaklık %
  width: number;  // Genişlik %
  height: number; // Yükseklik %
  type: 'classroom' | 'office' | 'lab' | 'facility';
}

export interface Floor {
  id: string;
  label: string;
  image: string; // PNG dosya yolu
  rooms: Room[];
}

export const CAMPUS_FLOORS: Floor[] = [
  {
    id: 'floor-2',
    label: '-2',
    image: '/floor-layouts/floor-minus-2.png', // Resimlerin public/floor-layouts klasöründe olduğunu varsayıyorum
    rooms: [
       // Örnek Oda: Sol üstte bir yer
       { id: 'b201', name: 'B2-01 Lab', x: 20, y: 30, width: 10, height: 8, type: 'lab' },
    ]
  },
  {
    id: 'floor-1',
    label: '-1',
    image: '/floor-layouts/floor-minus-1.png',
    rooms: []
  },
  {
    id: 'floor0',
    label: '0',
    image: '/floor-layouts/floor-0.png',
    rooms: [
      { id: 'student-center', name: 'Öğrenci Merkezi', x: 45, y: 45, width: 15, height: 10, type: 'facility' }
    ]
  },
  {
    id: 'floor1',
    label: '1',
    image: '/floor-layouts/floor-1.png',
    rooms: [
      { id: '101', name: 'Derslik 101', x: 10, y: 20, width: 8, height: 6, type: 'classroom' },
      { id: '102', name: 'Derslik 102', x: 20, y: 20, width: 8, height: 6, type: 'classroom' }
    ]
  },
  {
    id: 'floor2',
    label: '2',
    image: '/floor-layouts/floor-2.png',
    rooms: []
  },
  {
    id: 'floor3',
    label: '3',
    image: '/floor-layouts/floor-3.png',
    rooms: []
  }
];