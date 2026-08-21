"use client";

import { useState } from "react";

export type Project = {
  id: string;
  name: string;
  type: string;

  category: "web" | "client" | "wix" | "side";

  stack: string;
  preview?: string;
  description: string;

  live?: string;
  github?: string;
};

type Props = {
  onOpen: (project: Project) => void;
};

type Filter = "all" | Project["category"];

const filters: {
  label: string;
  value: Filter;
}[] = [
  {
    label: "all projects",
    value: "all",
  },
  {
    label: "web apps",
    value: "web",
  },
  {
    label: "client work",
    value: "client",
  },
  {
    label: "wix",
    value: "wix",
  },
  {
    label: "sidequests",
    value: "side",
  },
];

const projects: Project[] = [
  {
    id: "greenland-ph",
    name: "greenland",
    type: "Player Portal / Community Platform",
    category: "web",
    stack: "Next.js · React · TypeScript · Tailwind CSS · Steam Integration",
    preview: "/projects/greenland.webp",
    description:
      "greenland is a player portal built around The Isle: Evrima community, with plans for dinosaur storage, skin customization, map tracking, and Steam account linking in one place.",
    live: "https://greenland-ph-sigma.vercel.app/",
  },
  {
    id: "greenland-voice",
    name: "greenland voice",
    type: "Proximity Voice Application",
    category: "side",
    stack: "Node.js · WebSocket · WebRTC · Discord Rich Presence",
    preview: "/projects/greenland-voice.webp",
    description:
      "greenland voice is a proximity voice system designed for The Isle, connecting players based on their in-game distance with server-aware voice communication and Discord presence integration.",
  },
  {
    id: "selyne",
    name: "selyne",
    type: "Full-Stack Agency CRM",
    category: "web",
    stack:
      "Next.js · React · TypeScript · Tailwind CSS · shadcn/ui · Auth.js · Zod · Prisma · PostgreSQL · Vercel",
    preview: "/projects/selyne.webp",
    description:
      "selyne is a full-stack CRM and operations platform built for freelancers and small agencies. It brings client management, sales pipelines, projects, tasks, deadlines, and workflow tracking into one customizable workspace, with team management and payroll features planned as the platform grows.",
    live: "https://selyne.vercel.app/login",
  },
  {
    id: "eps",
    name: "eps",
    type: "Full-Stack Agency CRM",
    category: "wix",
    stack: "Wix Studio · Figma · Frontend UI · SEO · QA Testing · CRM · LMS",
    preview: "/projects/eps.webp",
    description:
      "contributed to the company website, CRM, and LMS through Wix Studio updates, frontend interface work, Figma designs, QA testing, and SEO improvements.",
    live: "https://selyne.vercel.app/login",
  },
  {
    id: "virtuality",
    name: "virtuality services",
    type: "Client Website",
    category: "client",
    stack: "HTML · CSS · JavaScript · Figma · Responsive Design",
    preview: "/projects/vs.webp",
    description:
      "built a responsive landing page for Virtuality Services, focused on clearly presenting their services and making it easy for visitors to get in touch.",
    live: "https://virtualityservices.com/",
  },
  {
    id: "privarase",
    name: "privarase",
    type: "Wix Website",
    category: "wix",
    stack:
      "Wix Studio · Responsive Design · Figma · SEO Optimization · Content Strategy",
    preview: "/projects/privarase.webp",
    description:
      "built a responsive Wix Studio site for Privarase, with clear content sections, article-style resources, mobile optimization, and a clean layout focused on privacy and cybersecurity topics.",
    live: "https://www.privarase.com/",
  },
  {
    id: "rpg-game",
    name: "RPG Game",
    type: "Game Development",
    category: "side",
    stack: "Godot · GDScript",
    preview: "/projects/rpg-pro.webp",
    description:
      "a 2022 RPG Maker MZ experiment where I spent more time designing characters and maps than actually making the game. Somehow, that was the fun part. Inspired by OMORI. Mostly designed characters, built maps, and made little people walk around them. It was my first little dive into game development.",
  },
  {
    id: "discord-bot",
    name: "discord bot",
    type: "Discord Automation",
    category: "side",
    stack: "JavaScript · Node.js · Discord API",
    preview: "/projects/dc-bot.webp",
    description:
      "a Discord bot I built before college while learning programming, with a custom command system and automated embeds for member joins, leaves, and server boosts.",
  },
];

export function Projects({ onOpen }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="projects-page portfolio-scroll">
      <div className="projects-content">
        <div className="projects-head">
          <div>
            <h1 className="mt-3 text-[length:var(--font-title-md)] font-medium tracking-[-0.04em] text-[var(--text)]">
              projects
            </h1>
          </div>

          <p className="font-[family-name:var(--font-mono)] text-[length:var(--font-xs)] text-[var(--text-dim)]">
            click a project to open
          </p>
        </div>

        <div className="projects-filters">
          {filters.map((item) => {
            const active = item.value === filter;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`border px-3 py-1.5 font-[family-name:var(--font-mono)] text-[length:var(--font-xs)] transition-colors ${
                  active
                    ? "border-[var(--text-soft)] bg-[var(--text-soft)] text-[var(--window)]"
                    : "border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--text-dim)] hover:text-[var(--text-soft)]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="projects-grid">
          {visible.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onOpen(project)}
              className="project-card group"
            >
              <div className="project-card-image">
                {project.preview && (
                  <>
                    <img
                      src={project.preview}
                      alt={project.name}
                      className="h-full w-full object-cover opacity-40 grayscale-[35%] transition duration-300 group-hover:scale-[1.025] group-hover:opacity-60 group-hover:grayscale-0"
                    />

                    <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/20" />
                  </>
                )}

                <div className="absolute inset-0 flex items-center justify-center px-5">
                  <h2 className="text-center font-[family-name:var(--font-mono)] text-2xl font-semibold tracking-[-0.04em] text-[var(--text-soft)] transition-colors group-hover:text-[var(--text)]">
                    {project.name}
                  </h2>
                </div>
              </div>

              <div className="project-card-info">
                <p className="line-clamp-2 font-[family-name:var(--font-mono)] text-[length:var(--font-sm)] leading-5 text-[var(--text-muted)]">
                  {project.description}
                </p>

                <div className="mt-auto pt-4">
                  <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--text-dim)]">
                    {project.type}
                  </p>

                  <p className="mt-1 truncate font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-faint)]">
                    {project.stack}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
