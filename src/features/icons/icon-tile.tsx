import Image from "next/image";
import { CopySvgButton } from "./copy-svg-button";
import { iconPath, type IconStyleId } from "./catalog";

type Props = {
  slug: string;
  style: IconStyleId;
  label: string;
  hint: string;
};

export function IconTile({ slug, style, label, hint }: Props) {
  const src = iconPath(slug, style);
  return (
    <li className="border-line flex flex-col gap-3 rounded-2xl border bg-white p-3">
      <div className="bg-paper/60 flex aspect-square items-center justify-center rounded-xl">
        <Image
          src={src}
          alt=""
          width={112}
          height={112}
          unoptimized
          className="size-24 sm:size-28"
        />
      </div>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-ink-soft text-xs leading-snug">{hint}</p>
      </div>
      <div className="mt-auto grid gap-2">
        <a
          href={src}
          download={`${slug}_${style}.svg`}
          className="bg-ink hover:bg-ink/90 inline-flex min-h-11 items-center justify-center rounded-xl px-3 text-sm font-medium text-white transition active:scale-[0.98]"
        >
          Завантажити
        </a>
        <CopySvgButton src={src} />
      </div>
    </li>
  );
}
