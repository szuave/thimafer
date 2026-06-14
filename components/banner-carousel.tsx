"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type Slide = {
  src: string;
  alt: string;
};

const INTERVAL = 6000;

export function BannerCarousel({
  slides,
  children,
}: {
  slides: Slide[];
  children?: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, slides.length]);

  return (
    <section
      className="relative isolate overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-steel",
              i === index ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={cn("object-cover", i === index && "animate-kenburns")}
            />
          </div>
        ))}
        {/* Overlays for legibility — bottom + left, keeps text crisp */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
      </div>

      <div className="relative z-10">{children}</div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="container-edge flex items-center gap-2.5 pb-7">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Toon afbeelding ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === index ? "w-9 bg-white" : "w-4 bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
