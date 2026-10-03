import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { techCategories } from "@/data/tech";
import { Marquee } from "./Marquee";

const allTech = techCategories.flatMap((c) => c.items);
const rowA = allTech.filter((_, i) => i % 2 === 0);
const rowB = allTech.filter((_, i) => i % 2 === 1);

export function TechStack() {
  return (
    <Section
      id="tech"
      label="Tech & Tools"
      title="The stack behind every build"
      description="Modern, proven tools chosen for speed, stability, and easy long-term maintenance."
    >
      <Reveal>
        <Marquee rowA={rowA} rowB={rowB} />
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {techCategories.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.08}>
            <Card glow={false} className="h-full">
              <h3 className="font-mono !text-sm uppercase tracking-widest text-cyan">
                {cat.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
