import { Card } from "@/components/ui/card";
import { getAllContent } from "@/lib/blogs";
import { formatDate } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Link } from "next-view-transitions";

const POST_PER_PAGE = 6;

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const page = (await searchParams).page;

  const posts = await getAllContent(true);

  const currentPage = page ? parseInt(page) : 1;
  // const totalPages = Math.ceil(posts.length / POST_PER_PAGE);

  const displayPosts = posts.slice(
    (currentPage - 1) * POST_PER_PAGE,
    currentPage * POST_PER_PAGE
  );

  return (
    <div className="container max-w-4xl px-4 sm:px-6 lg:px-8">
      <section className="mb-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 tracking-tight">
          <span className="site-name gradient-text">Hi, </span>
          <span className="waving-emoji">👋</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto px-4">
          I&apos;m Inam, a software engineer based in Sri Lanka, who loves to
          build things for the web. Welcome to my personal blog where I share my
          ramblings on web development, programming, and tech.
        </p>
        <div className="japanese-divider" />
      </section>
      <section>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Blog Posts
          </h2>
          <Sparkles className="h-5 w-5 text-[hsl(var(--accent))]" />
        </div>
        <div className="space-y-4 sm:space-y-6">
          {displayPosts.map((post) => (
            <Card
              key={post.slug}
              className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 ease-in-out border-[hsl(var(--accent))] border-opacity-20"
            >
              <article>
                <Link href={`/n/${post.slug}`}>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 hover:text-[hsl(var(--accent))] transition-colors tracking-tight">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                  {post.description}
                </p>
                <time className="text-xs sm:text-sm text-muted-foreground">
                  {formatDate(post.publishDate)}
                </time>
              </article>
            </Card>
          ))}
        </div>

        {/* <div className="mt-6 sm:mt-8 flex justify-center space-x-4">
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div> */}
      </section>
    </div>
  );
}
