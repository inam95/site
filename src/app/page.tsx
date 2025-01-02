import { PostItem } from "@/components/post-item";
import { getBlogPosts } from "@/lib/blogs";

export default async function Home() {
  const posts = await getBlogPosts();
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
          {posts?.length > 0 ? (
            <ul className="flex flex-col">
              {posts.map((post) => {
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
        </div>
      </div>
    </div>
  );
}
