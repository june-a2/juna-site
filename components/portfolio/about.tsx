"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

type Tab = "gear" | "activity" | "work";

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
    games: Game[];
    error?: string;
  };

  checkedAt: string;
};

const tabs: {
  id: Tab;
  label: string;
  fn: string;
}[] = [
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
];

export function About() {
  const [tab, setTab] =
    useState<Tab>("activity");

  const [running, setRunning] =
    useState(true);

  const [open, setOpen] =
    useState<Tab | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRunning(false);
      setOpen("activity");
    }, 650);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  function run(id: Tab) {
    setTab(id);
    setOpen(null);
    setRunning(true);

    window.setTimeout(() => {
      setRunning(false);
      setOpen(id);
    }, 650);
  }

  const active = tabs.find(
    (item) => item.id === tab,
  )!;

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#0f0f0f] font-mono text-sm text-neutral-400">
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
            file={active.label}
          />

          <Code
            tab={tab}
            fn={active.fn}
          />
        </div>

        {running && (
          <Terminal
            file={active.label}
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
  run: (tab: Tab) => void;
}) {
  return (
    <div className="flex h-8 border-b border-white/[0.04] bg-[#161616]">
      {tabs.map((item) => {
        const active =
          tab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              run(item.id)
            }
            className={`relative flex h-8 items-center gap-2 border-r border-white/[0.04] px-3 text-xs transition-colors ${
              active
                ? "bg-[#0f0f0f] text-neutral-300"
                : "text-neutral-600 hover:bg-white/[0.02] hover:text-neutral-400"
            }`}
          >
            <span className="text-[#3178c6]">
              TS
            </span>

            <span>
              {item.label}
            </span>

            {active && (
              <span className="absolute inset-x-0 bottom-0 h-px bg-[#569cd6]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function Side({
  tab,
  run,
}: {
  tab: Tab;
  run: (tab: Tab) => void;
}) {
  return (
    <aside className="hidden shrink-0 md:flex">
      <Act />

      <div className="w-40 border-r border-white/[0.04] bg-[#111] text-xs text-neutral-600">
        <div className="flex h-8 items-center px-3 uppercase tracking-wide">
          Explorer
        </div>

        <div className="px-2">
          <Row>
            <Arrow open />

            <span className="text-neutral-400">
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
              {tabs.map((item) => (
                <File
                  key={item.id}
                  active={
                    tab === item.id
                  }
                  onClick={() =>
                    run(item.id)
                  }
                >
                  {item.label}
                </File>
              ))}
            </div>

            <Row>
              <Arrow />

              <span>
                projects
              </span>
            </Row>

            <Row>
              <Arrow />

              <span>
                public
              </span>
            </Row>
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
    <div className="flex h-7 items-center border-b border-white/[0.03] bg-[#111] px-3 text-xs text-neutral-600">
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

      <span className="text-neutral-400">
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
      <div className="grid min-h-7 grid-cols-[46px_minmax(0,1fr)] text-sm leading-7">
        <span className="select-none pr-3 text-right text-neutral-700">
          1
        </span>

        <code>
          <span className="text-[#c586c0]">
            const
          </span>{" "}

          <span className="text-[#9cdcfe]">
            {name}
          </span>{" "}

          <span className="text-neutral-500">
            =
          </span>{" "}

          <span className="text-[#dcdcaa]">
            {fn}
          </span>

          <span className="text-neutral-500">
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
    <div className="absolute left-1/2 top-1/2 z-30 w-[min(560px,calc(100%-50px))] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/[0.08] bg-[#0b0b0b] shadow-[0_6px_18px_rgba(0,0,0,0.2)]">
      <div className="flex h-9 items-center border-b border-white/[0.05] bg-[#141414] px-3 text-xs text-neutral-600">
        <span>
          terminal
        </span>

        <span className="ml-auto">
          {file}
        </span>
      </div>

      <div className="space-y-2 px-4 py-4 text-xs">
        <p className="text-neutral-600">
          $ bun run {file}
        </p>

        <p className="text-neutral-300">
          &gt; running {fn}...
        </p>

        <div className="flex items-center gap-1 pt-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-400" />

          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-500 [animation-delay:150ms]" />

          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-600 [animation-delay:300ms]" />
        </div>
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
  const [pos, setPos] =
    useState<Pos>({
      x: 0,
      y: 0,
    });

  const drag = useRef({
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
      startX: e.clientX,
      startY: e.clientY,
      x: pos.x,
      y: pos.y,
    };

    e.currentTarget.setPointerCapture(
      e.pointerId,
    );
  }

  function move(
    e: PointerEvent<HTMLDivElement>,
  ) {
    if (!drag.current.active) {
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
    drag.current.active = false;

    if (
      e.currentTarget.hasPointerCapture(
        e.pointerId,
      )
    ) {
      e.currentTarget.releasePointerCapture(
        e.pointerId,
      );
    }
  }

  return (
    <div
      className="absolute left-1/2 top-1/2 z-40 w-[min(700px,calc(100%-50px))] overflow-hidden border border-white/[0.1] bg-[#111] shadow-[0_6px_18px_rgba(0,0,0,0.28)]"
      style={{
        transform: `translate(
          calc(-50% + ${pos.x}px),
          calc(-50% + ${pos.y}px)
        )`,
      }}
    >
      <div
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        className="flex h-10 cursor-grab touch-none select-none items-center border-b border-white/[0.06] bg-[#181818] px-4 active:cursor-grabbing"
      >
        <span className="text-xs text-neutral-500">
          result
        </span>

        <span className="ml-2 text-xs font-medium text-neutral-200">
          {title(tab)}
        </span>

        <button
          type="button"
          onPointerDown={(e) =>
            e.stopPropagation()
          }
          onClick={onClose}
          className="ml-auto text-sm text-neutral-500 transition-colors hover:text-white"
        >
          ×
        </button>
      </div>

      <div
        className="
          max-h-[470px]
          overflow-y-auto
          bg-[#101010]
          p-6
          [scrollbar-width:thin]
          [scrollbar-color:#343434_transparent]
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[#343434]
        "
      >
        {tab === "activity" && (
          <Activity />
        )}

        {tab === "gear" && (
          <Gear />
        )}

        {tab === "work" && (
          <Work />
        )}
      </div>
    </div>
  );
}

function Activity() {
  const [data, setData] =
    useState<ActivityData | null>(
      null,
    );

  const [error, setError] =
    useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response =
          await fetch("/api/activity");

        if (!response.ok) {
          throw new Error(
            "Activity request failed.",
          );
        }

        const json =
          (await response.json()) as ActivityData;

        if (active) {
          setData(json);
        }
      } catch {
        if (active) {
          setError(true);
        }
      }
    }

    load();

    return () => {
      active = false;
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
      <div className="space-y-3 py-8 text-center text-sm text-neutral-500">
        <p>
          syncing activity...
        </p>

        <div className="mx-auto h-px w-20 animate-pulse bg-neutral-700" />
      </div>
    );
  }

  return (
    <div className="space-y-9">
      <Github data={data.github} />

      <Steam data={data.steam} />
    </div>
  );
}

function Github({
  data,
}: {
  data: ActivityData["github"];
}) {
  if (!data.configured) {
    return (
      <section>
        <SectionTitle>
          coding / github
        </SectionTitle>

        <Empty>
          add GitHub credentials to
          enable live activity.
        </Empty>
      </section>
    );
  }

  if (data.error) {
    return (
      <section>
        <SectionTitle>
          coding / github
        </SectionTitle>

        <Empty>
          {data.error}
        </Empty>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionTitle>
          coding / github
        </SectionTitle>

        <span className="text-xs text-neutral-500">
          {data.total} contributions /
          last year
        </span>
      </div>

      <Graph
        days={data.days}
      />

      {data.recentRepo && (
        <div className="mt-5 grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-6">
          <span className="text-xs text-neutral-500">
            recent push
          </span>

          {data.recentRepo.isPrivate ? (
            <span className="text-sm text-neutral-200">
              {data.recentRepo.name}

              <span className="ml-2 text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                private
              </span>
            </span>
          ) : (
            <a
              href={
                data.recentRepo.url
              }
              target="_blank"
              rel="noreferrer"
              className="text-sm text-neutral-200 transition-colors hover:text-white"
            >
              {data.recentRepo.name} ↗
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
  const visible =
    days.slice(-364);

  return (
    <div className="mt-5 overflow-x-auto pb-2">
      <div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]">
        {visible.map((day) => {
          const count =
            day.contributionCount;

          const opacity =
            count === 0
              ? "bg-white/[0.035]"
              : count <= 2
                ? "bg-[#569cd6]/25"
                : count <= 5
                  ? "bg-[#569cd6]/45"
                  : count <= 9
                    ? "bg-[#569cd6]/65"
                    : "bg-[#569cd6]/90";

          return (
            <div
              key={day.date}
              title={`${day.date}: ${count} contributions`}
              className={`h-[9px] w-[9px] rounded-[2px] ${opacity}`}
            />
          );
        })}
      </div>
    </div>
  );
}

function Steam({
  data,
}: {
  data: ActivityData["steam"];
}) {
  if (!data.configured) {
    return (
      <section>
        <SectionTitle>
          playing / steam
        </SectionTitle>

        <Empty>
          add Steam credentials to
          enable recent games.
        </Empty>
      </section>
    );
  }

  if (data.error) {
    return (
      <section>
        <SectionTitle>
          playing / steam
        </SectionTitle>

        <Empty>
          {data.error}
        </Empty>
      </section>
    );
  }

  return (
    <section>
      <SectionTitle>
        playing / steam
      </SectionTitle>

      {data.games.length === 0 ? (
        <Empty>
          no recently played games
          available.
        </Empty>
      ) : (
        <div className="mt-5 space-y-3">
          {data.games.map(
            (game) => (
              <div
                key={game.id}
                className="flex items-center gap-4 border-b border-white/[0.05] pb-3 last:border-0 last:pb-0"
              >
                <div className="h-12 w-20 shrink-0 overflow-hidden rounded-[3px] bg-white/[0.03]">
                  <img
                    src={game.image}
                    alt=""
                    className="h-full w-full object-cover opacity-80"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm text-neutral-200">
                    {game.name}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    {game.recentHours > 0
                      ? `${game.recentHours} hrs / last 2 weeks`
                      : `${game.totalHours} hrs total`}
                  </p>
                </div>

                {game.lastPlayed && (
                  <span className="ml-auto hidden shrink-0 text-xs text-neutral-600 sm:block">
                    {ago(
                      game.lastPlayed,
                    )}
                  </span>
                )}
              </div>
            ),
          )}
        </div>
      )}
    </section>
  );
}

function Empty({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mt-5 border border-dashed border-white/[0.08] px-4 py-5 text-xs text-neutral-500">
      {children}
    </div>
  );
}

function SectionTitle({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-300">
        {children}
      </span>

      <div className="h-px flex-1 bg-white/[0.08]" />
    </div>
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
        role="Frontend Developer"
        date="2025"
        text="Built responsive frontend interfaces and supported the company website."
        tools="HTML · CSS · JavaScript · Responsive Design"
      />

      <Job
        company="The Interns Hub"
        role="Web Development Intern"
        date="2025"
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
    <section className="border-b border-white/[0.07] pb-7 last:border-0 last:pb-0">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-base font-medium text-neutral-100 transition-colors hover:text-white"
        >
          <span>
            {company}
          </span>

          <span className="text-xs text-neutral-600 transition-colors group-hover:text-neutral-300">
            ↗
          </span>
        </a>
      ) : (
        <p className="text-base font-medium text-neutral-100">
          {company}
        </p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
        <span className="text-neutral-300">
          {role}
        </span>

        <span className="text-neutral-700">
          /
        </span>

        <span>
          {date}
        </span>
      </div>

      <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-300">
        {text}
      </p>

      <p className="mt-4 text-xs leading-5 text-neutral-500">
        {tools}
      </p>
    </section>
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
      <div className="mb-5 flex items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-300">
          {title}
        </span>

        <div className="h-px flex-1 bg-white/[0.08]" />
      </div>

      <div className="space-y-4">
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
      <span className="text-xs text-neutral-500 sm:text-sm">
        {label}
      </span>

      <span className="text-sm leading-6 text-neutral-200">
        {value}
      </span>
    </div>
  );
}

function ago(date: string) {
  const time =
    new Date(date).getTime();

  const diff =
    Date.now() - time;

  const minute =
    60 * 1000;

  const hour =
    minute * 60;

  const day =
    hour * 24;

  if (diff < hour) {
    return `${Math.max(
      1,
      Math.floor(diff / minute),
    )}m ago`;
  }

  if (diff < day) {
    return `${Math.floor(
      diff / hour,
    )}h ago`;
  }

  return `${Math.floor(
    diff / day,
  )}d ago`;
}

function title(tab: Tab) {
  if (tab === "activity") {
    return "getActivity()";
  }

  if (tab === "gear") {
    return "getSetup()";
  }

  return "getExperience()";
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
    <span className="w-3 text-center text-neutral-600">
      {open ? "⌄" : ">"}
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
      onClick={onClick}
      className={`flex h-7 w-full items-center gap-2 px-2 text-left transition-colors ${
        active
          ? "bg-white/[0.05] text-neutral-300"
          : "text-neutral-600 hover:bg-white/[0.02] hover:text-neutral-400"
      }`}
    >
      <span className="text-[#3178c6]">
        TS
      </span>

      {children}
    </button>
  );
}

function Act() {
  return (
    <div className="flex w-10 flex-col items-center border-r border-white/[0.04] bg-[#0c0c0c] py-1 text-neutral-600">
      <ActBtn active>
        <Files />
      </ActBtn>

      <ActBtn>
        <Search />
      </ActBtn>

      <ActBtn>
        <Git />
      </ActBtn>

      <ActBtn>
        <Run />
      </ActBtn>

      <ActBtn>
        <Ext />
      </ActBtn>

      <div className="flex-1" />

      <ActBtn>
        <User />
      </ActBtn>

      <ActBtn>
        <GearIcon />
      </ActBtn>
    </div>
  );
}

function ActBtn({
  active = false,
  children,
}: {
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`flex h-9 w-9 items-center justify-center transition-colors hover:text-neutral-300 ${
        active
          ? "border-l-2 border-neutral-400 bg-white/[0.03] text-neutral-300"
          : ""
      }`}
    >
      {children}
    </button>
  );
}

function Icon({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {children}
    </svg>
  );
}

function Files() {
  return (
    <Icon>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v5h4" />
    </Icon>
  );
}

function Search() {
  return (
    <Icon>
      <circle
        cx="10"
        cy="10"
        r="6"
      />

      <path d="m15 15 5 5" />
    </Icon>
  );
}

function Git() {
  return (
    <Icon>
      <circle
        cx="7"
        cy="5"
        r="2"
      />

      <circle
        cx="7"
        cy="19"
        r="2"
      />

      <circle
        cx="17"
        cy="9"
        r="2"
      />

      <path d="M7 7v10M9 7c0 4 6 1 6 4" />
    </Icon>
  );
}

function Run() {
  return (
    <Icon>
      <path d="m8 5 10 7-10 7z" />
    </Icon>
  );
}

function Ext() {
  return (
    <Icon>
      <rect
        x="4"
        y="4"
        width="6"
        height="6"
      />

      <rect
        x="14"
        y="4"
        width="6"
        height="6"
      />

      <rect
        x="4"
        y="14"
        width="6"
        height="6"
      />

      <rect
        x="14"
        y="14"
        width="6"
        height="6"
      />
    </Icon>
  );
}

function User() {
  return (
    <Icon>
      <circle
        cx="12"
        cy="12"
        r="9"
      />

      <circle
        cx="12"
        cy="9"
        r="3"
      />

      <path d="M7 18c1.4-2.5 3-3.7 5-3.7s3.6 1.2 5 3.7" />
    </Icon>
  );
}

function GearIcon() {
  return (
    <Icon>
      <circle
        cx="12"
        cy="12"
        r="3"
      />

      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
    </Icon>
  );
}