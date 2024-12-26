import getFormattedDate from "@/lib/get-formatted-date";
import { getSortedPostsData, getPostData } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  const posts = getSortedPostsData();

  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata(props: Props) {
  const posts = getSortedPostsData();
  const id = (await props.params).id;

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
  };
}

export default async function Post(props: Props) {
  const posts = getSortedPostsData();
  const id = (await props.params).id;

  if (!posts.find((post) => post.id === id)) notFound();

  const { title, date, contentHtml } = await getPostData(id);

  const pubDate = getFormattedDate(date);

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p>
          <Link href="/">← Back to home</Link>
        </p>
      </article>
    </main>
  );
}
