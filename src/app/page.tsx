import { PostItem } from "@/components/post-item";
import QueryPagination from "@/components/query-pagination";
import { promises as fs } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

const POST_PER_PAGE = 2;

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const page = (await searchParams).page;
  const currentPage = page ? parseInt(page) : 1;
  const filenames = await fs.readdir(
    path.join(process.cwd(), "src/content"),
    "utf-8"
  );

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), "src/content", filename),
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
        ...frontmatter,
      };
    })
  );
  const totalPages = Math.ceil(posts.length / POST_PER_PAGE);

  const displayPosts = posts.slice(
    (currentPage - 1) * POST_PER_PAGE,
    currentPage * POST_PER_PAGE
  );

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            My ramblings on web development, programming, and tech.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, publishDate, title, description } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={publishDate}
                      title={title}
                      description={description}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div>
      </div>
    </div>
  );
}
