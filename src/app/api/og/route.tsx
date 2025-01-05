import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

import { promises as fs } from "fs";
import path from "path";

async function getInterBoldFontBuffer() {
  const fontPath = path.join(
    process.cwd(),
    "assets",
    "fonts",
    "Inter-Bold.ttf"
  );
  return await fs.readFile(fontPath);
}

export async function GET(req: NextRequest) {
  try {
    const fontBold = await getInterBoldFontBuffer();
    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");

    if (!title) {
      return new Response("No title provided", { status: 500 });
    }

    const heading = title.length > 140 ? `${title.slice(0, 140)}...` : title;

    return new ImageResponse(
      (
        <div tw="flex relative flex-col p-12 w-full h-full items-start text-black bg-white">
          <div tw="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8l9 5 9-5-9-5-9 5z" />
              <path d="M3 12l9 5 9-5" />
              <path d="M3 16l9 5 9-5" />
            </svg>
            <p tw="ml-2 font-bold text-2xl">{siteConfig.name}</p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">
              BLOG POST
            </div>
            <div tw="flex text-[80px] font-bold text-[50px]">{heading}</div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl">{siteConfig.url}</div>
            <div tw="flex items-center text-xl">
              <div tw="flex ml-2">{siteConfig.links.github}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch {
    return new Response("Failed to generate image", { status: 500 });
  }
}
