import { promises as fs } from "fs";
import path from "path";

import { siteConfig } from "@/config/site";
import { getPostBySlug } from "@/lib/blogs";
import "@/styles/mdx.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const { frontmatter } = await getPostBySlug(slug);

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.append("title", frontmatter.title);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: {
      name: siteConfig.author,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      url: `${siteConfig.url}/n/${slug}`,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams() {
  const filenames = await fs.readdir(
    path.join(process.cwd(), "src/content"),
    "utf-8"
  );

  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ""),
  }));
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const data = await getPostBySlug(slug);

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{data.frontmatter.title}</h1>
      {data.frontmatter.description ? (
        <p className="text-xl mt-0 text-muted-foreground">
          {data.frontmatter.description}
        </p>
      ) : null}
      <hr className="my-4" />
      {data.content}
    </article>
  );
}
