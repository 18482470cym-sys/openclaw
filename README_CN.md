# 🦞 OpenClaw — 个人 AI 助手

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text-dark.png">
        <img src="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text.png" alt="OpenClaw" width="500">
    </picture>
</p>

<p align="center">
  <strong>EXFOLIATE! EXFOLIATE!</strong>
</p>

<p align="center">
  <a href="https://github.com/openclaw/openclaw/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/openclaw/openclaw/ci.yml?branch=main&style=for-the-badge" alt="CI status"></a>
  <a href="https://github.com/openclaw/openclaw/releases"><img src="https://img.shields.io/github/v/release/openclaw/openclaw?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

**OpenClaw** 是一款你在自己设备上运行的**个人 AI 助手**。它通过你已在使用的渠道（WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、BlueBubbles、IRC、Microsoft Teams、Matrix、飞书、LINE、Mattermost、Nextcloud Talk、Nostr、Synology Chat、Tlon、Twitch、Zalo、Zalo Personal、WebChat）与你对话，支持 macOS/iOS/Android 语音输入与输出，并可渲染由你控制的实时 Canvas。Gateway 只是控制面，产品本质是助手本身。

如果你想要一个私有的、单用户的、本地感强、快速、常驻的助手，选它就对了。

[官网](https://openclaw.ai) · [文档](https://docs.openclaw.ai) · [愿景](VISION.md) · [DeepWiki](https://deepwiki.com/openclaw/openclaw) · [入门](https://docs.openclaw.ai/start/getting-started) · [更新](https://docs.openclaw.ai/install/updating) · [展示](https://docs.openclaw.ai/start/showcase) · [FAQ](https://docs.openclaw.ai/help/faq) · [向导](https://docs.openclaw.ai/start/wizard) · [Nix](https://github.com/openclaw/nix-openclaw) · [Docker](https://docs.openclaw.ai/install/docker) · [Discord](https://discord.gg/clawd)

推荐方式：在终端中运行入门向导（`openclaw onboard`）。向导会一步步带你完成 Gateway、工作区、渠道和技能配置。CLI 向导是推荐路径，支持 **macOS、Linux 和 Windows（通过 WSL2；强烈推荐）**。支持 npm、pnpm 或 bun。首次安装？从这里开始：[入门](https://docs.openclaw.ai/start/getting-started)

## 赞助方

| OpenAI                                                            | Vercel                                                            | Blacksmith                                                                   | Convex                                                                |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [![OpenAI](docs/assets/sponsors/openai.svg)](https://openai.com/) | [![Vercel](docs/assets/sponsors/vercel.svg)](https://vercel.com/) | [![Blacksmith](docs/assets/sponsors/blacksmith.svg)](https://blacksmith.sh/) | [![Convex](docs/assets/sponsors/convex.svg)](https://www.convex.dev/) |

**订阅（OAuth）：**

- **[OpenAI](https://openai.com/)**（ChatGPT/Codex）

模型说明：虽然支持多种提供商与模型，为获得最佳体验并降低提示注入风险，建议使用你可用的最强最新一代模型。参见 [入门](https://docs.openclaw.ai/start/onboarding)。

## 模型（选择与认证）

- 模型配置与 CLI：[模型](https://docs.openclaw.ai/concepts/models)
- 认证配置轮换（OAuth 与 API Key）与回退：[模型故障转移](https://docs.openclaw.ai/concepts/model-failover)

## 安装（推荐）

运行环境：**Node ≥22**。

```bash
npm install -g openclaw@latest
# 或：pnpm add -g openclaw@latest

openclaw onboard --install-daemon
```

向导会安装 Gateway 守护进程（launchd/systemd 用户服务），使其持续运行。

## 快速开始（TL;DR）

运行环境：**Node ≥22**。

完整入门（认证、配对、渠道）：[入门](https://docs.openclaw.ai/start/getting-started)

```bash
openclaw onboard --install-daemon

openclaw gateway --port 18789 --verbose

# 发送消息
openclaw message send --to +1234567890 --message "Hello from OpenClaw"

# 与助手对话（可选将回复发往任意已连接渠道：WhatsApp/Telegram/Slack/Discord/Google Chat/Signal/iMessage/BlueBubbles/IRC/Microsoft Teams/Matrix/飞书/LINE/Mattermost/Nextcloud Talk/Nostr/Synology Chat/Tlon/Twitch/Zalo/Zalo Personal/WebChat）
openclaw agent --message "Ship checklist" --thinking high
```

升级？参见 [更新指南](https://docs.openclaw.ai/install/updating)（并执行 `openclaw doctor`）。

## 发布渠道

- **stable**：带标签的正式版（`vYYYY.M.D` 或 `vYYYY.M.D-<patch>`），npm dist-tag 为 `latest`。
- **beta**：预发布标签（`vYYYY.M.D-beta.N`），npm dist-tag 为 `beta`（可能无 macOS 应用）。
- **dev**：`main` 分支最新提交，npm dist-tag 为 `dev`（若已发布）。

切换渠道（git + npm）：`openclaw update --channel stable|beta|dev`。详见 [发布渠道](https://docs.openclaw.ai/install/development-channels)。

## 从源码运行（开发）

从源码构建推荐使用 `pnpm`。Bun 可用于直接运行 TypeScript。

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw

pnpm install
pnpm ui:build # 首次运行会自动安装 UI 依赖
pnpm build

pnpm openclaw onboard --install-daemon

# 开发循环（TypeScript 变更时自动重载）
pnpm gateway:watch
```

说明：`pnpm openclaw ...` 通过 tsx 直接运行 TypeScript。`pnpm build` 会生成 `dist/`，供 Node 或打包后的 `openclaw` 二进制使用。

## 安全默认（私信访问）

OpenClaw 会连接真实通讯渠道，请将收到的私信视为**不可信输入**。

完整安全说明：[安全](https://docs.openclaw.ai/gateway/security)

在 Telegram/WhatsApp/Signal/iMessage/Microsoft Teams/Discord/Google Chat/Slack 上的默认行为：

- **私信配对**（`dmPolicy="pairing"` / `channels.discord.dmPolicy="pairing"` / `channels.slack.dmPolicy="pairing"`；旧配置：`channels.discord.dm.policy`、`channels.slack.dm.policy`）：未知发件人会收到简短配对码，机器人不会处理其消息。
- 批准方式：`openclaw pairing approve <channel> <code>`（随后发件人会被加入本地允许列表）。
- 若要允许所有人私信，需显式开启：设置 `dmPolicy="open"` 并在渠道允许列表（`allowFrom` / `channels.discord.allowFrom` / `channels.slack.allowFrom`；旧配置：`channels.discord.dm.allowFrom`、`channels.slack.dm.allowFrom`）中包含 `"*"`。

运行 `openclaw doctor` 可检查存在风险的私信策略或错误配置。

## 功能概览

- **[本地优先 Gateway](https://docs.openclaw.ai/gateway)** — 会话、渠道、工具与事件的统一控制面。
- **[多渠道收件箱](https://docs.openclaw.ai/channels)** — WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、BlueBubbles（iMessage）、iMessage（旧版）、IRC、Microsoft Teams、Matrix、飞书、LINE、Mattermost、Nextcloud Talk、Nostr、Synology Chat、Tlon、Twitch、Zalo、Zalo Personal、WebChat、macOS、iOS/Android。
- **[多智能体路由](https://docs.openclaw.ai/gateway/configuration)** — 将不同渠道/账号/会话路由到隔离的智能体（工作区 + 每智能体会话）。
- **[Voice Wake](https://docs.openclaw.ai/nodes/voicewake) + [Talk 模式](https://docs.openclaw.ai/nodes/talk)** — macOS/iOS 唤醒词与 Android 连续语音（ElevenLabs + 系统 TTS 回退）。
- **[实时 Canvas](https://docs.openclaw.ai/platforms/mac/canvas)** — 由智能体驱动的可视化工作区，支持 [A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)。
- **[一等工具](https://docs.openclaw.ai/tools)** — 浏览器、Canvas、节点、cron、会话及 Discord/Slack 操作。
- **[配套应用](https://docs.openclaw.ai/platforms/macos)** — macOS 菜单栏应用 + iOS/Android [节点](https://docs.openclaw.ai/nodes)。
- **[入门向导](https://docs.openclaw.ai/start/wizard) + [技能](https://docs.openclaw.ai/tools/skills)** — 向导式配置，支持内置/托管/工作区技能。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw&type=date&legend=top-left)](https://www.star-history.com/#openclaw/openclaw&type=date&legend=top-left)

## 目前已实现

### 核心平台

- [Gateway WebSocket 控制面](https://docs.openclaw.ai/gateway)：会话、在线状态、配置、cron、Webhook、[Control UI](https://docs.openclaw.ai/web) 与 [Canvas 宿主](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)。
- [CLI 入口](https://docs.openclaw.ai/tools/agent-send)：gateway、agent、send、[向导](https://docs.openclaw.ai/start/wizard)、[doctor](https://docs.openclaw.ai/gateway/doctor)。
- [Pi 智能体运行时](https://docs.openclaw.ai/concepts/agent)（RPC 模式），支持工具流与分块流。
- [会话模型](https://docs.openclaw.ai/concepts/session)：`main` 用于私聊、群组隔离、激活模式、队列模式、回信。群组规则：[群组](https://docs.openclaw.ai/channels/groups)。
- [媒体管道](https://docs.openclaw.ai/nodes/images)：图片/音频/视频、转录钩子、大小限制、临时文件生命周期。音频详见 [音频](https://docs.openclaw.ai/nodes/audio)。

### 渠道

- [渠道](https://docs.openclaw.ai/channels)：[WhatsApp](https://docs.openclaw.ai/channels/whatsapp)（Baileys）、[Telegram](https://docs.openclaw.ai/channels/telegram)（grammY）、[Slack](https://docs.openclaw.ai/channels/slack)（Bolt）、[Discord](https://docs.openclaw.ai/channels/discord)（discord.js）、[Google Chat](https://docs.openclaw.ai/channels/googlechat)、[Signal](https://docs.openclaw.ai/channels/signal)（signal-cli）、[BlueBubbles](https://docs.openclaw.ai/channels/bluebubbles)（iMessage，推荐）、[iMessage](https://docs.openclaw.ai/channels/imessage)（旧版 imsg）、[IRC](https://docs.openclaw.ai/channels/irc)、[Microsoft Teams](https://docs.openclaw.ai/channels/msteams)、[Matrix](https://docs.openclaw.ai/channels/matrix)、[飞书](https://docs.openclaw.ai/channels/feishu)、[LINE](https://docs.openclaw.ai/channels/line)、[Mattermost](https://docs.openclaw.ai/channels/mattermost)、[Nextcloud Talk](https://docs.openclaw.ai/channels/nextcloud-talk)、[Nostr](https://docs.openclaw.ai/channels/nostr)、[Synology Chat](https://docs.openclaw.ai/channels/synology-chat)、[Tlon](https://docs.openclaw.ai/channels/tlon)、[Twitch](https://docs.openclaw.ai/channels/twitch)、[Zalo](https://docs.openclaw.ai/channels/zalo)、[Zalo Personal](https://docs.openclaw.ai/channels/zalouser)、[WebChat](https://docs.openclaw.ai/web/webchat)。
- [群组路由](https://docs.openclaw.ai/channels/group-messages)：@ 门控、回复标签、每渠道分块与路由。渠道规则：[渠道](https://docs.openclaw.ai/channels)。

### 应用与节点

- [macOS 应用](https://docs.openclaw.ai/platforms/macos)：菜单栏控制面、[Voice Wake](https://docs.openclaw.ai/nodes/voicewake)/PTT、[Talk 模式](https://docs.openclaw.ai/nodes/talk) 浮层、[WebChat](https://docs.openclaw.ai/web/webchat)、调试工具、[远程 Gateway](https://docs.openclaw.ai/gateway/remote) 控制。
- [iOS 节点](https://docs.openclaw.ai/platforms/ios)：[Canvas](https://docs.openclaw.ai/platforms/mac/canvas)、[Voice Wake](https://docs.openclaw.ai/nodes/voicewake)、[Talk 模式](https://docs.openclaw.ai/nodes/talk)、相机、录屏、Bonjour + 设备配对。
- [Android 节点](https://docs.openclaw.ai/platforms/android)：连接页（设置码/手动）、聊天会话、语音页、[Canvas](https://docs.openclaw.ai/platforms/mac/canvas)、相机/录屏及 Android 设备命令（通知/位置/短信/照片/联系人/日历/运动/应用更新）。
- [macOS 节点模式](https://docs.openclaw.ai/nodes)：system.run/notify + Canvas/相机暴露。

### 工具与自动化

- [浏览器控制](https://docs.openclaw.ai/tools/browser)：专用 openclaw Chrome/Chromium、快照、操作、上传、配置文件。
- [Canvas](https://docs.openclaw.ai/platforms/mac/canvas)：[A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui) 推送/重置、eval、快照。
- [节点](https://docs.openclaw.ai/nodes)：相机快照/片段、录屏、[location.get](https://docs.openclaw.ai/nodes/location-command)、通知。
- [Cron + 唤醒](https://docs.openclaw.ai/automation/cron-jobs)；[Webhook](https://docs.openclaw.ai/automation/webhook)；[Gmail Pub/Sub](https://docs.openclaw.ai/automation/gmail-pubsub)。
- [技能平台](https://docs.openclaw.ai/tools/skills)：内置、托管与工作区技能，带安装门控与 UI。

### 运行时与安全

- [渠道路由](https://docs.openclaw.ai/channels/channel-routing)、[重试策略](https://docs.openclaw.ai/concepts/retry)、[流式/分块](https://docs.openclaw.ai/concepts/streaming)。
- [在线状态](https://docs.openclaw.ai/concepts/presence)、[输入状态指示](https://docs.openclaw.ai/concepts/typing-indicators)、[用量统计](https://docs.openclaw.ai/concepts/usage-tracking)。
- [模型](https://docs.openclaw.ai/concepts/models)、[模型故障转移](https://docs.openclaw.ai/concepts/model-failover)、[会话裁剪](https://docs.openclaw.ai/concepts/session-pruning)。
- [安全](https://docs.openclaw.ai/gateway/security) 与 [故障排除](https://docs.openclaw.ai/channels/troubleshooting)。

### 运维与打包

- [Control UI](https://docs.openclaw.ai/web) + [WebChat](https://docs.openclaw.ai/web/webchat) 由 Gateway 直接提供。
- [Tailscale Serve/Funnel](https://docs.openclaw.ai/gateway/tailscale) 或 [SSH 隧道](https://docs.openclaw.ai/gateway/remote)，支持令牌/密码认证。
- [Nix 模式](https://docs.openclaw.ai/install/nix) 声明式配置；基于 [Docker](https://docs.openclaw.ai/install/docker) 的安装。
- [Doctor](https://docs.openclaw.ai/gateway/doctor) 迁移、[日志](https://docs.openclaw.ai/logging)。

## 工作原理（简述）

```
WhatsApp / Telegram / Slack / Discord / Google Chat / Signal / iMessage / BlueBubbles / IRC / Microsoft Teams / Matrix / 飞书 / LINE / Mattermost / Nextcloud Talk / Nostr / Synology Chat / Tlon / Twitch / Zalo / Zalo Personal / WebChat
               │
               ▼
┌───────────────────────────────┐
│            Gateway            │
│       （控制面）               │
│     ws://127.0.0.1:18789      │
└──────────────┬────────────────┘
               │
               ├─ Pi 智能体（RPC）
               ├─ CLI（openclaw …）
               ├─ WebChat UI
               ├─ macOS 应用
               └─ iOS / Android 节点
```

## 主要子系统

- **[Gateway WebSocket 网络](https://docs.openclaw.ai/concepts/architecture)** — 面向客户端、工具与事件的单一 WS 控制面（运维：[Gateway 手册](https://docs.openclaw.ai/gateway)）。
- **[Tailscale 暴露](https://docs.openclaw.ai/gateway/tailscale)** — Gateway 仪表盘与 WS 的 Serve/Funnel（远程访问：[远程](https://docs.openclaw.ai/gateway/remote)）。
- **[浏览器控制](https://docs.openclaw.ai/tools/browser)** — openclaw 管理的 Chrome/Chromium，CDP 控制。
- **[Canvas + A2UI](https://docs.openclaw.ai/platforms/mac/canvas)** — 智能体驱动的可视化工作区（A2UI 宿主：[Canvas/A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)）。
- **[Voice Wake](https://docs.openclaw.ai/nodes/voicewake) + [Talk 模式](https://docs.openclaw.ai/nodes/talk)** — macOS/iOS 唤醒词与 Android 连续语音。
- **[节点](https://docs.openclaw.ai/nodes)** — Canvas、相机快照/片段、录屏、`location.get`、通知，以及仅 macOS 的 `system.run`/`system.notify`。

## Tailscale 访问（Gateway 仪表盘）

OpenClaw 可在 Gateway 仍绑定 loopback 时自动配置 Tailscale **Serve**（仅尾网）或 **Funnel**（公网）。通过 `gateway.tailscale.mode` 配置：

- `off`：不启用 Tailscale 自动化（默认）。
- `serve`：通过 `tailscale serve` 的仅尾网 HTTPS（默认使用 Tailscale 身份头）。
- `funnel`：通过 `tailscale funnel` 的公网 HTTPS（需配置共享密码认证）。

说明：

- 启用 Serve/Funnel 时 `gateway.bind` 必须保持 `loopback`（OpenClaw 会强制）。
- 可通过设置 `gateway.auth.mode: "password"` 或 `gateway.auth.allowTailscale: false` 强制 Serve 使用密码。
- Funnel 在未设置 `gateway.auth.mode: "password"` 时拒绝启动。
- 可选：`gateway.tailscale.resetOnExit` 在退出时撤销 Serve/Funnel。

详见 [Tailscale 指南](https://docs.openclaw.ai/gateway/tailscale) · [Web 界面](https://docs.openclaw.ai/web)

## 远程 Gateway（Linux 很适合）

在小型 Linux 实例上运行 Gateway 完全可行。客户端（macOS 应用、CLI、WebChat）可通过 **Tailscale Serve/Funnel** 或 **SSH 隧道**连接，你仍可配对设备节点（macOS/iOS/Android）以在需要时执行设备本地操作。

- **Gateway 主机** 默认执行 exec 工具与渠道连接。
- **设备节点** 通过 `node.invoke` 执行设备本地操作（`system.run`、相机、录屏、通知）。简言之：exec 在 Gateway 所在机器运行；设备操作在设备所在机器运行。

详见 [远程访问](https://docs.openclaw.ai/gateway/remote) · [节点](https://docs.openclaw.ai/nodes) · [安全](https://docs.openclaw.ai/gateway/security)

## 通过 Gateway 协议的 macOS 权限

macOS 应用可以**节点模式**运行，并通过 Gateway WebSocket（`node.list` / `node.describe`）公布能力与权限映射。客户端随后可通过 `node.invoke` 执行本地操作：

- `system.run` 执行本地命令并返回 stdout/stderr/退出码；设置 `needsScreenRecording: true` 可要求录屏权限（否则会得到 `PERMISSION_MISSING`）。
- `system.notify` 发送用户通知，若拒绝通知则失败。
- `canvas.*`、`camera.*`、`screen.record` 和 `location.get` 也通过 `node.invoke` 路由，并遵循 TCC 权限状态。

提升级 bash（主机权限）与 macOS TCC 是分开的：

- 使用 `/elevated on|off` 在启用且加入允许列表时切换每会话提升权限。
- Gateway 通过 `sessions.patch`（WS 方法）持久化该每会话开关，以及 `thinkingLevel`、`verboseLevel`、`model`、`sendPolicy`、`groupActivation`。

详见 [节点](https://docs.openclaw.ai/nodes) · [macOS 应用](https://docs.openclaw.ai/platforms/macos) · [Gateway 协议](https://docs.openclaw.ai/concepts/architecture)

## 智能体到智能体（sessions\_\* 工具）

用于在会话之间协调工作，而无需在不同聊天界面间切换。

- `sessions_list` — 发现活跃会话（智能体）及其元数据。
- `sessions_history` — 获取某会话的 transcript 日志。
- `sessions_send` — 向另一会话发消息；可选回信乒乓与公告步骤（`REPLY_SKIP`、`ANNOUNCE_SKIP`）。

详见 [会话工具](https://docs.openclaw.ai/concepts/session-tool)

## 技能注册表（ClawHub）

ClawHub 是轻量技能注册表。启用后，智能体可自动搜索技能并按需拉取新技能。

[ClawHub](https://clawhub.com)

## 聊天命令

在 WhatsApp/Telegram/Slack/Google Chat/Microsoft Teams/WebChat 中发送（群组命令仅所有者可用）：

- `/status` — 简明会话状态（模型 + token、有则显示费用）
- `/new` 或 `/reset` — 重置会话
- `/compact` — 压缩会话上下文（摘要）
- `/think <level>` — off|minimal|low|medium|high|xhigh（仅 GPT-5.2 + Codex 模型）
- `/verbose on|off`
- `/usage off|tokens|full` — 每次回复的用量脚注
- `/restart` — 重启 Gateway（群组中仅所有者）
- `/activation mention|always` — 群组激活开关（仅群组）

## 应用（可选）

仅 Gateway 即可提供完整体验。所有应用均为可选，用于增强功能。

若计划构建/运行配套应用，请按下列平台手册操作。

### macOS（OpenClaw.app）（可选）

- 菜单栏中控制 Gateway 与健康状态。
- Voice Wake + 按键说话浮层。
- WebChat + 调试工具。
- 通过 SSH 的远程 Gateway 控制。

说明：macOS 权限在多次重建后保持需签名构建（见 `docs/mac/permissions.md`）。

### iOS 节点（可选）

- 通过 Gateway WebSocket 配对为节点（设备配对）。
- 语音触发转发 + Canvas 界面。
- 通过 `openclaw nodes …` 控制。

手册：[iOS 连接](https://docs.openclaw.ai/platforms/ios)。

### Android 节点（可选）

- 通过设备配对（`openclaw devices ...`）以 WS 节点形式配对。
- 提供连接/聊天/语音页及 Canvas、相机、录屏和 Android 设备命令族。
- 手册：[Android 连接](https://docs.openclaw.ai/platforms/android)。

## 智能体工作区与技能

- 工作区根目录：`~/.openclaw/workspace`（可通过 `agents.defaults.workspace` 配置）。
- 注入的提示文件：`AGENTS.md`、`SOUL.md`、`TOOLS.md`。
- 技能：`~/.openclaw/workspace/skills/<skill>/SKILL.md`。

## 配置

最简 `~/.openclaw/openclaw.json`（模型 + 默认）：

```json5
{
  agent: {
    model: "anthropic/claude-opus-4-6",
  },
}
```

[完整配置参考（所有键与示例）](https://docs.openclaw.ai/gateway/configuration)

## 安全模型（重要）

- **默认**：**main** 会话的工具在主机上运行，因此仅你本人使用时智能体拥有完整访问权限。
- **群组/渠道安全**：设置 `agents.defaults.sandbox.mode: "non-main"` 可在每会话 Docker 沙箱中运行**非 main 会话**（群组/渠道）；这些会话的 bash 在 Docker 中运行。
- **沙箱默认**：允许列表为 `bash`、`process`、`read`、`write`、`edit`、`sessions_list`、`sessions_history`、`sessions_send`、`sessions_spawn`；拒绝列表为 `browser`、`canvas`、`nodes`、`cron`、`discord`、`gateway`。

详见 [安全指南](https://docs.openclaw.ai/gateway/security) · [Docker + 沙箱](https://docs.openclaw.ai/install/docker) · [沙箱配置](https://docs.openclaw.ai/gateway/configuration)

### [WhatsApp](https://docs.openclaw.ai/channels/whatsapp)

- 链接设备：`pnpm openclaw channels login`（凭证保存在 `~/.openclaw/credentials`）。
- 通过 `channels.whatsapp.allowFrom` 配置可与助手对话的允许列表。
- 若设置了 `channels.whatsapp.groups`，则作为群组允许列表；包含 `"*"` 表示允许所有群组。

### [Telegram](https://docs.openclaw.ai/channels/telegram)

- 设置 `TELEGRAM_BOT_TOKEN` 或 `channels.telegram.botToken`（环境变量优先）。
- 可选：设置 `channels.telegram.groups`（如 `channels.telegram.groups."*".requireMention`）；设置后作为群组允许列表（包含 `"*"` 表示允许所有）。另可配置 `channels.telegram.allowFrom` 或 `channels.telegram.webhookUrl` + `channels.telegram.webhookSecret`。

```json5
{
  channels: {
    telegram: {
      botToken: "123456:ABCDEF",
    },
  },
}
```

### [Slack](https://docs.openclaw.ai/channels/slack)

- 设置 `SLACK_BOT_TOKEN` + `SLACK_APP_TOKEN`（或 `channels.slack.botToken` + `channels.slack.appToken`）。

### [Discord](https://docs.openclaw.ai/channels/discord)

- 设置 `DISCORD_BOT_TOKEN` 或 `channels.discord.token`（环境变量优先）。
- 可选：配置 `commands.native`、`commands.text` 或 `commands.useAccessGroups`，以及 `channels.discord.allowFrom`、`channels.discord.guilds` 或 `channels.discord.mediaMaxMb`。

```json5
{
  channels: {
    discord: {
      token: "1234abcd",
    },
  },
}
```

### [Signal](https://docs.openclaw.ai/channels/signal)

- 需要 `signal-cli` 与 `channels.signal` 配置段。

### [BlueBubbles（iMessage）](https://docs.openclaw.ai/channels/bluebubbles)

- **推荐**的 iMessage 集成。
- 配置 `channels.bluebubbles.serverUrl` + `channels.bluebubbles.password` 及 Webhook（`channels.bluebubbles.webhookPath`）。
- BlueBubbles 服务运行在 macOS；Gateway 可在 macOS 或其它机器。

### [iMessage（旧版）](https://docs.openclaw.ai/channels/imessage)

- 仅 macOS 的旧集成，通过 `imsg`（需已登录 Messages）。
- 若设置 `channels.imessage.groups`，则作为群组允许列表；包含 `"*"` 表示允许所有群组。

### [Microsoft Teams](https://docs.openclaw.ai/channels/msteams)

- 配置 Teams 应用 + Bot Framework，然后添加 `msteams` 配置段。
- 通过 `msteams.allowFrom` 配置可与助手对话的允许列表；群组访问通过 `msteams.groupAllowFrom` 或 `msteams.groupPolicy: "open"`。

### [WebChat](https://docs.openclaw.ai/web/webchat)

- 使用 Gateway WebSocket；无单独 WebChat 端口/配置。

浏览器控制（可选）：

```json5
{
  browser: {
    enabled: true,
    color: "#FF4500",
  },
}
```

## 文档

在完成入门流程后，需要更深入参考时可使用：

- [从文档索引开始浏览与“哪里有什么”](https://docs.openclaw.ai)
- [阅读 Gateway + 协议模型的架构概览](https://docs.openclaw.ai/concepts/architecture)
- [需要每个配置键与示例时使用完整配置参考](https://docs.openclaw.ai/gateway/configuration)
- [按运维手册运行 Gateway](https://docs.openclaw.ai/gateway)
- [了解 Control UI/Web 界面如何工作及如何安全暴露](https://docs.openclaw.ai/web)
- [理解通过 SSH 隧道或 tailnet 的远程访问](https://docs.openclaw.ai/gateway/remote)
- [按入门向导流程进行引导式配置](https://docs.openclaw.ai/start/wizard)
- [通过 Webhook 界面接入外部触发](https://docs.openclaw.ai/automation/webhook)
- [配置 Gmail Pub/Sub 触发](https://docs.openclaw.ai/automation/gmail-pubsub)
- [了解 macOS 菜单栏配套应用细节](https://docs.openclaw.ai/platforms/mac/menu-bar)
- 平台指南：[Windows (WSL2)](https://docs.openclaw.ai/platforms/windows)、[Linux](https://docs.openclaw.ai/platforms/linux)、[macOS](https://docs.openclaw.ai/platforms/macos)、[iOS](https://docs.openclaw.ai/platforms/ios)、[Android](https://docs.openclaw.ai/platforms/android)
- [用故障排除指南排查常见失败](https://docs.openclaw.ai/channels/troubleshooting)
- [在暴露任何服务前阅读安全说明](https://docs.openclaw.ai/gateway/security)

## 进阶文档（发现与控制）

- [发现与传输](https://docs.openclaw.ai/gateway/discovery)
- [Bonjour/mDNS](https://docs.openclaw.ai/gateway/bonjour)
- [Gateway 配对](https://docs.openclaw.ai/gateway/pairing)
- [远程 Gateway README](https://docs.openclaw.ai/gateway/remote-gateway-readme)
- [Control UI](https://docs.openclaw.ai/web/control-ui)
- [仪表盘](https://docs.openclaw.ai/web/dashboard)

## 运维与故障排除

- [健康检查](https://docs.openclaw.ai/gateway/health)
- [Gateway 锁](https://docs.openclaw.ai/gateway/gateway-lock)
- [后台进程](https://docs.openclaw.ai/gateway/background-process)
- [浏览器故障排除（Linux）](https://docs.openclaw.ai/tools/browser-linux-troubleshooting)
- [日志](https://docs.openclaw.ai/logging)

## 深入阅读

- [智能体循环](https://docs.openclaw.ai/concepts/agent-loop)
- [在线状态](https://docs.openclaw.ai/concepts/presence)
- [TypeBox 模式](https://docs.openclaw.ai/concepts/typebox)
- [RPC 适配器](https://docs.openclaw.ai/reference/rpc)
- [队列](https://docs.openclaw.ai/concepts/queue)

## 工作区与技能

- [技能配置](https://docs.openclaw.ai/tools/skills-config)
- [默认 AGENTS](https://docs.openclaw.ai/reference/AGENTS.default)
- 模板：[AGENTS](https://docs.openclaw.ai/reference/templates/AGENTS)、[BOOTSTRAP](https://docs.openclaw.ai/reference/templates/BOOTSTRAP)、[IDENTITY](https://docs.openclaw.ai/reference/templates/IDENTITY)、[SOUL](https://docs.openclaw.ai/reference/templates/SOUL)、[TOOLS](https://docs.openclaw.ai/reference/templates/TOOLS)、[USER](https://docs.openclaw.ai/reference/templates/USER)

## 平台内部

- [macOS 开发环境](https://docs.openclaw.ai/platforms/mac/dev-setup)
- [macOS 菜单栏](https://docs.openclaw.ai/platforms/mac/menu-bar)
- [macOS 语音唤醒](https://docs.openclaw.ai/platforms/mac/voicewake)
- [iOS 节点](https://docs.openclaw.ai/platforms/ios)
- [Android 节点](https://docs.openclaw.ai/platforms/android)
- [Windows (WSL2)](https://docs.openclaw.ai/platforms/windows)
- [Linux 应用](https://docs.openclaw.ai/platforms/linux)

## 邮件钩子（Gmail）

- [docs.openclaw.ai/gmail-pubsub](https://docs.openclaw.ai/automation/gmail-pubsub)

## Molty

OpenClaw 为 **Molty** 而建，一只太空龙虾 AI 助手。🦞  
作者：Peter Steinberger 与社区。

- [openclaw.ai](https://openclaw.ai)
- [soul.md](https://soul.md)
- [steipete.me](https://steipete.me)
- [@openclaw](https://x.com/openclaw)

## 社区

贡献指南、维护者与 PR 提交方式见 [CONTRIBUTING.md](CONTRIBUTING.md)。  
欢迎 AI/氛围编码的 PR。🤖

特别感谢 [Mario Zechner](https://mariozechner.at/) 的支持与 [pi-mono](https://github.com/badlogic/pi-mono)。  
特别感谢 Adam Doppelt 的 lobster.bot。

感谢所有 clawtributors：详见 [README.md](README.md) 中的贡献者头像列表。
