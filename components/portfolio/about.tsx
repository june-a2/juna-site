"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

type Tab =
  | "gear"
  | "activity"
  | "work";

type Pos = {
  x: number;
  y: number;
};

type Day = {
  date: string;
  contributionCount: number;
};

type Repo = {
  name: string;
  url: string;
  pushedAt: string | null;
  isPrivate?: boolean;
};

type Game = {
  id: number;
  name: string;
  recentHours: number;
  totalHours: number;
  lastPlayed: string | null;
  image: string;
};

type ActivityData = {
  github: {
    configured: boolean;
    username?: string | null;
    total: number;
    days: Day[];
    recentRepo: Repo | null;
    error?: string;
  };

  steam: {
    configured: boolean;
    private?: boolean;
    games: Game[];
    error?: string;
  };

  checkedAt: string;
};

const tabs = [
  {
    id: "gear",
    label: "gear.ts",
    fn: "getSetup()",
  },
  {
    id: "activity",
    label: "activity.ts",
    fn: "getActivity()",
  },
  {
    id: "work",
    label: "work.ts",
    fn: "getExperience()",
  },
] satisfies {
  id: Tab;
  label: string;
  fn: string;
}[];

export function About() {
  const [
    tab,
    setTab,
  ] =
    useState<Tab>(
      "activity",
    );

  const [
    running,
    setRunning,
  ] =
    useState(true);

  const [
    open,
    setOpen,
  ] =
    useState<Tab | null>(
      null,
    );

  useEffect(() => {
    const timer =
      window.setTimeout(
        () => {
          setRunning(false);
          setOpen(
            "activity",
          );
        },
        650,
      );

    return () =>
      window.clearTimeout(
        timer,
      );
  }, []);

  function run(
    id: Tab,
  ) {
    setTab(id);
    setOpen(null);
    setRunning(true);

    window.setTimeout(
      () => {
        setRunning(false);
        setOpen(id);
      },
      650,
    );
  }

  const active =
    tabs.find(
      (item) =>
        item.id === tab,
    )!;

  return (
    <div className="flex h-full w-full overflow-hidden bg-[var(--panel)] font-[family-name:var(--font-mono)] text-[length:var(--font-sm)] text-[var(--text-muted)]">
      <Side
        tab={tab}
        run={run}
      />

      <div className="relative min-w-0 flex-1 overflow-hidden">
        <Tabs
          tab={tab}
          run={run}
        />

        <div className="h-[calc(100%-32px)] overflow-hidden">
          <Crumb
            file={
              active.label
            }
          />

          <Code
            tab={tab}
            fn={active.fn}
          />
        </div>

        {running && (
          <Terminal
            file={
              active.label
            }
            fn={active.fn}
          />
        )}

        {open && (
          <Result
            tab={open}
            onClose={() =>
              setOpen(null)
            }
          />
        )}
      </div>
    </div>
  );
}

function Tabs({
  tab,
  run,
}: {
  tab: Tab;
  run: (
    tab: Tab,
  ) => void;
}) {
  return (
    <div className="flex h-8 border-b border-[var(--border-soft)] bg-[var(--panel-alt)]">
      {tabs.map(
        (item) => {
          const active =
            tab ===
            item.id;

          return (
            <button
              key={
                item.id
              }
              type="button"
              onClick={() =>
                run(
                  item.id,
                )
              }
              className={`relative flex h-8 items-center gap-2 border-r border-[var(--border-soft)] px-3 text-[length:var(--font-xs)] transition-colors ${
                active
                  ? "bg-[var(--panel)] text-[var(--text-soft)]"
                  : "text-[var(--text-dim)] hover:text-[var(--text-muted)]"
              }`}
            >
              <span className="text-[var(--accent-ts)]">
                TS
              </span>

              <span>
                {
                  item.label
                }
              </span>

              {active && (
                <span className="absolute inset-x-0 bottom-0 h-px bg-[var(--accent)]" />
              )}
            </button>
          );
        },
      )}
    </div>
  );
}

function Side({
  tab,
  run,
}: {
  tab: Tab;
  run: (
    tab: Tab,
  ) => void;
}) {
  return (
    <aside className="hidden shrink-0 md:flex">
      <Act />

      <div className="w-40 border-r border-[var(--border-soft)] bg-[var(--window)] text-[length:var(--font-xs)] text-[var(--text-dim)]">
        <div className="flex h-8 items-center px-3 uppercase tracking-wide">
          Explorer
        </div>

        <div className="px-2">
          <Row>
            <Arrow open />

            <span className="text-[var(--text-soft)]">
              juna
            </span>
          </Row>

          <div className="ml-3">
            <Row>
              <Arrow open />

              <span>
                about
              </span>
            </Row>

            <div className="ml-3">
              {tabs.map(
                (item) => (
                  <File
                    key={
                      item.id
                    }
                    active={
                      tab ===
                      item.id
                    }
                    onClick={() =>
                      run(
                        item.id,
                      )
                    }
                  >
                    {
                      item.label
                    }
                  </File>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Crumb({
  file,
}: {
  file: string;
}) {
  return (
    <div className="flex h-7 items-center border-b border-[var(--border-soft)] bg-[var(--window)] px-3 text-[length:var(--font-xs)] text-[var(--text-dim)]">
      <span>
        juna
      </span>

      <span className="mx-1">
        ›
      </span>

      <span>
        about
      </span>

      <span className="mx-1">
        ›
      </span>

      <span className="text-[var(--text-muted)]">
        {file}
      </span>
    </div>
  );
}

function Code({
  tab,
  fn,
}: {
  tab: Tab;
  fn: string;
}) {
  const name =
    tab === "activity"
      ? "activity"
      : tab === "gear"
        ? "gear"
        : "work";

  return (
    <div className="pt-4">
      <div className="grid min-h-7 grid-cols-[46px_minmax(0,1fr)] leading-7">
        <span className="select-none pr-3 text-right text-[var(--text-faint)]">
          1
        </span>

        <code>
          <span className="text-[var(--syntax-keyword)]">
            const
          </span>{" "}

          <span className="text-[var(--syntax-variable)]">
            {name}
          </span>{" "}

          <span className="text-[var(--text-dim)]">
            =
          </span>{" "}

          <span className="text-[var(--syntax-function)]">
            {fn}
          </span>

          <span className="text-[var(--text-dim)]">
            ;
          </span>
        </code>
      </div>
    </div>
  );
}

function Terminal({
  file,
  fn,
}: {
  file: string;
  fn: string;
}) {
  return (
    <div className="absolute left-1/2 top-1/2 z-30 w-[min(560px,calc(100%-50px))] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-[var(--border)] bg-[var(--panel-deep)] shadow-[var(--popup-shadow)]">
      <div className="flex h-9 items-center border-b border-[var(--border-soft)] bg-[var(--panel-alt)] px-3 text-[length:var(--font-xs)] text-[var(--text-dim)]">
        <span>
          terminal
        </span>

        <span className="ml-auto">
          {file}
        </span>
      </div>

      <div className="space-y-2 px-4 py-4 text-[length:var(--font-xs)]">
        <p className="text-[var(--text-dim)]">
          $ bun run {file}
        </p>

        <p className="text-[var(--text-soft)]">
          &gt; running{" "}
          {fn}...
        </p>
      </div>
    </div>
  );
}

function Result({
  tab,
  onClose,
}: {
  tab: Tab;
  onClose: () => void;
}) {
  const [
    pos,
    setPos,
  ] =
    useState<Pos>({
      x: 0,
      y: 0,
    });

  const drag =
    useRef({
      active: false,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
    });

  function start(
    e: PointerEvent<HTMLDivElement>,
  ) {
    drag.current = {
      active: true,
      startX:
        e.clientX,
      startY:
        e.clientY,
      x: pos.x,
      y: pos.y,
    };

    e.currentTarget
      .setPointerCapture(
        e.pointerId,
      );
  }

  function move(
    e: PointerEvent<HTMLDivElement>,
  ) {
    if (
      !drag.current.active
    ) {
      return;
    }

    setPos({
      x:
        drag.current.x +
        e.clientX -
        drag.current.startX,

      y:
        drag.current.y +
        e.clientY -
        drag.current.startY,
    });
  }

  function end(
    e: PointerEvent<HTMLDivElement>,
  ) {
    drag.current.active =
      false;

    if (
      e.currentTarget.hasPointerCapture(
        e.pointerId,
      )
    ) {
      e.currentTarget
        .releasePointerCapture(
          e.pointerId,
        );
    }
  }

  return (
    <div
      className="absolute left-1/2 top-1/2 z-40 w-[min(700px,calc(100%-50px))] overflow-hidden border border-[var(--border)] bg-[var(--window)] shadow-[var(--popup-shadow)]"
      style={{
        transform: `translate(
          calc(-50% + ${pos.x}px),
          calc(-50% + ${pos.y}px)
        )`,
      }}
    >
      <div
        onPointerDown={
          start
        }
        onPointerMove={
          move
        }
        onPointerUp={
          end
        }
        onPointerCancel={
          end
        }
        className="flex h-10 cursor-grab touch-none select-none items-center border-b border-[var(--border-soft)] bg-[var(--window-top)] px-4 active:cursor-grabbing"
      >
        <span className="text-[length:var(--font-xs)] text-[var(--text-dim)]">
          result
        </span>

        <span className="ml-2 text-[length:var(--font-xs)] font-medium text-[var(--text-soft)]">
          {title(tab)}
        </span>

        <button
          type="button"
          onPointerDown={(
            e,
          ) =>
            e.stopPropagation()
          }
          onClick={
            onClose
          }
          className="ml-auto text-[var(--text-dim)] transition-colors hover:text-[var(--text)]"
        >
          ×
        </button>
      </div>

      <div className="portfolio-scroll max-h-[470px] overflow-y-auto bg-[var(--panel)] p-6">
        {tab ===
          "activity" && (
          <Activity />
        )}

        {tab ===
          "gear" && (
          <Gear />
        )}

        {tab ===
          "work" && (
          <Work />
        )}
      </div>
    </div>
  );
}

function Activity() {
  const [
    data,
    setData,
  ] =
    useState<ActivityData | null>(
      null,
    );

  const [
    error,
    setError,
  ] =
    useState(false);

  useEffect(() => {
    let active =
      true;

    async function load() {
      try {
        const response =
          await fetch(
            "/api/activity",
          );

        if (
          !response.ok
        ) {
          throw new Error();
        }

        const json =
          (await response.json()) as ActivityData;

        if (active) {
          setData(
            json,
          );
        }
      } catch {
        if (active) {
          setError(
            true,
          );
        }
      }
    }

    load();

    return () => {
      active =
        false;
    };
  }, []);

  if (error) {
    return (
      <Empty>
        unable to load activity.
      </Empty>
    );
  }

  if (!data) {
    return (
      <div className="py-8 text-center text-[length:var(--font-sm)] text-[var(--text-dim)]">
        syncing activity...
      </div>
    );
  }

  return (
    <div className="space-y-9">
      <Github
        data={
          data.github
        }
      />

      <Steam
        data={
          data.steam
        }
      />

      <OutsideCode />
    </div>
  );
}

function Github({
  data,
}: {
  data: ActivityData["github"];
}) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionTitle>
          coding / github
        </SectionTitle>

        <span className="text-[length:var(--font-xs)] text-[var(--text-dim)]">
          {data.total}{" "}
          contributions / last
          year
        </span>
      </div>

      <Graph
        days={
          data.days
        }
      />

      {data.recentRepo && (
        <div className="mt-5 grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-6">
          <span className="text-[length:var(--font-xs)] text-[var(--text-dim)]">
            recent push
          </span>

          {data.recentRepo
            .isPrivate ? (
            <span className="text-[length:var(--font-sm)] text-[var(--text-soft)]">
              {
                data.recentRepo
                  .name
              }

              <span className="ml-2 text-[10px] uppercase tracking-[0.12em] text-[var(--text-dim)]">
                private
              </span>
            </span>
          ) : (
            <a
              href={
                data.recentRepo
                  .url
              }
              target="_blank"
              rel="noreferrer"
              className="text-[length:var(--font-sm)] text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
            >
              {
                data.recentRepo
                  .name
              }{" "}
              ↗
            </a>
          )}
        </div>
      )}
    </section>
  );
}

function Graph({
  days,
}: {
  days: Day[];
}) {
  return (
    <div className="mt-5 overflow-x-auto pb-2">
      <div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]">
        {days
          .slice(-364)
          .map(
            (day) => {
              const count =
                day.contributionCount;

              const color =
                count === 0
                  ? "bg-white/[0.035]"
                  : count <= 2
                    ? "bg-[var(--accent)]/25"
                    : count <= 5
                      ? "bg-[var(--accent)]/45"
                      : count <= 9
                        ? "bg-[var(--accent)]/65"
                        : "bg-[var(--accent)]/90";

              return (
                <div
                  key={
                    day.date
                  }
                  title={`${day.date}: ${count} contributions`}
                  className={`h-[9px] w-[9px] rounded-[2px] ${color}`}
                />
              );
            },
          )}
      </div>
    </div>
  );
}

function Steam({
  data,
}: {
  data: ActivityData["steam"];
}) {
  return (
    <section>
      <SectionTitle>
        playing / steam
      </SectionTitle>

      {data.private ? (
        <Empty>
          activity private
        </Empty>
      ) : (
        <div className="mt-5 space-y-3">
          {data.games.map(
            (game) => (
              <div
                key={
                  game.id
                }
                className="flex items-center gap-4 border-b border-[var(--border-soft)] pb-3 last:border-0"
              >
                <img
                  src={
                    game.image
                  }
                  alt=""
                  className="h-12 w-20 object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate text-[length:var(--font-sm)] text-[var(--text-soft)]">
                    {
                      game.name
                    }
                  </p>

                  <p className="mt-1 text-[length:var(--font-xs)] text-[var(--text-dim)]">
                    {game.recentHours >
                    0
                      ? `${game.recentHours} hrs / last 2 weeks`
                      : `${game.totalHours} hrs total`}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </section>
  );
}

function OutsideCode() {
  return (
    <section>
      <SectionTitle>
        outside code
      </SectionTitle>

      <div className="mt-5 space-y-4">
        <Item
          label="usually"
          value="playing something, learning something new, or both"
        />

        <Item
          label="learning"
          value="new tools, game dev, and whatever catches my interest"
        />

        <Item
          label="languages"
          value="slowly picking up bits of a new language when i feel like it"
        />

        <Item
          label="random"
          value="i can spend way too long tweaking tiny details nobody else notices :p"
        />
      </div>
    </section>
  );
}

function Gear() {
  return (
    <div className="space-y-8">
      <Group title="PC">
        <Item
          label="CPU"
          value="AMD Ryzen 5 5600"
        />

        <Item
          label="GPU"
          value="XFX Swift RX 9060 XT 16GB Triple Fan"
        />

        <Item
          label="Memory"
          value="TeamGroup T-Force Delta RGB DDR4 16GB"
        />

        <Item
          label="Motherboard"
          value="MSI B550M PRO-VDH WiFi mATX"
        />

        <Item
          label="PSU"
          value="DeepCool PF600X 600W"
        />

        <Item
          label="Cooler"
          value="DeepCool AK500S Digital SE"
        />
      </Group>

      <Group title="Storage">
        <Item
          label="SSD"
          value="ADATA Legend 710 PCIe Gen3 NVMe"
        />

        <Item
          label="HDD"
          value="Toshiba 1TB HDD"
        />
      </Group>

      <Group title="Peripherals">
        <Item
          label="Monitor"
          value="ASUS TUF Gaming VG259Q3A — 180Hz"
        />

        <Item
          label="Microphone"
          value="FIFINE AM8 XLR"
        />

        <Item
          label="Mouse"
          value="ATK VXE Dragonfly R1 SE+"
        />

        <Item
          label="Keyboard"
          value="Royal Kludge RK65 — Chartreuse Switches"
        />
      </Group>
    </div>
  );
}

function Work() {
  return (
    <div className="space-y-8">
      <Job
        company="Eight Point Solutions LLC"
        href="https://www.eightpointsolutions.com/"
        role="Junior Frontend Developer"
        date="2025 — 2026"
        text="Frontend development, UI implementation, LMS and CRM work, and QA testing."
        tools="Wix Studio · Figma · HTML · CSS · JavaScript · QA · SEO"
      />

      <Job
        company="Virtuality Services"
        href="https://www.virtualityservices.com/"
        role="Frontend Developer"
        date="2025"
        text="Built responsive frontend interfaces and supported the company website."
        tools="HTML · CSS · JavaScript · Responsive Design"
      />

      <Job
        company="The Interns Hub"
        href="https://www.theinternshub.com/"
        role="Web Development Intern"
        date="2024"
        text="Early hands-on web development experience in a team environment."
        tools="HTML · CSS · JavaScript · Git"
      />
    </div>
  );
}

function Job({
  company,
  href,
  role,
  date,
  text,
  tools,
}: {
  company: string;
  href?: string;
  role: string;
  date: string;
  text: string;
  tools: string;
}) {
  return (
    <section className="border-b border-[var(--border)] pb-7 last:border-0">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-base font-medium text-[var(--text)]"
        >
          {company} ↗
        </a>
      ) : (
        <p className="text-base font-medium text-[var(--text)]">
          {company}
        </p>
      )}

      <div className="mt-2 text-[length:var(--font-xs)] text-[var(--text-dim)]">
        <span className="text-[var(--text-soft)]">
          {role}
        </span>{" "}
        / {date}
      </div>

      <p className="mt-4 text-[length:var(--font-sm)] leading-6 text-[var(--text-soft)]">
        {text}
      </p>

      <p className="mt-4 text-[length:var(--font-xs)] text-[var(--text-dim)]">
        {tools}
      </p>
    </section>
  );
}

function SectionTitle({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[length:var(--font-xs)] font-medium uppercase tracking-[0.12em] text-[var(--text-soft)]">
        {children}
      </span>

      <div className="h-px flex-1 bg-[var(--border)]" />
    </div>
  );
}

function Empty({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mt-5 border border-dashed border-[var(--border)] px-4 py-5 text-[length:var(--font-xs)] text-[var(--text-dim)]">
      {children}
    </div>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <SectionTitle>
        {title}
      </SectionTitle>

      <div className="mt-5 space-y-4">
        {children}
      </div>
    </section>
  );
}

function Item({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-6">
      <span className="text-[length:var(--font-xs)] text-[var(--text-dim)]">
        {label}
      </span>

      <span className="text-[length:var(--font-sm)] text-[var(--text-soft)]">
        {value}
      </span>
    </div>
  );
}

function Row({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-7 items-center gap-1.5">
      {children}
    </div>
  );
}

function Arrow({
  open = false,
}: {
  open?: boolean;
}) {
  return (
    <span className="w-3 text-center">
      {open
        ? "⌄"
        : ">"}
    </span>
  );
}

function File({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className={`flex h-7 w-full items-center gap-2 px-2 text-left ${
        active
          ? "bg-white/[0.05] text-[var(--text-soft)]"
          : "text-[var(--text-dim)]"
      }`}
    >
      <span className="text-[var(--accent-ts)]">
        TS
      </span>

      {children}
    </button>
  );
}

function Act() {
  return (
    <div className="w-10 border-r border-[var(--border-soft)] bg-[var(--panel-deep)]" />
  );
}

function title(
  tab: Tab,
) {
  if (
    tab ===
    "activity"
  ) {
    return "getActivity()";
  }

  if (
    tab ===
    "gear"
  ) {
    return "getSetup()";
  }

  return "getExperience()";
}