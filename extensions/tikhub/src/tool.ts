import { Type, type Static } from "@sinclair/typebox";
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";

const TIKHUB_BASE_URL_DEFAULT = "https://api.tikhub.io";
const TIKHUB_BASE_URL_CN = "https://api.tikhub.dev";

function resolveApiKey(api: OpenClawPluginApi): string | null {
  const envKey = process.env.TIKHUB_API_KEY?.trim();
  if (envKey) return envKey;
  const entries = api.config?.skills?.entries as
    | Record<string, { apiKey?: string; env?: Record<string, string> }>
    | undefined;
  const tikhub = entries?.tikhub;
  if (tikhub?.apiKey?.trim()) return tikhub.apiKey.trim();
  if (tikhub?.env?.TIKHUB_API_KEY?.trim()) return tikhub.env.TIKHUB_API_KEY.trim();
  return null;
}

function resolveBaseUrl(): string {
  const env = process.env.TIKHUB_BASE_URL?.trim();
  if (env) return env.endsWith("/") ? env.slice(0, -1) : env;
  return TIKHUB_BASE_URL_DEFAULT;
}

export const TikHubRequestSchema = Type.Object(
  {
    method: Type.Optional(
      Type.String({
        description: "HTTP method: GET or POST (default GET)",
      }),
    ),
    path: Type.String({
      description:
        "API path without base URL, e.g. /api/v1/tiktok/web/fetch_one_video_by_url or /api/v1/douyin/web/fetch_one_video_by_url",
    }),
    query: Type.Optional(
      Type.String({
        description:
          'Query parameters as JSON object string, e.g. {"url":"https://www.tiktok.com/..."}',
      }),
    ),
    body: Type.Optional(
      Type.String({
        description: "Request body for POST (JSON string if applicable)",
      }),
    ),
  },
  { additionalProperties: false },
);

export type TikHubRequestParams = Static<typeof TikHubRequestSchema>;

function jsonResult(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    details: data,
  };
}

export function registerTikHubTool(api: OpenClawPluginApi) {
  const apiKey = resolveApiKey(api);
  if (!apiKey) {
    api.logger.debug?.("tikhub: TIKHUB_API_KEY not set, skipping tikhub_request tool");
    return;
  }

  const baseUrl = resolveBaseUrl();

  api.registerTool(
    {
      name: "tikhub_request",
      label: "TikHub API",
      description:
        "Call TikHub API for TikTok, Douyin, Xiaohongshu, Bilibili, Instagram, YouTube, Twitter, etc. " +
        "Requires path (e.g. /api/v1/tiktok/web/fetch_one_video_by_url) and optional query/body. " +
        "See TikHub docs: https://docs.tikhub.io and Swagger: https://api.tikhub.io",
      parameters: TikHubRequestSchema,
      async execute(_toolCallId, params) {
        const p = params as TikHubRequestParams;
        const method = (p.method ?? "GET").toUpperCase();
        const path = p.path.startsWith("/") ? p.path : `/${p.path}`;
        let url = `${baseUrl}${path}`;

        if (p.query?.trim()) {
          try {
            const parsed = JSON.parse(p.query) as Record<string, string | number | boolean>;
            const search = new URLSearchParams();
            for (const [k, v] of Object.entries(parsed)) {
              search.set(k, String(v));
            }
            url += `?${search.toString()}`;
          } catch {
            return jsonResult({ error: "query must be a valid JSON object string" });
          }
        }

        const headers: Record<string, string> = {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        };

        const init: RequestInit = { method, headers };
        if (method === "POST" && p.body?.trim()) {
          init.body = p.body.trim();
        }

        try {
          const res = await fetch(url, init);
          const text = await res.text();
          let data: unknown;
          try {
            data = JSON.parse(text);
          } catch {
            data = { raw: text, status: res.status };
          }
          if (!res.ok) {
            return jsonResult({
              error: `TikHub API ${res.status}`,
              status: res.status,
              body: data,
            });
          }
          return jsonResult(data);
        } catch (err) {
          return jsonResult({
            error: err instanceof Error ? err.message : String(err),
          });
        }
      },
    },
    { name: "tikhub_request" },
  );

  api.logger.info?.("tikhub: Registered tikhub_request tool");
}
