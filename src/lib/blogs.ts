"use server";

import path from "path";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { notFound } from "next/navigation";

import { Callout } from "@/components/callout";
import { sortPosts } from "./utils";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isBlogHeaderData(data: any): data is BlogMetadata {
  return (
    typeof data.title === "string" &&
    typeof data.description === "string" &&
    typeof data.isPublished === "boolean" &&
    typeof data.slug === "string" &&
    typeof data.publishDate === "string"
  );
}

export async function getAllContent() {
  const blogPostsDirPath = path.join(process.cwd(), "src/content");
  const filenames = fs
    .readdirSync(blogPostsDirPath, { withFileTypes: true })
    .map((dirent) => dirent.name);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const content = fs.readFileSync(
        path.join(process.cwd(), "src/content", filename),
        "utf-8"
      );
      const { frontmatter } = await compileMDX<BlogMetadata>({
        source: content,
        options: {
          parseFrontmatter: true,
        },
      });

      if (!isBlogHeaderData(frontmatter)) {
        throw new Error("Invalid blog metadata");
      }

      return {
        ...frontmatter,
      };
    })
  );

  return sortPosts(posts);
}

export async function getPostBySlug(slug: string) {
  let source = "";
  try {
    source = fs.readFileSync(
      path.join(process.cwd(), "src/content", `${slug}.mdx`),
      "utf-8"
    );
  } catch {
    notFound();
  }

  const { frontmatter, content } = await compileMDX<BlogMetadata>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, { theme: "night-owl" }],
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["subheading-anchor"],
                ariaLabel: "Link to section",
              },
            },
          ],
        ],
      },
    },
    components: {
      Callout,
    },
  });

  if (!isBlogHeaderData(frontmatter)) {
    throw new Error("Invalid blog metadata");
  }

  return {
    frontmatter,
    content,
  };
}
