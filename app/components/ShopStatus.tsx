"use client";

import { useId } from "react";
import { shopStatus } from "../lib/hours";

// The page is statically prerendered, so "now" on the server is build time —
// the HTML would otherwise ship a stale open/closed claim. The inline script
// recomputes the label while the browser parses, before first paint; on soft
// navigations the script is inert and the client render is already correct.
export function ShopStatus() {
  const id = useId();
  return (
    <>
      <span id={id} suppressHydrationWarning>
        {shopStatus(new Date())}
      </span>
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `{var n=document.getElementById(${JSON.stringify(
            id
          )});if(n)n.textContent=(${shopStatus.toString()})(new Date())}`,
        }}
      />
    </>
  );
}
