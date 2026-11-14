import { describe, expect, it } from "vitest";
import {
  RAMP,
  sunGlint,
  swellCell,
  swellChar,
  swellColor,
  swellGrid,
  swellHeight,
} from "./swell-field";

describe("swellHeight", () => {
  it("stays within 0..1 across the field and over time", () => {
    for (let t = 0; t < 40; t += 1.7) {
      for (let u = 0; u <= 1; u += 0.05) {
        for (let v = 0; v <= 1; v += 0.05) {
          const h = swellHeight(u, v, t);
          expect(h).toBeGreaterThanOrEqual(0);
          expect(h).toBeLessThanOrEqual(1);
        }
      }
    }
  });

  it("is deterministic and changes with time", () => {
    expect(swellHeight(0.3, 0.6, 2)).toBe(swellHeight(0.3, 0.6, 2));
    expect(swellHeight(0.3, 0.6, 2)).not.toBe(swellHeight(0.3, 0.6, 2.5));
  });
});

describe("swellChar", () => {
  it("maps the ends of the range to the ends of the ramp", () => {
    expect(swellChar(0)).toBe(RAMP[0]);
    expect(swellChar(1)).toBe(RAMP[RAMP.length - 1]);
  });

  it("tolerates out of range input", () => {
    expect(swellChar(-3)).toBe(RAMP[0]);
    expect(swellChar(9)).toBe(RAMP[RAMP.length - 1]);
  });
});

describe("sunGlint", () => {
  it("peaks under the sun and falls off to the sides", () => {
    expect(sunGlint(0.7, 0.5, 0.7)).toBeCloseTo(1);
    expect(sunGlint(0.2, 0.5, 0.7)).toBeLessThan(0.01);
  });

  it("widens toward the viewer", () => {
    expect(sunGlint(0.8, 1, 0.7)).toBeGreaterThan(sunGlint(0.8, 0, 0.7));
  });
});

describe("swellColor", () => {
  it("returns a valid rgba string with alpha in range", () => {
    for (const v of [0, 0.3, 1]) {
      const m = swellColor(v, 0.8, 0.5).match(
        /^rgba\((\d+),(\d+),(\d+),([\d.]+)\)$/,
      );
      expect(m).not.toBeNull();
      const [r, g, b, a] = m!.slice(1).map(Number);
      for (const ch of [r, g, b]) expect(ch).toBeLessThanOrEqual(255);
      expect(a).toBeGreaterThan(0);
      expect(a).toBeLessThanOrEqual(1);
    }
  });
});

describe("swellGrid", () => {
  it("caps the cell count on very large canvases", () => {
    const g = swellGrid(6000, 3000);
    expect(g.cols).toBeLessThanOrEqual(150);
    expect(g.rows).toBeLessThanOrEqual(40);
  });

  it("never returns an empty grid", () => {
    const g = swellGrid(0, 0);
    expect(g.cols).toBeGreaterThanOrEqual(1);
    expect(g.rows).toBeGreaterThanOrEqual(1);
  });

  it("fills the full width", () => {
    const g = swellGrid(390, 300);
    expect(g.cols * g.cellW).toBeCloseTo(390);
  });
});

describe("swellCell", () => {
  it("returns a ramp character and a colour", () => {
    const cell = swellCell(0.4, 0.5, 3, 0.7);
    expect(RAMP).toContain(cell.char);
    expect(cell.color).toMatch(/^rgba\(/);
  });

  it("is on average brighter inside the sun's reflection", () => {
    const alpha = (c: string) => Number(c.slice(c.lastIndexOf(",") + 1, -1));
    let inside = 0;
    let outside = 0;
    for (let t = 0; t < 30; t += 0.5) {
      inside += alpha(swellCell(0.7, 0.6, t, 0.7).color);
      outside += alpha(swellCell(0.1, 0.6, t, 0.7).color);
    }
    expect(inside).toBeGreaterThan(outside);
  });
});
