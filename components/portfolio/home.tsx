const email = "your@email.com";

const current = {
  label: "selyne",
  href: "https://your-selyne-link.com",
};

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: <Github />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/",
    icon: <Linkedin />,
  },
  {
    label: "Discord",
    href: "https://discord.com/users/",
    icon: <Discord />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: <Instagram />,
  },
];

export function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <div className="w-full max-w-5xl">
        <div className="mb-12 flex items-center justify-between gap-6 font-mono text-xs">
          <p className="uppercase tracking-[0.3em] text-neutral-600">
            portfolio / 2026
          </p>

          <a
            href={`mailto:${email}`}
            className="text-neutral-500 transition-colors hover:text-neutral-200"
          >
            {email}
          </a>
        </div>

        <div className="grid items-end gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-4 font-mono text-sm text-neutral-500">
              hello, i&apos;m
            </p>

            <h1 className="text-[clamp(4rem,11vw,9rem)] font-semibold leading-[0.82] tracking-[-0.08em] text-neutral-100">
              FUMI
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-400 md:text-xl">
              Frontend developer building thoughtful interfaces
              and functional web applications.
            </p>

            <a
              href={`mailto:${email}`}
              className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-neutral-100"
            >
              <span>
                let&apos;s talk
              </span>

              <span>
                ↗
              </span>
            </a>
          </div>

          <div className="md:pb-3">
            <div className="border-l border-white/10 pl-5 font-mono">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-600">
                currently
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="text-neutral-500">
                  building
                </span>

                <a
                  href={current.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-neutral-300 transition-colors hover:text-white"
                >
                  <span className="border-b border-white/[0.08] transition-colors group-hover:border-white/40">
                    {current.label}
                  </span>

                  <span className="text-xs text-neutral-600 transition-colors group-hover:text-neutral-300">
                    ↗
                  </span>
                </a>
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-neutral-600">
                based in
              </p>

              <p className="mt-3 text-sm text-neutral-300">
                philippines
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/[0.06] pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs text-neutral-600">
              frontend / ui / web apps
            </p>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 border border-neutral-300 bg-neutral-200 px-3.5 py-2 font-mono text-xs font-medium text-neutral-950 shadow-[0_3px_10px_rgba(0,0,0,0.2)] transition-colors duration-200 hover:bg-white"
            >
              <span>
                download resume
              </span>

              <span className="text-sm">
                ↓
              </span>
            </a>
          </div>

          <div className="mt-4 flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
                className="text-neutral-500 transition-colors duration-200 hover:text-neutral-100"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[22px] w-[22px]"
      fill="currentColor"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Github() {
  return (
    <Icon>
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.94a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </Icon>
  );
}

function Linkedin() {
  return (
    <Icon>
      <path d="M5.33 7.33H2V22h3.33V7.33ZM3.67 2A1.94 1.94 0 1 0 3.67 5.88 1.94 1.94 0 0 0 3.67 2ZM22 13.6c0-4.42-2.36-6.48-5.5-6.48-2.53 0-3.67 1.39-4.3 2.37V7.33H8.88V22h3.33v-7.27c0-1.92.36-3.78 2.74-3.78 2.34 0 2.37 2.19 2.37 3.9V22H22v-8.4Z" />
    </Icon>
  );
}

function Discord() {
  return (
    <Icon>
      <path d="M19.54 5.34A16.6 16.6 0 0 0 15.44 4l-.5 1.02a15.13 15.13 0 0 0-5.87 0L8.55 4c-1.43.25-2.8.7-4.09 1.34C1.87 9.17 1.17 12.9 1.52 16.57a16.8 16.8 0 0 0 5.03 2.54l1.22-1.67a10.8 10.8 0 0 1-1.91-.92l.47-.36c3.69 1.7 7.69 1.7 11.33 0l.47.36c-.62.37-1.26.68-1.92.92l1.22 1.67a16.72 16.72 0 0 0 5.04-2.54c.41-4.25-.7-7.95-2.93-11.23ZM8.52 14.3c-1.11 0-2.02-1.02-2.02-2.27s.89-2.28 2.02-2.28c1.14 0 2.04 1.03 2.02 2.28 0 1.25-.89 2.27-2.02 2.27Zm6.96 0c-1.11 0-2.02-1.02-2.02-2.27s.89-2.28 2.02-2.28c1.14 0 2.04 1.03 2.02 2.28 0 1.25-.88 2.27-2.02 2.27Z" />
    </Icon>
  );
}

function Instagram() {
  return (
    <Icon>
      <path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm0 1.8a3.4 3.4 0 0 0-3.4 3.4v9.6a3.4 3.4 0 0 0 3.4 3.4h9.6a3.4 3.4 0 0 0 3.4-3.4V7.2a3.4 3.4 0 0 0-3.4-3.4H7.2Zm10.05 1.35a1.22 1.22 0 1 1 0 2.44 1.22 1.22 0 0 1 0-2.44ZM12 6.86A5.14 5.14 0 1 1 12 17.14 5.14 5.14 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 12 15.34 3.34 3.34 0 0 0 12 8.66Z" />
    </Icon>
  );
}