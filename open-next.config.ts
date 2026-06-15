import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// R2 incremental cache is uitgeschakeld zolang R2 niet geactiveerd is.
// Terug aanzetten: activeer R2 in het dashboard, maak de bucket
// "thimafer-cache" aan, en herstel onderstaande import + override:
//   import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
//   export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });

export default defineCloudflareConfig({});
