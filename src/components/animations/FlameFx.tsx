"use client";

const FLAME_DATA = [
  { id: 0, x: 12, size: 8, delay: 0.3, duration: 3.8 },
  { id: 1, x: 45, size: 10, delay: 1.2, duration: 4.2 },
  { id: 2, x: 78, size: 6, delay: 0.8, duration: 3.5 },
  { id: 3, x: 23, size: 9, delay: 1.9, duration: 4.5 },
  { id: 4, x: 67, size: 7, delay: 0.5, duration: 3.2 },
  { id: 5, x: 91, size: 11, delay: 1.5, duration: 4.8 },
  { id: 6, x: 34, size: 6, delay: 0.2, duration: 3.9 },
  { id: 7, x: 56, size: 8, delay: 1.1, duration: 4.1 },
  { id: 8, x: 89, size: 7, delay: 1.7, duration: 3.6 },
  { id: 9, x: 5, size: 10, delay: 0.4, duration: 4.3 },
  { id: 10, x: 82, size: 9, delay: 1.4, duration: 3.7 },
  { id: 11, x: 28, size: 6, delay: 0.9, duration: 4.4 },
  { id: 12, x: 73, size: 8, delay: 1.8, duration: 3.3 },
  { id: 13, x: 51, size: 11, delay: 0.7, duration: 4.6 },
  { id: 14, x: 17, size: 7, delay: 1.3, duration: 3.4 },
  { id: 15, x: 64, size: 9, delay: 0.1, duration: 4.0 },
  { id: 16, x: 39, size: 6, delay: 1.6, duration: 3.8 },
  { id: 17, x: 85, size: 8, delay: 0.6, duration: 4.2 },
  { id: 18, x: 61, size: 10, delay: 1.0, duration: 3.5 },
  { id: 19, x: 94, size: 7, delay: 1.8, duration: 4.7 },
];

export function FlameFx() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {FLAME_DATA.map((flame) => (
        <div
          key={flame.id}
          className="absolute bottom-0 rounded-full bg-gradient-to-t from-sacred-gold via-warm-orange to-crimson"
          style={{
            left: `${flame.x}%`,
            width: flame.size,
            height: flame.size * 3,
            opacity: 0,
            animation: `flame-rise ${flame.duration}s ease-out ${flame.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}