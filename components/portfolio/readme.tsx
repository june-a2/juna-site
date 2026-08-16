export function Readme() {
  return (
    <div className="h-full w-full overflow-y-auto bg-[#0f0f0f]">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 md:px-14">
        <section>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            03 / about
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h1 className="max-w-3xl text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-neutral-100 sm:text-4xl md:text-5xl">
              developer by training.
              <br />
              design-minded by choice.
            </h1>

            <p className="max-w-xl text-sm leading-7 text-neutral-400 sm:text-[15px]">
              i&apos;m a frontend developer with an IT
              background, into tech, design, and games.
              learning game dev on the side for fun, and
              usually messing around with whatever else
              catches my interest.
            </p>
          </div>
        </section>

        <section className="mt-10 border-t border-white/[0.08] pt-6">
          <div className="flex items-center justify-between gap-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              currently
            </p>

            <p className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-700 sm:block">
              what i&apos;m up to
            </p>
          </div>

          <div className="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            <Row
              label="Building"
              value={
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 text-neutral-200 transition-colors hover:text-white"
                >
                  <span>
                    selyne — Full-Stack Agency CRM
                  </span>

                  <span className="text-xs text-neutral-600 transition-colors group-hover:text-neutral-300">
                    ↗
                  </span>
                </a>
              }
            />

            <Row
              label="Learning"
              value={
                <span>
                  Next.js · React · TypeScript · Tailwind CSS
                  · PostgreSQL · Prisma · Auth.js
                </span>
              }
            />

            <Row
              label="Playing"
              value="Palworld !"
            />

            <Row
              label="Status"
              value="Probably debugging something"
            />
          </div>
        </section>

        <section className="mt-12 border-t border-white/[0.08] pt-7">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                04 / skills
              </p>

              <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-neutral-100 sm:text-4xl">
                tools &amp; tech.
              </h2>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600 sm:text-xs">
              technologies i use and have explored
            </p>
          </div>

          <div className="mt-8 divide-y divide-white/[0.07] border-y border-white/[0.07]">
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
  value: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[150px_1fr] sm:gap-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
        {label}
      </p>

      <div className="text-sm leading-6 text-neutral-300">
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
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
        {title}
      </p>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isLearning = learning.includes(item);

          return (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-1.5 text-xs text-neutral-300 transition-colors hover:border-white/[0.16] hover:bg-white/[0.05] hover:text-white"
            >
              <span>
                {item}
              </span>

              {isLearning && (
                <span className="rounded-full border border-white/[0.08] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-neutral-600">
                  learning
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}