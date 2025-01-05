import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

import "@/styles/mdx.css";
import { MainNav } from "@/components/main-nav";
import { Callout } from "@/components/callout";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const content = await fs.readFile(
    path.join(process.cwd(), "src/content", `${slug}.mdx`),
    "utf-8"
  );

  const { frontmatter } = await compileMDX<{
    title: string;
    description: string;
    publishDate: string;
    slug: string;
    isPublished: boolean;
  }>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    title: frontmatter.title,
  };
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const content = await fs.readFile(
    path.join(process.cwd(), "src/content", `${slug}.mdx`),
    "utf-8"
  );

  const data = await compileMDX<{
    title: string;
    description: string;
    publishDate: string;
    slug: string;
    isPublished: boolean;
  }>({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, { theme: "github-dark" }],
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
      MainNav,
      Callout,
    },
  });

  return <div>{data.content}</div>;
}
