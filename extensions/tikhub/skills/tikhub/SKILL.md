---
name: tikhub
description: "Call TikHub API for TikTok, Douyin, Xiaohongshu, Bilibili, Instagram, YouTube, Twitter and other social media data. Use when: user asks for TikTok/Douyin video info, user profile, comments, or any data from TikHub-supported platforms. Requires TIKHUB_API_KEY. NOT for: general web search or non-TikHub sources."
metadata: { "openclaw": { "emoji": "📱" } }
---

# TikHub API Skill

Use the **tikhub_request** tool to call [TikHub](https://www.tikhub.io/) API for social media data (TikTok, Douyin, Xiaohongshu, Bilibili, Instagram, YouTube, Twitter, etc.).

## When to Use

✅ **USE this skill when:**

- User asks for TikTok/Douyin video details by link or ID
- User wants creator/profile data from TikTok, Douyin, or other supported platforms
- User needs comments, statistics, or metadata from TikHub-supported platforms
- Any query that matches [TikHub API capabilities](https://docs.tikhub.io/) (Swagger: https://api.tikhub.io)

## When NOT to Use

❌ **DON'T use for:**

- General web search → use `web_search` or `web_fetch`
- Data from platforms not supported by TikHub
- Actions that don’t require TikHub (e.g. local file or other APIs)

## Setup

1. Get an API token from [TikHub User Dashboard](https://user.tikhub.io/) → API token.
2. Set the key for OpenClaw:
   - **Env (recommended):** `export TIKHUB_API_KEY="your_token"` or add to `~/.openclaw/.env`.
   - **Config:** In `~/.openclaw/openclaw.json` under `skills.entries.tikhub` set `apiKey` or `env.TIKHUB_API_KEY`.
3. Install the plugin: `openclaw plugins install @openclaw/tikhub` (or from repo: `openclaw plugins install ./extensions/tikhub`).

**Mainland China:** Set `TIKHUB_BASE_URL=https://api.tikhub.dev` so requests use the China acceleration domain.

## Tool: tikhub_request

- **method**: `GET` (default) or `POST`
- **path**: API path without base URL (e.g. `/api/v1/tiktok/web/fetch_one_video_by_url`)
- **query**: Optional. JSON object string for query parameters, e.g. `{"url":"https://www.tiktok.com/@user/video/123"}`
- **body**: Optional. Request body for POST (JSON string if applicable)

## Example Paths (see [TikHub Swagger](https://api.tikhub.io) for full list)

### TikTok

- Get single video by share URL: path `/api/v1/tiktok/web/fetch_one_video_by_url`, query `{"url": "https://www.tiktok.com/@username/video/1234567890"}`
- User videos: path `/api/v1/tiktok/web/fetch_user_videos`, query with `unique_id` or `sec_uid`, `count`, `cursor` as needed

### Douyin

- Get single video by URL: path `/api/v1/douyin/web/fetch_one_video_by_url`, query `{"url": "https://v.douyin.com/..."}`

### Other platforms

- Use Swagger UI to find the exact path and parameters for Xiaohongshu, Bilibili, Instagram, YouTube, Twitter, etc.

## Quick Examples

**"Get info for this TikTok link: https://www.tiktok.com/@x/video/123"**

- path: `/api/v1/tiktok/web/fetch_one_video_by_url`
- query: `{"url": "https://www.tiktok.com/@x/video/123"}`

**"Get Douyin video by this share link"**

- path: `/api/v1/douyin/web/fetch_one_video_by_url`
- query: `{"url": "<user's Douyin share link>"}`

## Notes

- API token must be kept secret; use env or config, never paste in chat.
- Rate limits and pricing depend on your [TikHub plan](https://www.tikhub.io/).
- HTTP 401 → check API token. 403 → permissions or account. 402 → insufficient balance.
