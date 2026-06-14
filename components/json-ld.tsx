import { Fragment } from "react";

/**
 * Renders one or more JSON-LD structured-data blocks as server-rendered
 * <script> tags. The `<` character is escaped to its unicode equivalent
 * to prevent the payload from breaking out of the <script> element
 * (a known JSON-LD XSS vector).
 */
export function JsonLd({ schema }: { schema: object | object[] }) {
  const blocks = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {blocks.map((block, i) => (
        <Fragment key={i}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(block).replace(/</g, "\\u003c"),
            }}
          />
        </Fragment>
      ))}
    </>
  );
}
