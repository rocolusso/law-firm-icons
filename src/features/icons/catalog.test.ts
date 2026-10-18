import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ICON_STYLES, SERVICES, getService, iconFolder, iconPath, isIconStyle } from "./catalog";

const publicDir = join(process.cwd(), "public");

describe("catalog", () => {
  it("містить 16 послуг і 9 стилів", () => {
    expect(SERVICES).toHaveLength(16);
    expect(ICON_STYLES).toHaveLength(9);
  });

  it("slug-и послуг унікальні", () => {
    expect(new Set(SERVICES.map((s) => s.slug)).size).toBe(SERVICES.length);
  });

  it("нумерує папки з 01", () => {
    expect(iconFolder("podatkovi-spravy")).toBe("01-podatkovi-spravy");
    expect(iconFolder("bankrutstvo-ta-restrukturyzatsiia")).toBe(
      "16-bankrutstvo-ta-restrukturyzatsiia",
    );
  });

  it("розпізнає стилі та послуги", () => {
    expect(isIconStyle("luxury")).toBe(true);
    expect(isIconStyle("neon")).toBe(false);
    expect(isIconStyle(undefined)).toBe(false);
    expect(getService("trudovi-spravy")?.title).toBe("Трудові справи");
    expect(getService("nope")).toBeUndefined();
  });
});

describe("файли іконок", () => {
  const combos = SERVICES.flatMap((s) => ICON_STYLES.map((st) => [s.slug, st.id] as const));

  it.each(combos)("%s / %s існує, має viewBox і не містить тексту", (slug, style) => {
    const file = join(publicDir, iconPath(slug, style));
    expect(existsSync(file)).toBe(true);
    const svg = readFileSync(file, "utf8");
    expect(svg).toContain("viewBox=");
    expect(svg).not.toMatch(/<text[\s>]/);
  });
});
