import { getBlogPosts } from "@/lib/blogs";
import { Link } from "next-view-transitions";

export default async function Home() {
  const posts = await getBlogPosts();
  return (
    <main className="px-6 mx-auto">
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello and Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold">Dave</span>.
        </span>
      </p>
      <section
        id="blogs"
        className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
      >
        <h2 className="font-bold text-3xl md:text-5xl mb-12">Blogs</h2>

        <div className="flex flex-col space-y-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`}>
              <h3 className="text-xl md:text-3xl font-semibold">
                {post.title}
              </h3>
              <p className="md:text-lg font-light">{post.description}</p>
              <p className="text-sm font-medium text-gray-500 mt-2">
                Published at: {post.publishDate}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
