import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ICON_STYLES, SERVICES, getService, getServiceNumber } from "@/features/icons/catalog";
import { IconTile } from "@/features/icons/icon-tile";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return { title: service?.title ?? "Послуга" };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = getServiceNumber(slug) - 1;
  const prev = SERVICES[(index - 1 + SERVICES.length) % SERVICES.length];
  const next = SERVICES[(index + 1) % SERVICES.length];

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href="/"
        className="text-ink-soft hover:text-ink -ml-2 inline-flex min-h-11 items-center px-2 text-sm"
      >
        ← Усі послуги
      </Link>

      <p className="text-gold-deep mt-2 font-mono text-xs tracking-wider">
        {String(index + 1).padStart(2, "0")} / {SERVICES.length}
      </p>
      <h1 className="mt-2 font-serif text-3xl leading-tight text-balance sm:text-5xl">
        {service.title}
      </h1>
      <p className="text-ink-soft mt-3 text-sm sm:text-base">
        {ICON_STYLES.length} стилів. Кожен файл — окремий SVG без тексту.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {ICON_STYLES.map((style) => (
          <IconTile
            key={style.id}
            slug={slug}
            style={style.id}
            label={style.label}
            hint={style.hint}
          />
        ))}
      </ul>

      <nav
        aria-label="Сусідні послуги"
        className="border-line mt-10 grid grid-cols-2 gap-3 border-t pt-6"
      >
        <Link
          href={`/icons/${prev.slug}`}
          className="border-line hover:border-gold min-h-11 rounded-xl border bg-white p-3 text-sm"
        >
          <span className="text-ink-soft block text-xs">← Попередня</span>
          <span className="line-clamp-2 font-medium">{prev.title}</span>
        </Link>
        <Link
          href={`/icons/${next.slug}`}
          className="border-line hover:border-gold min-h-11 rounded-xl border bg-white p-3 text-right text-sm"
        >
          <span className="text-ink-soft block text-xs">Наступна →</span>
          <span className="line-clamp-2 font-medium">{next.title}</span>
        </Link>
      </nav>
    </main>
  );
}
