import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk";
import { registerTikHubTool } from "./src/tool.js";

const plugin = {
  id: "tikhub",
  name: "TikHub",
  description: "TikHub API tool for TikTok, Douyin, and other social media data",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    registerTikHubTool(api);
  },
};

export default plugin;
