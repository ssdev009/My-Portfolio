import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { EffectsToggle } from "@/components/layout/EffectsToggle";
import { siteConfig, mailtoLink, whatsappLink } from "@/data/site.config";

const socialLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  github: "GitHub",
  upwork: "Upwork",
  fiverr: "Fiverr",
};

export function Footer() {
  const socials = Object.entries(siteConfig.socials).filter(([, url]) => url);

  return (
    <footer className="border-t border-line bg-bg/60 backdrop-blur-sm">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Logo idSuffix="footer" />
            <p className="max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
            <p className="font-mono text-xs text-muted">
              {siteConfig.workingHours}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest text-cyan">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-cyan"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest text-cyan">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-cyan">
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={mailtoLink()} className="text-muted transition-colors hover:text-cyan">
                  {siteConfig.email}
                </a>
              </li>
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-cyan">
                    {socialLabels[key] ?? key}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.{" "}
            <Link href="/privacy" className="underline transition-colors hover:text-cyan">
              Privacy Policy
            </Link>
          </p>
          <EffectsToggle />
        </div>
      </Container>
    </footer>
  );
}
