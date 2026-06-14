"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ImageSlideshow({
  images,
  className,
}: {
  images: { src: string; alt: string }[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      5000,
    );
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className={cn("relative overflow-hidden bg-mist", className)}>
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={cn(
            "object-cover transition-opacity duration-1000 ease-steel",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-4 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Foto ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-7 bg-white" : "w-3 bg-white/60 hover:bg-white",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
