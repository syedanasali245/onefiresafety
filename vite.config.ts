import { defineConfig, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { PRODUCTS } from "./src/lib/products";

/** Writes public/sitemap.xml at build time (static hosts cannot run server routes). */
function sitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    buildStart() {
      const paths = [
        "/",
        "/about",
        "/services",
        "/products",
        "/downloads",
        "/faqs",
        "/offices",
        "/contact",
        ...PRODUCTS.map((p) => `/products/${p.slug}`),
      ];
      const urls = paths
        .map((p) => `  <url><loc>${p}</loc><changefreq>weekly</changefreq></url>`)
        .join("\n");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
      writeFileSync(join(process.cwd(), "public", "sitemap.xml"), xml, "utf-8");
    },
  };
}

const productPages = PRODUCTS.map((p) => ({
  path: `/products/${p.slug}`,
  prerender: { enabled: true as const },
}));

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
      pages: productPages,
    }),
    sitemapPlugin(),
    tailwindcss(),
    tsconfigPaths(),
    viteReact(),
  ],
});
