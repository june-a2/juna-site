import type {
  ReactNode,
} from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function MacWindow({
  title,
  children,
}: Props) {
  return (
    <section className="mac-window">
      <header className="mac-window-header">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />

          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />

          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        <span className="mac-window-title">
          {title}
        </span>
      </header>

      <div className="h-[calc(100%-56px)]">
        {children}
      </div>
    </section>
  );
}