import { cn } from "@/lib/utils";

interface OmIconProps {
  className?: string;
}

export function OmIcon({ className }: OmIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-6 h-6", className)}
    >
      <path d="M12 2C8.686 2 6 4.686 6 8c0 1.657.672 3.157 1.757 4.243M7.757 12.243C6.672 13.329 6 14.829 6 16.5c0 3.314 2.686 6 6 6s6-2.686 6-6c0-1.671-.672-3.171-1.757-4.257M16.243 12.243C17.328 11.157 18 9.657 18 8c0-3.314-2.686-6-6-6" />
      <path d="M12 6c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" />
      <path d="M12 14c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" />
    </svg>
  );
}
