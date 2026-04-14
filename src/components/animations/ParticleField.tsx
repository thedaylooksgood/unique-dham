"use client";

const PARTICLE_DATA = [
  { id: 0, x: 23, size: 2, delay: 1.2, duration: 8.3, opacity: 0.45 },
  { id: 1, x: 78, size: 3, delay: 3.4, duration: 9.1, opacity: 0.62 },
  { id: 2, x: 15, size: 1, delay: 0.8, duration: 6.7, opacity: 0.31 },
  { id: 3, x: 45, size: 2, delay: 2.1, duration: 7.2, opacity: 0.55 },
  { id: 4, x: 91, size: 3, delay: 4.5, duration: 8.9, opacity: 0.48 },
  { id: 5, x: 34, size: 1, delay: 1.9, duration: 6.2, opacity: 0.38 },
  { id: 6, x: 67, size: 2, delay: 0.3, duration: 9.4, opacity: 0.59 },
  { id: 7, x: 12, size: 3, delay: 2.8, duration: 7.6, opacity: 0.42 },
  { id: 8, x: 89, size: 1, delay: 4.1, duration: 8.1, opacity: 0.67 },
  { id: 9, x: 56, size: 2, delay: 1.5, duration: 6.9, opacity: 0.53 },
  { id: 10, x: 28, size: 3, delay: 3.2, duration: 9.7, opacity: 0.36 },
  { id: 11, x: 73, size: 1, delay: 0.6, duration: 7.4, opacity: 0.61 },
  { id: 12, x: 41, size: 2, delay: 2.4, duration: 8.5, opacity: 0.44 },
  { id: 13, x: 95, size: 3, delay: 4.8, duration: 6.3, opacity: 0.58 },
  { id: 14, x: 19, size: 1, delay: 1.1, duration: 9.2, opacity: 0.49 },
  { id: 15, x: 82, size: 2, delay: 3.7, duration: 7.1, opacity: 0.35 },
  { id: 16, x: 51, size: 3, delay: 0.9, duration: 8.8, opacity: 0.52 },
  { id: 17, x: 37, size: 1, delay: 2.6, duration: 6.5, opacity: 0.64 },
  { id: 18, x: 64, size: 2, delay: 4.3, duration: 9.0, opacity: 0.41 },
  { id: 19, x: 8, size: 3, delay: 1.8, duration: 7.8, opacity: 0.56 },
  { id: 20, x: 76, size: 1, delay: 3.9, duration: 8.3, opacity: 0.47 },
  { id: 21, x: 59, size: 2, delay: 0.4, duration: 6.8, opacity: 0.63 },
  { id: 22, x: 22, size: 3, delay: 2.2, duration: 9.5, opacity: 0.38 },
  { id: 23, x: 88, size: 1, delay: 4.6, duration: 7.3, opacity: 0.55 },
  { id: 24, x: 44, size: 2, delay: 1.3, duration: 8.6, opacity: 0.59 },
  { id: 25, x: 11, size: 3, delay: 3.1, duration: 6.4, opacity: 0.42 },
  { id: 26, x: 69, size: 1, delay: 0.7, duration: 9.1, opacity: 0.66 },
  { id: 27, x: 33, size: 2, delay: 2.9, duration: 7.7, opacity: 0.34 },
  { id: 28, x: 85, size: 3, delay: 4.4, duration: 8.2, opacity: 0.51 },
  { id: 29, x: 57, size: 1, delay: 1.6, duration: 6.6, opacity: 0.48 },
  { id: 30, x: 25, size: 2, delay: 3.5, duration: 9.3, opacity: 0.60 },
  { id: 31, x: 92, size: 3, delay: 0.5, duration: 7.9, opacity: 0.45 },
  { id: 32, x: 48, size: 1, delay: 2.7, duration: 8.4, opacity: 0.57 },
  { id: 33, x: 71, size: 2, delay: 4.2, duration: 6.1, opacity: 0.39 },
  { id: 34, x: 6, size: 3, delay: 1.0, duration: 9.6, opacity: 0.54 },
  { id: 35, x: 79, size: 1, delay: 3.3, duration: 7.5, opacity: 0.62 },
  { id: 36, x: 54, size: 2, delay: 0.2, duration: 8.7, opacity: 0.46 },
  { id: 37, x: 38, size: 3, delay: 2.5, duration: 6.9, opacity: 0.58 },
  { id: 38, x: 63, size: 1, delay: 4.0, duration: 9.4, opacity: 0.43 },
  { id: 39, x: 17, size: 2, delay: 1.4, duration: 7.2, opacity: 0.65 },
];

export function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLE_DATA.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-sacred-gold"
          style={{
            left: `${particle.x}%`,
            bottom: "0%",
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animation: `particle-float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}