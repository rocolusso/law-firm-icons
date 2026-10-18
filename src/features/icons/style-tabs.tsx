import Link from "next/link";
import { ICON_STYLES, type IconStyleId } from "./catalog";

export function StyleTabs({ active }: { active: IconStyleId }) {
  return (
    <nav
      aria-label="Стиль іконок"
      className="border-line bg-paper/90 sticky top-0 z-10 border-b backdrop-blur"
    >
      <ul className="mx-auto flex max-w-6xl snap-x [scrollbar-width:none] gap-2 overflow-x-auto px-4 py-3 sm:px-6">
        {ICON_STYLES.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id} className="shrink-0 snap-start">
              <Link
                href={`/?style=${id}`}
                replace
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={
                  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors " +
                  (isActive
                    ? "border-ink bg-ink text-white"
                    : "border-line text-ink-soft hover:border-gold hover:text-ink bg-white")
                }
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
