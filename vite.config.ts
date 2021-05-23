import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";
import ViteFonts from "vite-plugin-fonts";
import ViteComponents from "vite-plugin-components";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    ViteComponents({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons(),
    ViteFonts({
      google: {
        families: [
          {
            name: "JetBrains Mono",
            styles: "wght@300;400;500;600;700;800",
            defer: true,
          },
        ],
        display: "swap",
      },
    }),
  ],
});
