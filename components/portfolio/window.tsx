"use client";

import {
  useRef,
  useState,
  type PointerEvent,
} from "react";

import type {
  Project,
} from "./projects";

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
      e.currentTarget
        .hasPointerCapture(
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
      className="project-backdrop"
      onPointerDown={(e) => {
        if (
          e.target ===
          e.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="project-window"
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
          className="project-window-header"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Close project"
              onPointerDown={(
                e,
              ) =>
                e.stopPropagation()
              }
              onClick={
                onClose
              }
              className="h-3 w-3 rounded-full bg-[#ff5f57]"
            />

            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />

            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          <span className="project-window-title">
            {project.name}
          </span>
        </div>

        <div className="project-window-scroll">
          <div className="project-window-preview">
            <img
              src={
                project.preview
              }
              alt={
                project.name
              }
            />
          </div>

          <div className="project-window-body">
            <p className="font-[family-name:var(--font-mono)] text-[length:var(--font-xs)] uppercase tracking-[0.14em] text-[var(--text-dim)]">
              {project.type}
            </p>

            <h2 className="mt-2 text-[length:var(--font-title-sm)] font-medium tracking-[-0.03em] text-[var(--text)]">
              {project.name}
            </h2>

            <p className="mt-4 text-[length:var(--font-sm)] leading-6 text-[var(--text-muted)]">
              {
                project.description
              }
            </p>

            <p className="mt-5 font-[family-name:var(--font-mono)] text-[length:var(--font-xs)] leading-5 text-[var(--text-dim)]">
              {project.stack}
            </p>

            {(project.live ||
              project.github) && (
              <div className="mt-7 flex flex-wrap items-center gap-5">
                {project.live && (
                  <a
                    href={
                      project.live
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="font-[family-name:var(--font-mono)] text-[length:var(--font-xs)] text-[var(--text-dim)] underline-offset-4 transition-colors hover:text-[var(--text)] hover:underline"
                  >
                    view live ↗
                  </a>
                )}

                {project.github && (
                  <a
                    href={
                      project.github
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="font-[family-name:var(--font-mono)] text-[length:var(--font-xs)] text-[var(--text-dim)] underline-offset-4 transition-colors hover:text-[var(--text)] hover:underline"
                  >
                    github ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}