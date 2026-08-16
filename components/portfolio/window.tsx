"use client";

import {
  useRef,
  useState,
  type PointerEvent,
} from "react";

import type { Project } from "./projects";

type Props = {
  project: Project;
  onClose: () => void;
};

type Pos = {
  x: number;
  y: number;
};

export function Window({
  project,
  onClose,
}: Props) {
  const [pos, setPos] = useState<Pos>({
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

  function startDrag(
    event: PointerEvent<HTMLDivElement>,
  ) {
    drag.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      x: pos.x,
      y: pos.y,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  }

  function moveDrag(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (!drag.current.active) {
      return;
    }

    const x =
      drag.current.x +
      event.clientX -
      drag.current.startX;

    const y =
      drag.current.y +
      event.clientY -
      drag.current.startY;

    setPos({
      x,
      y,
    });
  }

  function endDrag(
    event: PointerEvent<HTMLDivElement>,
  ) {
    drag.current.active = false;

    event.currentTarget.releasePointerCapture(
      event.pointerId,
    );
  }

  return (
    <div
      className="absolute left-1/2 top-1/2 z-50 w-[min(760px,calc(100vw-40px))] overflow-hidden rounded-[8px] border border-white/[0.08] bg-[#121212] shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
      style={{
        transform: `translate(
          calc(-50% + ${pos.x}px),
          calc(-50% + ${pos.y}px)
        )`,
      }}
    >
      <header
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative flex h-12 cursor-grab touch-none select-none items-center border-b border-white/[0.05] bg-[#181818] px-4 active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            onPointerDown={(event) =>
              event.stopPropagation()
            }
            aria-label="Close"
            className="h-3 w-3 rounded-full bg-[#ff5f57]"
          />

          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />

          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono text-xs text-neutral-500">
          {project.name.toLowerCase()}
        </span>
      </header>

      <div className="max-h-[75vh] overflow-y-auto">
        <div className="aspect-[16/8] overflow-hidden border-b border-white/[0.05] bg-[#0b0b0b]">
          <img
            src={project.preview}
            alt={`${project.name} preview`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-600">
            {project.type}
          </p>

          <h2 className="mt-3 text-3xl font-medium tracking-tight text-neutral-100">
            {project.name}
          </h2>

          <p className="mt-3 font-mono text-xs text-neutral-500">
            {project.stack}
          </p>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-400">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="border border-white/[0.1] bg-neutral-200 px-4 py-2.5 text-neutral-950 hover:bg-white"
              >
                View Live ↗
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="border border-white/[0.08] px-4 py-2.5 text-neutral-400 hover:border-white/[0.16] hover:text-neutral-100"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}