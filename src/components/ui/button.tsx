import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display text-lg font-extrabold uppercase tracking-wide transition duration-200 ease-out-expo disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-r from-sun-300 via-sun-500 to-flare-500 text-ink-950 shadow-[0_10px_40px_-12px_rgb(255_138_60/0.7)] hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-10px_rgb(255_138_60/0.85)] active:translate-y-0",
  ghost:
    "border border-foam/25 text-foam hover:border-foam/60 hover:bg-foam/5",
};

/** Class string for button styling, for use on real `<button>` elements. */
export function buttonClass(variant: Variant = "primary", extra = ""): string {
  return `${base} ${variants[variant]} ${extra}`.trim();
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

/** A link styled as a button. Use for navigation, not form submission. */
export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}
