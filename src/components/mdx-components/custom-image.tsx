import Image from "next/image";
import { CustomLink } from "./custom-link";

type Props = {
  src: string;
  alt: string;
  priority?: string;
  photoBy?: string;
  photoByLink?: string;
};

export function CustomImage({
  src,
  alt,
  priority,
  photoBy,
  photoByLink,
}: Props) {
  const prty = priority ? true : false;

  return (
    <div className="w-full h-full text-center">
      <Image
        className="rounded-lg mx-auto my-0"
        src={src}
        alt={alt}
        width={800}
        height={800}
        priority={prty}
      />
      <p className="my-1 text-muted-foreground text-sm">
        Photo by {<CustomLink href={photoByLink}>{photoBy}</CustomLink>}
      </p>
    </div>
  );
}
