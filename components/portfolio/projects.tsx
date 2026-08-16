"use client";

import { useState } from "react";

export type Project = {
  id: string;
  name: string;
  type: string;
  category:
    | "web"
    | "client"
    | "wix"
    | "side";
  stack: string;
  preview: string;
  description: string;
  live?: string;
  github?: string;
};

type Filter =
  | "all"
  | "web"
  | "client"
  | "wix"
  | "side";

type Props = {
  onOpen: (project: Project) => void;
};

const filters: {
  label: string;
  value: Filter;
}[] = [
  {
    label: "All Projects",
    value: "all",
  },
  {
    label: "Web Apps",
    value: "web",
  },
  {
    label: "Client Work",
    value: "client",
  },
  {
    label: "Wix Studio",
    value: "wix",
  },
  {
    label: "Sidequests",
    value: "side",
  },
];

const data: Project[] = [
  {
    id: "selyne",
    name: "Selyne",
    type: "Productivity app",
    category: "web",
    stack: "Next.js / TypeScript",
    preview: "/projects/selyne.png",
    description:
      "A productivity web app focused on clean project and task management.",
    live: "#",
    github: "#",
  },
  {
    id: "virtuality",
    name: "Virtuality Services",
    type: "Client website",
    category: "client",
    stack: "HTML / CSS / JavaScript",
    preview: "/projects/virtuality.png",
    description:
      "A responsive client website built to present services clearly and professionally.",
    live: "#",
  },
  {
    id: "privarase",
    name: "Privarase",
    type: "Client website",
    category: "wix",
    stack: "Wix Studio",
    preview: "/projects/privarase.png",
    description:
      "A polished Wix Studio website focused on responsive design and visual consistency.",
    live: "#",
  },
];

export function Projects({
  onOpen,
}: Props) {
  const [filter, setFilter] =
    useState<Filter>("all");

  const projects =
    filter === "all"
      ? data
      : data.filter(
          (project) =>
            project.category === filter,
        );

  return (
    <div className="h-full overflow-y-auto px-6 py-10 font-mono sm:px-10 md:px-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs text-neutral-600">
          projects/
        </p>

        <h1 className="mt-4 text-3xl font-medium text-neutral-100">
          Projects
        </h1>

        <p className="mt-3 text-sm text-neutral-500">
          Open a folder to explore a project.
        </p>

        <div className="mt-7 flex flex-wrap gap-1 border-b border-white/[0.06] pb-3">
          {filters.map((item) => {
            const active =
              filter === item.value;

            return (
              <button
                key={item.value}
                onClick={() =>
                  setFilter(item.value)
                }
                className={`px-2.5 py-1.5 text-xs transition-colors ${
                  active
                    ? "bg-neutral-200 text-neutral-950"
                    : "text-neutral-500 hover:bg-white/[0.04] hover:text-neutral-200"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() =>
                onOpen(project)
              }
              className="group relative flex flex-col items-center"
            >
              <div className="pointer-events-none absolute bottom-[calc(100%+16px)] left-1/2 z-50 w-72 -translate-x-1/2 translate-y-2 scale-[0.97] overflow-hidden rounded-[5px] border border-white/[0.08] bg-[#151515] opacity-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                <div className="aspect-video overflow-hidden bg-[#0d0d0d]">
                  <img
                    src={project.preview}
                    alt={`${project.name} preview`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-3 text-left">
                  <p className="text-xs text-neutral-200">
                    {project.name}
                  </p>

                  <p className="mt-1 text-[10px] text-neutral-600">
                    {project.stack}
                  </p>
                </div>
              </div>

              <div className="relative h-40 w-52 transition-transform duration-200 group-hover:-translate-y-1">
                <div className="absolute bottom-2 left-1 right-1 top-7 rounded-[4px] border border-[#87744f]/35 bg-[#756342] shadow-[0_16px_28px_rgba(0,0,0,0.3)]" />

                <div className="absolute left-4 top-2 h-9 w-24 rounded-t-[4px] bg-[#83704c]" />

                <div className="absolute left-[92px] top-[18px] h-5 w-8 skew-x-[28deg] bg-[#83704c]" />

                <div className="absolute left-1/2 top-8 z-10 h-[94px] w-40 -translate-x-1/2 overflow-hidden rounded-[3px] border border-white/[0.1] bg-[#111] shadow-[0_6px_16px_rgba(0,0,0,0.3)] transition-transform duration-200 group-hover:-translate-y-2">
                  <img
                    src={project.preview}
                    alt=""
                    className="h-full w-full object-cover opacity-80 group-hover:opacity-100"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 z-20 h-[88px] rounded-[4px] border border-[#95805a]/35 bg-[#8a7651] transition-colors group-hover:bg-[#927d56]" />

                <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 text-[9px] uppercase tracking-[0.18em] text-[#453a27]">
                  project
                </div>
              </div>

              <span className="mt-4 text-sm text-neutral-300 group-hover:text-white">
                {project.name}
              </span>

              <span className="mt-1 text-[11px] text-neutral-600">
                {project.type}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}