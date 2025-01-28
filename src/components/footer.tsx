import { Link } from "next-view-transitions";
import { Icons } from "./icons";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-4 sm:h-16 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
          © {new Date().getFullYear()} InamKōdo. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/inam95"
            target="_blank"
            className="hover:text-primary/80 transition-colors"
          >
            <Icons.gitHub className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
          <Link
            href="https://x.com/itzInam95"
            target="_blank"
            className="hover:text-primary/80 transition-colors"
          >
            <Icons.twitter className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
