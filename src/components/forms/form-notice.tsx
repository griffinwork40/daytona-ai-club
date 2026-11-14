import type { ReactNode } from "react";

/**
 * Message shown in place of a form: either "this form is closed" or
 * "your submission went through". `live` announces it to screen readers.
 */
export function FormNotice({
  title,
  children,
  tone = "closed",
  live = false,
}: {
  title: string;
  children: ReactNode;
  tone?: "closed" | "success";
  live?: boolean;
}) {
  return (
    <div
      role={live ? "status" : undefined}
      aria-live={live ? "polite" : undefined}
      className="border-l-2 border-sun-400 pl-5"
    >
      <p
        className={`display text-3xl ${tone === "success" ? "text-sunrise" : "text-foam"}`}
      >
        {title}
      </p>
      <p className="mt-3 leading-relaxed text-mist">{children}</p>
    </div>
  );
}
