import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

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
    },
    components: {
      MainNav,
      Callout,
    },
  });

  return <div>{data.content}</div>;
}
