const DEFAULT_ALLOWED_ORIGINS = ["https://developers.cloudflare.com"];

export function allowedOrigins(value) {
  const entries = value ? value.split(",") : DEFAULT_ALLOWED_ORIGINS;

  return entries
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      try {
        const url = new URL(entry);
        return url.protocol === "https:" ? url.origin : null;
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .filter((origin, index, all) => all.indexOf(origin) === index);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/config") {
      return Response.json(
        { allowedOrigins: allowedOrigins(env.ALLOWED_ORIGINS) },
        {
          headers: {
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff",
          },
        },
      );
    }

    return env.ASSETS.fetch(request);
  },
};
