"use server";

import path from "path";
import fs from "fs";

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

export async function getBlogPosts() {
  const blogPostsDirPath = path.join(process.cwd(), "src/app/blogs");
  const postDirs = fs
    .readdirSync(blogPostsDirPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const blogs = await Promise.all(
    postDirs.map(async (postDir) => {
      const { metadata } = await import(`@/app/blogs/${postDir}/page.mdx`);
      if (isBlogHeaderData(metadata)) {
        return metadata;
      }

      throw new Error("Invalid blog metadata");
    })
  );

  return blogs.filter((blog) => blog.isPublished);
}
