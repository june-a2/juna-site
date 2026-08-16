import type {
  ReactNode,
} from "react";

export function Readme() {
  return (
    <div className="portfolio-scroll h-full w-full overflow-y-auto bg-[var(--panel)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 md:px-14">
        <section>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h1 className="max-w-3xl text-[length:var(--font-title-lg)] font-medium leading-[1.08] tracking-[-0.04em] text-[var(--text)]">
              developer by training.
              <br />
              design-minded by choice.
            </h1>

          </div>
        </section>

        <section className="mt-10 border-t border-[var(--border)] pt-6">
          <div className="flex items-center justify-between gap-5">
            <p className="font-[family-name:var(--font-mono)] text-[length:var(--font-xs)] font-semibold uppercase tracking-[0.2em] text-[var(--text-dim)]">
              currently
            </p>

            <p className="hidden font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)] sm:block">
              what i&apos;m up to
            </p>
          </div>

          <div className="mt-5 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            <Row
              label="Building"
              value={
                <a
                  href="#"
                  className="text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
                >
                  selyne — a full-stack
                  agency CRM ↗
                </a>
              }
            />

            <Row
              label="Learning"
              value="Next.js · React · PostgreSQL · Prisma"
            />

            <Row
              label="Playing"
              value="Palworld !"
            />

            <Row
              label="Status"
              value="prolly debugging something :/"
            />
          </div>
        </section>

        <section className="mt-12 border-t border-[var(--border)] pt-7">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>

              <h2 className="mt-4 text-[length:var(--font-title-md)] font-medium tracking-[-0.04em] text-[var(--text)]">
                tools &amp; tech.
              </h2>
            </div>

            <p className="font-[family-name:var(--font-mono)] text-[length:var(--font-xs)] uppercase tracking-[0.16em] text-[var(--text-dim)]">
              technologies i use and
              have explored
            </p>
          </div>

          <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            <SkillRow
              title="Frontend"
              items={[
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS",
                "shadcn/ui",
                "HTML / CSS",
              ]}
            />

            <SkillRow
              title="CMS & E-commerce"
              items={[
                "Wix",
                "Shopify",
                "WordPress",
              ]}
              learning={[
                "Shopify",
                "WordPress",
              ]}
            />

            <SkillRow
              title="Backend & Databases"
              items={[
                "PHP",
                "SQL",
                "PostgreSQL",
                "Auth.js",
                "Prisma",
                "MongoDB",
              ]}
              learning={[
                "PostgreSQL",
                "Auth.js",
                "Prisma",
                "MongoDB",
              ]}
            />

            <SkillRow
              title="Design & Dev Tools"
              items={[
                "Figma",
                "Canva",
                "Git",
                "GitHub",
                "VS Code",
              ]}
            />

            <SkillRow
              title="Other / Explored"
              items={[
                "Java",
                "C++",
                "Discord Bots",
                "Godot / Game Dev",
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[150px_1fr] sm:gap-8">
      <p className="font-[family-name:var(--font-mono)] text-[length:var(--font-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--text-dim)]">
        {label}
      </p>

      <div className="text-[length:var(--font-sm)] leading-6 text-[var(--text-soft)]">
        {value}
      </div>
    </div>
  );
}

function SkillRow({
  title,
  items,
  learning = [],
}: {
  title: string;
  items: string[];
  learning?: string[];
}) {
  return (
    <div className="grid gap-4 py-5 md:grid-cols-[180px_1fr] md:gap-8">
      <p className="font-[family-name:var(--font-mono)] text-[length:var(--font-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
        {title}
      </p>

      <div className="flex flex-wrap gap-2">
        {items.map(
          (item) => {
            const isLearning =
              learning.includes(
                item,
              );

            return (
              <span
                key={
                  item
                }
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.025] px-3 py-1.5 text-[length:var(--font-xs)] text-[var(--text-soft)] transition-colors hover:bg-white/[0.05] hover:text-[var(--text)]"
              >
                <span>
                  {item}
                </span>

                {isLearning && (
                  <span className="rounded-full border border-[var(--border)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[8px] uppercase tracking-[0.12em] text-[var(--text-dim)]">
                    learning
                  </span>
                )}
              </span>
            );
          },
        )}
      </div>
    </div>
  );
}