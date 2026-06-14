import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { siteGraph } from "@/lib/seo";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd schema={siteGraph()} />
      <SiteHeader />
      <main id="content">{children}</main>
      <SiteFooter />
    </>
  );
}
