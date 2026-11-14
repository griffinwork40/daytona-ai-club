"use client";

import dynamic from "next/dynamic";

/**
 * Lazy boundary for the swell canvas. The canvas code is kept out of
 * the initial bundle and never runs on the server. Until it loads, the
 * CSS water gradient behind it is the fallback.
 */
const SwellCanvas = dynamic(() => import("./swell-canvas"), { ssr: false });

export function Swell({ sunU }: { sunU?: number }) {
  return <SwellCanvas sunU={sunU} />;
}
