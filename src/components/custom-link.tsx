import { Link } from "next-view-transitions";
import { ComponentPropsWithoutRef } from "react";

type AnchorProps = ComponentPropsWithoutRef<"a">;

export function CustomLink({ href, children, ...props }: AnchorProps) {
  const className = "text-blue-500 hover:text-blue-700";
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
