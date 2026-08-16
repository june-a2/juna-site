import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function MacWindow({
  title,
  children,
}: Props) {
  return (
    <section className="h-[min(860px,calc(100vh-64px))] w-full overflow-hidden rounded-[12px] border border-white/5 bg-[#111] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
      <header className="relative flex h-14 items-center border-b border-white/[0.04] bg-[#171717] px-5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        <span className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-neutral-500">
          {title}
        </span>
      </header>

      <div className="h-[calc(100%-56px)]">
        {children}
      </div>
    </section>
  );
}