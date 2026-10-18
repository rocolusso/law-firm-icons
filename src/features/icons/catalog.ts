export const ICON_STYLES = [
  { id: "outline", label: "Outline", hint: "Контур, синій із золотим акцентом" },
  { id: "duotone", label: "Duotone", hint: "Контур із м’якою заливкою" },
  { id: "solid", label: "Solid", hint: "Суцільний силует із вирізами" },
  { id: "badge", label: "Badge", hint: "Світла іконка на темному колі" },
  { id: "tile", label: "Tile", hint: "Біла картка з тінню" },
  { id: "luxury", label: "Luxury", hint: "Золотий градієнт на темно-синьому" },
  { id: "luxury2", label: "Luxury 2", hint: "Золоте тиснення на темно-синій плитці з рамкою" },
  { id: "gradient", label: "Gradient", hint: "Біла іконка на синьому градієнті" },
  { id: "mono", label: "Mono", hint: "Один колір через currentColor" },
] as const;

export type IconStyleId = (typeof ICON_STYLES)[number]["id"];

export const DEFAULT_STYLE: IconStyleId = "outline";

export type Service = {
  slug: string;
  title: string;
};

/** Порядок масиву = номер папки в public/icons (01-…, 02-…). */
export const SERVICES: readonly Service[] = [
  { slug: "podatkovi-spravy", title: "Податкові справи" },
  { slug: "mytni-spravy", title: "Митні справи" },
  { slug: "tsyvilni-ta-hospodarski-spravy", title: "Цивільні та господарські справи" },
  { slug: "simeini-ta-spadkovi-spravy", title: "Сімейні та спадкові справи" },
  { slug: "administratyvni-spravy", title: "Адміністративні справи" },
  { slug: "bankivski-ta-finansovi-spravy", title: "Банківські та фінансові справи" },
  { slug: "zemelni-spravy", title: "Земельні справи" },
  { slug: "trudovi-spravy", title: "Трудові справи" },
  { slug: "kryminalni-spravy", title: "Кримінальні справи" },
  { slug: "vykonavche-provadzhennia", title: "Виконавче провадження" },
  { slug: "korporatyvne-pravo", title: "Корпоративне право" },
  { slug: "yurydychnyi-suprovid-biznesu", title: "Юридичний супровід бізнесу" },
  { slug: "publichni-zakupivli", title: "Публічні закупівлі" },
  { slug: "neruhomist-ta-budivnytstvo", title: "Нерухомість та будівництво" },
  { slug: "ahrobiznes", title: "Агробізнес" },
  { slug: "bankrutstvo-ta-restrukturyzatsiia", title: "Банкрутство та фінансова реструктуризація" },
];

export function isIconStyle(value: string | undefined): value is IconStyleId {
  return ICON_STYLES.some((style) => style.id === value);
}

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getServiceNumber(slug: string): number {
  return SERVICES.findIndex((service) => service.slug === slug) + 1;
}

export function iconFolder(slug: string): string {
  return `${String(getServiceNumber(slug)).padStart(2, "0")}-${slug}`;
}

export function iconPath(slug: string, style: IconStyleId): string {
  return `/icons/${iconFolder(slug)}/${slug}_${style}.svg`;
}
