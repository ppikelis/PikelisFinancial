import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LabelValueRowProps = {
  label: ReactNode;
  value?: ReactNode;
  sublabel?: ReactNode;
  className?: string;
};

export function LabelValueRow({
  label,
  value,
  sublabel,
  className
}: LabelValueRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-start gap-x-4 gap-y-1 sm:grid-cols-[1fr_auto]",
        className
      )}
    >
      <div className="text-xs text-foreground">
        <div>{label}</div>
        {sublabel && (
          <div className="text-[11px] text-muted-foreground">{sublabel}</div>
        )}
      </div>
      {value ? (
        <div className="text-xs text-muted-foreground sm:text-right">
          <span className="whitespace-nowrap">{value}</span>
        </div>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}
    </div>
  );
}
