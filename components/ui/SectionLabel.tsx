import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-sm uppercase tracking-widest text-cyan",
        className
      )}
    >
      {children}
    </p>
  );
}
