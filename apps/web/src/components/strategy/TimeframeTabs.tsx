"use client";

import { cn } from "@/lib/utils";

const frames = ["1W", "1M", "3M", "6M", "YTD", "1Y", "3Y", "5Y", "MAX"] as const;

interface TimeframeTabsProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimeframeTabs({ value, onChange }: TimeframeTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {frames.map((frame) => (
        <button
          key={frame}
          className={cn(
            "rounded-sm border border-border px-2.5 py-1 text-xs text-muted-foreground",
            value === frame && "bg-primary text-primary-foreground"
          )}
          onClick={() => onChange(frame)}
        >
          {frame}
        </button>
      ))}
    </div>
  );
}
