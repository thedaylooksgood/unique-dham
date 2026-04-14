import { cn } from "@/lib/utils";

interface SacredSVGProps {
  className?: string;
}

export function TrishulIcon({ className }: SacredSVGProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("w-6 h-6", className)}>
      <path d="M12 3v18" />
      <path d="M8 6c0 4 0 7 4 7s4-3 4-7" />
    </svg>
  );
}

export function LotusIcon({ className }: SacredSVGProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("w-6 h-6", className)}>
      <path d="M12 7c-2-2-5-2-5 2 0 4 5 8 5 8s5-4 5-8c0-4-3-4-5-2z" />
      <path d="M12 12c-2-1-4-3-4-5s2-3 4-3 4 1 4 3-2 4-4 5z" />
    </svg>
  );
}

export function KalashIcon({ className }: SacredSVGProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("w-6 h-6", className)}>
      <path d="M7 21h10a2 2 0 0 0 2-2v-3H5v3a2 2 0 0 0 2 2z" />
      <path d="M5 16h14s-1-4-3-4-4 2-4 2-2-2-4-2-3 4-3 4z" />
      <path d="M12 12V2" />
    </svg>
  );
}
