import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Brand logo — TF monogram + THIMAFER wordmark (FER red).
 * - light=false (header / light bg): monogram on phones, full lockup on sm+.
 * - light=true  (dark footer): same lockup, monogram rendered white.
 */
export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  if (light) {
    return (
      <span className={cn("inline-flex h-7 items-center", className)}>
        <Image
          src="/images/brand/logo-lockup-light.png"
          alt={`${siteConfig.name} logo`}
          width={2712}
          height={322}
          className="h-full w-auto"
        />
      </span>
    );
  }

  return (
    <>
      <Image
        src="/images/brand/logo-monogram.png"
        alt={`${siteConfig.name} logo`}
        width={819}
        height={240}
        priority
        className="h-8 w-auto sm:hidden"
      />
      <Image
        src="/images/brand/logo-lockup.png"
        alt={`${siteConfig.name} logo`}
        width={1508}
        height={148}
        priority
        className="hidden h-7 w-auto sm:block lg:h-8"
      />
    </>
  );
}
