import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Neon border + glow on hover (default true) */
  glow?: boolean;
}

export function Card({ className, glow = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface p-6 transition-all duration-300",
        glow && "hover:border-cyan/70 hover:shadow-glow-soft hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
