/**
 * Pure math for the hero's text swell: an ocean surface seen from the
 * beach, drawn with characters. No DOM access, so it is unit testable.
 *
 * Coordinates: `u` runs 0..1 left to right, `v` runs 0..1 from the
 * horizon (0) to the shoreline at the viewer's feet (1).
 */

/** Characters from calm water to breaking crest. */
export const RAMP = [" ", ".", ":", "-", "~", "=", "+", "*", "#"] as const;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * Wave height at a point and time, normalised to 0..1.
 * Rows near the horizon are compressed by a perspective term, so the
 * swell reads as receding into the distance.
 */
export function swellHeight(u: number, v: number, t: number): number {
  const depth = 1 / (0.12 + v);
  const x = (u - 0.5) * (depth + 2.5) * 4;
  const z = depth * 2.2;

  // A long swell rolling toward shore, bent sideways so crests are not
  // straight lines, plus two smaller wave trains crossing it.
  const primary = 0.5 * Math.sin(z * 2.4 + t * 1.1 + 1.4 * Math.sin(x * 0.55 + t * 0.3));
  const cross = 0.32 * Math.sin(z * 4.3 - x * 1.9 + t * 1.6);
  const chop = 0.18 * Math.sin(x * 4.7 + z * 1.3 - t * 2.2);

  return clamp01((primary + cross + chop + 1) / 2);
}

/** Character for a normalised height. */
export function swellChar(height: number): string {
  const i = Math.min(RAMP.length - 1, Math.floor(clamp01(height) * RAMP.length));
  return RAMP[i];
}

/**
 * Strength (0..1) of the sun's reflection at a point. The glitter path
 * is narrow at the horizon and widens toward the viewer.
 */
export function sunGlint(u: number, v: number, sunU: number): number {
  const width = 0.035 + 0.11 * v;
  const d = (u - sunU) / width;
  return Math.exp(-0.5 * d * d);
}

type Rgb = readonly [number, number, number];

const HORIZON: Rgb = [255, 233, 184]; // pale gold sparkle on bright water
const MID: Rgb = [224, 120, 150]; // rose where the sky colour fades
const DEEP: Rgb = [92, 116, 196]; // blue in the dark foreground water
const GOLD: Rgb = [255, 210, 122];

const mix = (a: Rgb, b: Rgb, k: number): Rgb => [
  a[0] + (b[0] - a[0]) * k,
  a[1] + (b[1] - a[1]) * k,
  a[2] + (b[2] - a[2]) * k,
];

/**
 * Fill colour for a cell as a CSS `rgba()` string.
 * Colour follows depth, warms inside the sun's reflection, and gets
 * brighter on wave crests.
 */
export function swellColor(v: number, height: number, glint: number): string {
  const byDepth = v < 0.3 ? mix(HORIZON, MID, v / 0.3) : mix(MID, DEEP, (v - 0.3) / 0.7);
  const warmed = mix(byDepth, GOLD, clamp01(glint * (0.45 + 0.55 * height)));
  const alpha = clamp01(0.22 + 0.6 * height + 0.25 * glint);
  const [r, g, b] = warmed;
  return `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(2)})`;
}

/**
 * Everything needed to draw one cell: its character and colour.
 * The sun's reflection lifts the surface a little, so the glitter path
 * reads as brighter, busier water.
 */
export function swellCell(u: number, v: number, t: number, sunU: number) {
  const glint = sunGlint(u, v, sunU);
  const height = clamp01(swellHeight(u, v, t) + 0.28 * glint);
  return { char: swellChar(height), color: swellColor(v, height, glint) };
}

/**
 * Grid size for a canvas of the given CSS pixel size. Caps the cell
 * count so small phones and very wide screens both stay cheap to draw.
 */
export function swellGrid(width: number, height: number) {
  const cellW = width < 640 ? 11 : 13;
  const cellH = Math.round(cellW * 1.55);
  const cols = Math.min(150, Math.max(1, Math.ceil(width / cellW)));
  const rows = Math.min(40, Math.max(1, Math.ceil(height / cellH)));
  return { cols, rows, cellW: width / cols, cellH };
}
