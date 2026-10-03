import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold " +
  "transition-all duration-200 will-change-transform hover:-translate-y-0.5 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-cyan text-bg hover:shadow-glow-cyan",
  secondary:
    "gradient-border bg-transparent text-ink hover:shadow-glow-magenta",
  ghost: "text-muted hover:text-cyan",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg",
};

export function Button(props: AnchorProps | NativeButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } =
    props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as Omit<AnchorProps, keyof CommonProps>;
    const isInternalPage = href.startsWith("/");
    if (isInternalPage) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {children}
        </Link>
      );
    }
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorRest}
      >
        {children}
      </a>
    );
  }

  const { href: _unused, ...buttonRest } = rest as Omit<
    NativeButtonProps,
    keyof CommonProps
  >;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
