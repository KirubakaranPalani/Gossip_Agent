import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.kirubakaran.gossipagent",
  appName: "NewsScope",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
