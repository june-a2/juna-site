import type {
  Page,
} from "./desktop";

type Props = {
  page: Page;
  setPage: (
    page: Page,
  ) => void;
};

const links: {
  label: string;
  value: Page;
}[] = [
  {
    label: "main",
    value: "home",
  },
  {
    label: "README.md",
    value: "readme",
  },
  {
    label: "about.ts",
    value: "about",
  },
  {
    label: "projects/",
    value: "projects",
  },
];

export function Nav({
  page,
  setPage,
}: Props) {
  const active =
    links.find(
      (item) =>
        item.value === page,
    );

  return (
    <div className="px-5 pb-5 font-[family-name:var(--font-mono)] sm:px-7 sm:pb-6">
      <div className="mb-3 flex items-center gap-2 text-[length:var(--font-xs)] text-[var(--text-dim)]">
        <span className="h-5 w-[2px] bg-[var(--text-muted)]" />

        <span>
          ⌁
        </span>

        <span>
          {active?.label}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {links.map(
          (item) => {
            const selected =
              page ===
              item.value;

            return (
              <button
                key={
                  item.value
                }
                type="button"
                onClick={() =>
                  setPage(
                    item.value,
                  )
                }
                className={`px-2 py-1 text-[length:var(--font-sm)] transition-colors ${
                  selected
                    ? "bg-[var(--text-soft)] text-[var(--window)]"
                    : "text-[var(--text-dim)] hover:bg-white/[0.04] hover:text-[var(--text-soft)]"
                }`}
              >
                {
                  item.label
                }
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}