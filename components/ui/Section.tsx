import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  label: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Section({
  id,
  label,
  title,
  description,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <Container>
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
          <h2 className="mt-4 max-w-3xl">{title}</h2>
          {description && (
            <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
          )}
        </Reveal>
        {children && <div className="mt-12">{children}</div>}
      </Container>
    </section>
  );
}
