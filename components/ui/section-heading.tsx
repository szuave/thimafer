import { cn } from "@/lib/utils";

function clean(children: React.ReactNode) {
  return typeof children === "string"
    ? children.replace(/^[\s/]+/, "")
    : children;
}

export function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2.5",
        light ? "text-white/70" : "text-accent",
        className,
      )}
    >
      <span className={cn("h-px w-6", light ? "bg-white/40" : "bg-accent")} />
      {clean(children)}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "max-w-3xl text-3xl sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-white/70" : "text-steel-500",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
