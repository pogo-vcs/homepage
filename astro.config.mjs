// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import rehypeMermaid from "rehype-mermaid";
import fs from "fs";
import path from "path";

function generateSidebar() {
  const contentDir = path.join(process.cwd(), "src/content/docs");

  // Helper function to create a nice label from filename
  function createLabel(filename) {
    return filename
      .replace(/\.mdx?$/, "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  // Helper function to scan directory and create items
  function scanDirectory(dirPath, relativePath = "") {
    const items = [];
    const entries = fs
      .readdirSync(dirPath, { withFileTypes: true })
      .sort((a, b) => {
        // Directories first, then files
        if (a.isDirectory() !== b.isDirectory()) {
          return a.isDirectory() ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subDirPath = path.join(dirPath, entry.name);
        const subItems = scanDirectory(
          subDirPath,
          path.join(relativePath, entry.name),
        );
        if (subItems.length > 0) {
          items.push({
            label: createLabel(entry.name),
            items: subItems,
          });
        }
      } else if (entry.name.match(/\.(md|mdx)$/)) {
        const slug = path.join(
          relativePath,
          entry.name.replace(/\.(md|mdx)$/, ""),
        );
        items.push({
          label: createLabel(entry.name),
          slug: slug.replace(/\\/g, "/"), // Normalize path separators
        });
      }
    }

    return items;
  }

  // Custom structure with manual ordering and special handling
  const sidebar = [
    {
      label: "Getting Started",
      items: [
        { label: "Introduction", slug: "index" },
        { label: "Quick Start", slug: "guides/getting-started" },
        { label: "Installation", slug: "guides/installation" },
      ],
    },
    {
      label: "Core Concepts",
      items: scanDirectory(path.join(contentDir, "concepts"), "concepts"),
    },
    {
      label: "Guides",
      items: scanDirectory(path.join(contentDir, "guides"), "guides").filter(
        (item) =>
          !["getting-started", "installation"].includes(
            item.slug?.split("/")[1],
          ),
      ),
    },
    {
      label: "Command Reference",
      items: [
        { label: "All Commands", slug: "reference/commands" },
        ...scanDirectory(
          path.join(contentDir, "reference"),
          "reference",
        ).filter((item) => item.slug !== "reference/commands"),
      ],
    },
    {
      label: "Architecture",
      items: scanDirectory(
        path.join(contentDir, "architecture"),
        "architecture",
      ),
    },
  ];

  return sidebar;
}

// https://astro.build/config
export default defineConfig({
  site: "https://pogo-vcs.com",
  integrations: [
    starlight({
      customCss: ["./src/styles/global.css"],
      title: "Pogo",
      description: "Pogo centralized VCS documentation",
      editLink: {
        baseUrl: "https://github.com/pogo-vcs/homepage/edit/main/",
      },
      lastUpdated: true,
      tagline:
        "A centralized version control system that is simple and easy to use",
      logo: {
        src: "./src/assets/logo.svg",
      },
      expressiveCode: {
        shiki: true,
        textMarkers: true,
        frames: true,
      },
      credits: true,
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/pogo-vcs/pogo",
        },
      ],
      sidebar: generateSidebar(),
    }),
  ],
  markdown: {
    rehypePlugins: [[rehypeMermaid, { strategy: "img-svg", dark: true }]],
  },
});
