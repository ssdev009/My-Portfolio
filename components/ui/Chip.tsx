import { cn } from "@/lib/utils";

export function Chip({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-3 py-1",
        "font-mono text-xs text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
