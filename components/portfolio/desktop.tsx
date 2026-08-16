"use client";

import { useState } from "react";

import { About } from "./about";
import { Home } from "./home";
import { MacWindow } from "./mac-window";
import { Nav } from "./nav";
import { Projects } from "./projects";
import type { Project } from "./projects";
import { Readme } from "./readme";
import { Window } from "./window";

export type Page =
  | "home"
  | "readme"
  | "about"
  | "projects";

export function Desktop() {
  const [page, setPage] =
    useState<Page>("home");

  const [project, setProject] =
    useState<Project | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#202020] p-5 md:p-8">
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.08]
          [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          [background-size:32px_32px]
        "
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-40px)] max-w-[1500px] items-center justify-center md:min-h-[calc(100vh-64px)]">
        <MacWindow title="fumi">
          <div className="flex h-full min-h-[680px] flex-col">
            <div className="min-h-0 flex-1">
              {page === "home" && (
                <Home />
              )}

              {page === "readme" && (
                <Readme />
              )}

              {page === "about" && (
                <About />
              )}

              {page === "projects" && (
                <Projects
                  onOpen={setProject}
                />
              )}
            </div>

            <Nav
              page={page}
              setPage={setPage}
            />
          </div>
        </MacWindow>
      </div>

      {project && (
        <Window
          project={project}
          onClose={() =>
            setProject(null)
          }
        />
      )}
    </main>
  );
}