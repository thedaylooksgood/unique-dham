"use client";

import { OmIcon } from "./OmIcon";

export function SacredDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-saffron/20 to-transparent" />
      <OmIcon className="text-saffron h-8 w-8" />
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-saffron/20 to-transparent" />
    </div>
  );
}