import { BookCoverSvg } from "@/components/atoms";
import { cn } from "@/lib/utils";
import Image from "next/image";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface BookCoverProps {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverUrl: string;
}

export const BookCover = ({
  className,
  coverColor = "#012B48",
  coverUrl = "https://placehold.co/400*600.png",
  variant = "regular",
}: BookCoverProps) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverUrl}
          alt="book cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};
