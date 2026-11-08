import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";

export default defineConfig({
  site: "https://xaspi7.github.io",
  base: "/truhlar-breznovsky-cms-test",
  integrations: [
    tailwind(),
    alpinejs(),
  ],
});
