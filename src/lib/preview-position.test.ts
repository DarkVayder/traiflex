import { describe, expect, it } from "vitest";
import { previewPlacement } from "./preview-position";

const viewport = { width: 1440, height: 900 };

describe("previewPlacement", () => {
  it("centres a wider preview over a card in the middle of the screen", () => {
    const card = { left: 600, top: 400, width: 300, height: 169 };
    const placement = previewPlacement(card, viewport);
    expect(placement.width).toBe(405);
    expect(placement.left + placement.width / 2).toBeCloseTo(card.left + card.width / 2, -1);
  });

  it("keeps previews for edge cards inside the viewport", () => {
    const first = previewPlacement({ left: 0, top: 400, width: 300, height: 169 }, viewport);
    expect(first.left).toBe(12);

    const last = previewPlacement({ left: 1140, top: 400, width: 300, height: 169 }, viewport);
    expect(last.left + last.width).toBe(viewport.width - 12);
  });

  it("stays below the nav and above the bottom edge", () => {
    expect(previewPlacement({ left: 600, top: 0, width: 300, height: 169 }, viewport).top).toBe(76);

    const low = previewPlacement({ left: 600, top: 850, width: 300, height: 169 }, viewport);
    expect(low.top).toBeLessThanOrEqual(900 - 12 - 148 - Math.round((low.width * 9) / 16));
  });

  it("shrinks to fit narrow screens", () => {
    expect(previewPlacement({ left: 10, top: 300, width: 280, height: 157 }, { width: 320, height: 640 }).width).toBe(296);
  });
});
