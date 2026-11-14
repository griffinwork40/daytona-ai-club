"use client";

import Link from "next/link";
import { useState } from "react";
import { nav } from "@/config/site";

/** Small screen menu. Closes itself when a link is chosen. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="label border border-foam/25 px-3 py-2 text-foam"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute inset-x-0 top-16 border-b border-foam/10 bg-ink-950/95 px-5 pb-6 pt-2 backdrop-blur-md"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-foam/8">
                <Link
                  href={item.href}
                  onClick={close}
                  className="display block py-4 text-3xl"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#join"
            onClick={close}
            className="display mt-5 block bg-foam px-4 py-3 text-center text-xl text-ink-950"
          >
            Join the club
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
