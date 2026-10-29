export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface PreviewPlacement {
  left: number;
  top: number;
  width: number;
}

const EDGE_MARGIN = 12;
/** Keeps the preview clear of the fixed nav bar. */
const MIN_TOP = 76;
const INFO_HEIGHT = 148;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

/**
 * Centres the enlarged preview over the hovered card, then nudges it back inside the viewport
 * so cards at the edges of a row don't open half off-screen.
 */
export function previewPlacement(anchor: Rect, viewport: { width: number; height: number }): PreviewPlacement {
  const width = Math.round(Math.min(Math.max(anchor.width * 1.35, 300), 420, viewport.width - EDGE_MARGIN * 2));
  const estimatedHeight = Math.round((width * 9) / 16 + INFO_HEIGHT);

  const left = clamp(Math.round(anchor.left + anchor.width / 2 - width / 2), EDGE_MARGIN, viewport.width - width - EDGE_MARGIN);
  const top = clamp(
    Math.round(anchor.top + anchor.height / 2 - estimatedHeight / 2),
    MIN_TOP,
    viewport.height - estimatedHeight - EDGE_MARGIN,
  );

  return { left, top, width };
}
