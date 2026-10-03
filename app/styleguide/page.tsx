import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Style Guide",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "bg", cls: "bg-bg" },
  { name: "surface", cls: "bg-surface" },
  { name: "surface2", cls: "bg-surface2" },
  { name: "line", cls: "bg-line" },
  { name: "cyan", cls: "bg-cyan" },
  { name: "magenta", cls: "bg-magenta" },
  { name: "violet", cls: "bg-violet" },
  { name: "shopify", cls: "bg-shopify" },
  { name: "ink", cls: "bg-ink" },
  { name: "muted", cls: "bg-muted" },
  { name: "success", cls: "bg-success" },
  { name: "danger", cls: "bg-danger" },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-10">
      <SectionLabel>{title}</SectionLabel>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function StyleGuidePage() {
  return (
    <Container className="py-16">
      <h1>Style Guide</h1>
      <p className="mt-4 text-muted">Design tokens and base components. Use the theme button in the navbar to compare dark and light.</p>

      <Block title="Logo">
        <Logo />
      </Block>

      <Block title="Colors">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {colors.map((c) => (
            <div key={c.name} className="space-y-2">
              <div className={`${c.cls} h-16 rounded-xl border border-line`} />
              <p className="font-mono text-xs text-ink">{c.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 h-3 rounded-full bg-neon-gradient" />
      </Block>

      <Block title="Typography">
        <div className="space-y-4">
          <h1>Heading One</h1>
          <h2>Heading Two</h2>
          <h3>Heading Three</h3>
          <p className="max-w-2xl">
            Body text in Inter. Soft off-white on a deep navy background for comfortable reading.
          </p>
          <p className="text-muted">Muted secondary text for descriptions and captions.</p>
          <p className="font-mono text-sm text-cyan">Mono label / code accent</p>
        </div>
      </Block>

      <Block title="Neon effects">
        <div className="space-y-4">
          <p className="font-heading text-4xl font-bold text-cyan text-glow-cyan">Cyan glow text</p>
          <p className="font-heading text-4xl font-bold text-magenta text-glow-magenta">Magenta glow text</p>
          <p className="font-heading text-4xl font-bold gradient-text">Signature gradient text</p>
        </div>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Block>

      <Block title="Cards & chips">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <h3>Hover me</h3>
            <p className="mt-2 text-muted">Neon border and soft glow on hover.</p>
            <div className="mt-4 flex gap-2">
              <Chip>Liquid</Chip>
              <Chip>Hydrogen</Chip>
            </div>
          </Card>
          <Card glow={false}>
            <h3>Static card</h3>
            <p className="mt-2 text-muted">No hover effect.</p>
          </Card>
          <Card className="gradient-border border-transparent">
            <h3>Gradient border</h3>
            <p className="mt-2 text-muted">Signature cyan to magenta outline.</p>
          </Card>
        </div>
      </Block>
    </Container>
  );
}
