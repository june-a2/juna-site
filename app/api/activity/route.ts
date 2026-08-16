import { NextResponse } from "next/server";

type GithubDay = {
  date: string;
  contributionCount: number;
};

type GithubWeek = {
  contributionDays: GithubDay[];
};

type GithubRepo = {
  name: string;
  url: string;
  pushedAt: string | null;
  isPrivate: boolean;
};

type GithubResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: GithubWeek[];
        };
      };

      repositories: {
        nodes: GithubRepo[];
      };
    };
  };

  errors?: {
    message: string;
  }[];
};

type SteamGame = {
  appid: number;
  name: string;
  playtime_2weeks?: number;
  playtime_forever?: number;
  rtime_last_played?: number;
};

type SteamResponse = {
  response?: {
    total_count?: number;
    games?: SteamGame[];
  };
};

function hours(minutes = 0) {
  return Math.round(
    (minutes / 60) * 10,
  ) / 10;
}

async function github() {
  const username =
    process.env.GITHUB_USERNAME;

  const token =
    process.env.GITHUB_TOKEN;

  if (!username || !token) {
    return {
      configured: false,
      username:
        username ?? null,

      total: 0,
      days: [],
      recentRepo: null,
    };
  }

  const to = new Date();
  const from = new Date();

  from.setDate(
    from.getDate() - 364,
  );

  const query = `
    query Activity(
      $login: String!
      $from: DateTime!
      $to: DateTime!
    ) {
      user(login: $login) {
        contributionsCollection(
          from: $from
          to: $to
        ) {
          contributionCalendar {
            totalContributions

            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }

        repositories(
          first: 1
          ownerAffiliations: OWNER
          orderBy: {
            field: PUSHED_AT
            direction: DESC
          }
        ) {
          nodes {
            name
            url
            pushedAt
            isPrivate
          }
        }
      }
    }
  `;

  const response =
    await fetch(
      "https://api.github.com/graphql",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "application/json",

          "User-Agent":
            "juna-site",
        },

        body: JSON.stringify({
          query,

          variables: {
            login: username,
            from:
              from.toISOString(),
            to:
              to.toISOString(),
          },
        }),

        cache: "no-store",
      },
    );

  if (!response.ok) {
    const text =
      await response.text();

    throw new Error(
      `GitHub request failed: ${response.status} ${text}`,
    );
  }

  const json =
    (await response.json()) as GithubResponse;

  if (json.errors?.length) {
    throw new Error(
      json.errors
        .map(
          (error) =>
            error.message,
        )
        .join(", "),
    );
  }

  const user =
    json.data?.user;

  if (!user) {
    throw new Error(
      "GitHub user not found.",
    );
  }

  const calendar =
    user
      .contributionsCollection
      .contributionCalendar;

  return {
    configured: true,
    username,

    total:
      calendar.totalContributions,

    days:
      calendar.weeks.flatMap(
        (week) =>
          week.contributionDays,
      ),

    recentRepo:
      user.repositories
        .nodes[0] ?? null,
  };
}

async function steam() {
  const key =
    process.env.STEAM_API_KEY;

  const steamId =
    process.env.STEAM_ID;

  const publicActivity =
    process.env
      .STEAM_ACTIVITY_PUBLIC ===
    "true";

  if (!key || !steamId) {
    return {
      configured: false,
      private: false,
      games: [],
    };
  }

  if (!publicActivity) {
    return {
      configured: true,
      private: true,
      games: [],
    };
  }

  const params =
    new URLSearchParams({
      key,
      steamid: steamId,
      count: "5",
      format: "json",
    });

  const response =
    await fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",

        headers: {
          Accept:
            "application/json",
        },
      },
    );

  if (!response.ok) {
    const text =
      await response.text();

    throw new Error(
      `Steam request failed: ${response.status} ${text}`,
    );
  }

  const json =
    (await response.json()) as SteamResponse;

  const games =
    json.response?.games ?? [];

  return {
    configured: true,
    private: false,

    total:
      json.response
        ?.total_count ??
      games.length,

    games: games.map(
      (game) => ({
        id: game.appid,

        name:
          game.name,

        recentHours:
          hours(
            game.playtime_2weeks,
          ),

        totalHours:
          hours(
            game.playtime_forever,
          ),

        lastPlayed:
          game.rtime_last_played
            ? new Date(
                game.rtime_last_played *
                  1000,
              ).toISOString()
            : null,

        image:
          `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
      }),
    ),
  };
}

export async function GET() {
  const [
    githubResult,
    steamResult,
  ] =
    await Promise.allSettled([
      github(),
      steam(),
    ]);

  return NextResponse.json({
    github:
      githubResult.status ===
      "fulfilled"
        ? githubResult.value
        : {
            configured: true,

            error:
              githubResult.reason instanceof
              Error
                ? githubResult
                    .reason.message
                : "GitHub unavailable.",

            total: 0,
            days: [],
            recentRepo: null,
          },

    steam:
      steamResult.status ===
      "fulfilled"
        ? steamResult.value
        : {
            configured: true,
            private: false,

            error:
              steamResult.reason instanceof
              Error
                ? steamResult
                    .reason.message
                : "Steam unavailable.",

            games: [],
          },

    checkedAt:
      new Date().toISOString(),
  });
}