"use client";

import { useEffect, useRef } from "react";
import { swellCell, swellGrid } from "./swell-field";

const FRAME_MS = 1000 / 30;

/**
 * Animated text swell. Draws at 30fps, pauses when scrolled away or the
 * tab is hidden, and draws one still frame under reduced motion.
 * `sunU` is the sun's horizontal position, 0..1.
 */
export default function SwellCanvas({ sunU = 0.5 }: { sunU?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const family = getComputedStyle(canvas).fontFamily || "monospace";
    let grid = swellGrid(1, 1);
    let raf = 0;
    let last = 0;
    let onScreen = true;

    const draw = (t: number) => {
      const { cols, rows, cellW, cellH } = grid;
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (let r = 0; r < rows; r++) {
        const v = (r + 0.5) / rows;
        for (let c = 0; c < cols; c++) {
          const u = (c + 0.5) / cols;
          const cell = swellCell(u, v, t, sunU);
          if (cell.char === " ") continue;
          ctx.fillStyle = cell.color;
          ctx.fillText(cell.char, c * cellW + cellW / 2, r * cellH + cellH / 2);
        }
      }
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grid = swellGrid(w, h);
      ctx.font = `600 ${Math.round(grid.cellH * 0.78)}px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      draw(last / 1000);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < FRAME_MS) return;
      last = now;
      draw(now / 1000);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (onScreen && !document.hidden && !reduce.matches) {
        raf = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    const ro = new ResizeObserver(resize);

    io.observe(canvas);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    resize();
    sync();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, [sunU]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full font-mono"
    />
  );
}
