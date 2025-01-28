import { promises as fs } from "fs";
import path from "path";

import { siteConfig } from "@/config/site";
import { getPostBySlug } from "@/lib/blogs";
import { formatDate } from "@/lib/utils";
import "@/styles/mdx.css";
import { CalendarDays } from "lucide-react";

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
    <article className="max-w-3xl mx-auto prose dark:prose-invert ">
      <header className="text-left">
        <h1 className="mb-4">{data.frontmatter.title}</h1>
        <p className="text-muted-foreground my-1">
          {data.frontmatter.description}
        </p>
        {/* <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted-foreground"> */}
        <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 mr-2" />
          <time>{formatDate(data.frontmatter.publishDate)}</time>
        </div>
        {/* </div> */}
        <div className="japanese-divider" />
      </header>
      {data.content}
    </article>
  );
}
