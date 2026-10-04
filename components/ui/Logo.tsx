import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site.config";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.owner} home`}
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={siteConfig.ownerPhoto}
        alt=""
        width={38}
        height={38}
        priority
        className="h-[38px] w-[38px] rounded-full border border-cyan/50 object-cover shadow-[0_0_14px_rgb(var(--c-cyan)/0.35)]"
      />
    </Link>
  );
}
