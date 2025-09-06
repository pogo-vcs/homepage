// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Pogo",
      tagline:
        "A centralized version control system that is simple and easy to use",
      logo: {
        src: "./src/assets/logo.svg",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/pogo-vcs/pogo",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "index" },
            { label: "Installation", slug: "guides/installation" },
            { label: "Quick Start", slug: "guides/getting-started" },
          ],
        },
        {
          label: "Core Concepts",
          items: [
            { label: "Overview", slug: "concepts/overview" },
            { label: "Changes", slug: "concepts/changes" },
            { label: "Bookmarks", slug: "concepts/bookmarks" },
            { label: "Conflicts", slug: "concepts/conflicts" },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Basic Workflow", slug: "guides/basic-workflow" },
            { label: "Server Setup", slug: "guides/server-setup" },
            { label: "Authentication", slug: "guides/authentication" },
          ],
        },
        {
          label: "Command Reference",
          items: [
            { label: "All Commands", slug: "reference/commands" },
            { label: "bookmark", slug: "reference/bookmark" },
            { label: "commit", slug: "reference/commit" },
            { label: "describe", slug: "reference/describe" },
            { label: "edit", slug: "reference/edit" },
            { label: "gc", slug: "reference/gc" },
            { label: "info", slug: "reference/info" },
            { label: "init", slug: "reference/init" },
            { label: "log", slug: "reference/log" },
            { label: "new", slug: "reference/new" },
            { label: "push", slug: "reference/push" },
            { label: "rm", slug: "reference/rm" },
            { label: "serve", slug: "reference/serve" },
            { label: "token", slug: "reference/token" },
            { label: "whoami", slug: "reference/whoami" },
          ],
        },
        {
          label: "Architecture",
          items: [
            { label: "System Design", slug: "architecture/design" },
            {
              label: "Garbage Collection",
              slug: "architecture/garbage-collection",
            },
          ],
        },
      ],
    }),
  ],
  markdown: {
    rehypePlugins: [[rehypeMermaid, { strategy: "img-svg", dark: true }]],
  },
});
