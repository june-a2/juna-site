"use client";

import {
  useState,
} from "react";

import {
  About,
} from "./about";

import {
  Home,
} from "./home";

import {
  MacWindow,
} from "./mac-window";

import {
  Nav,
} from "./nav";

import {
  Projects,
} from "./projects";

import type {
  Project,
} from "./projects";

import {
  Readme,
} from "./readme";

import {
  Window,
} from "./window";

export type Page =
  | "home"
  | "readme"
  | "about"
  | "projects";

export function Desktop() {
  const [
    page,
    setPage,
  ] =
    useState<Page>(
      "home",
    );

  const [
    project,
    setProject,
  ] =
    useState<Project | null>(
      null,
    );

  return (
    <main className="portfolio-desktop">
      <div className="portfolio-grid" />

      <div className="portfolio-shell">
        <MacWindow title="juna.dev">
          <div className="flex h-full min-h-[680px] flex-col">
            <div className="min-h-0 flex-1">
              {page ===
                "home" && (
                <Home />
              )}

              {page ===
                "readme" && (
                <Readme />
              )}

              {page ===
                "about" && (
                <About />
              )}

              {page ===
                "projects" && (
                <Projects
                  onOpen={
                    setProject
                  }
                />
              )}
            </div>

            <Nav
              page={page}
              setPage={
                setPage
              }
            />
          </div>
        </MacWindow>
      </div>

      {project && (
        <Window
          project={
            project
          }
          onClose={() =>
            setProject(
              null,
            )
          }
        />
      )}
    </main>
  );
}