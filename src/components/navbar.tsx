"use client";

import { Link } from "next-view-transitions";
import { ModeToggle } from "./mode-toggle";
import { Logo } from "./logo";
import { Icons } from "./icons";

export function Navbar() {
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity"
            aria-label="InamKōdo - Home"
          >
            <div className="w-[120px] sm:w-[160px]">
              <Logo />
            </div>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="https://github.com/inam95"
              target="_blank"
              className="hover:text-[hsl(var(--accent))] transition-colors transform hover:scale-110 duration-200"
            >
              <Icons.gitHub className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              href="https://x.com/itzInam95"
              target="_blank"
              className="hover:text-[hsl(var(--accent))] transition-colors transform hover:scale-110 duration-200"
            >
              <Icons.twitter className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
