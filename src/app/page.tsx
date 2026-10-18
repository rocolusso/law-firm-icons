import { ICON_STYLES, SERVICES, DEFAULT_STYLE, isIconStyle } from "@/features/icons/catalog";
import { ServiceCard } from "@/features/icons/service-card";
import { StyleTabs } from "@/features/icons/style-tabs";

type Props = { searchParams: Promise<{ style?: string }> };

export default async function HomePage({ searchParams }: Props) {
  const { style } = await searchParams;
  const active = isIconStyle(style) ? style : DEFAULT_STYLE;
  const activeMeta = ICON_STYLES.find((s) => s.id === active)!;
  const total = SERVICES.length * ICON_STYLES.length;

  return (
    <>
      <header className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-16 sm:pb-12">
        <p className="text-gold-deep text-xs font-semibold tracking-[0.18em] uppercase">
          UI-кіт для юридичної компанії
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-balance sm:text-6xl">
          Іконки юридичних послуг
        </h1>
        <p className="text-ink-soft mt-4 max-w-xl text-base leading-relaxed text-pretty sm:text-lg">
          Єдина система SVG-іконок без тексту: оберіть стиль, відкрийте послугу й завантажте файл
          або скопіюйте код.
        </p>
        <dl className="mt-6 flex gap-6 sm:gap-10">
          {[
            [SERVICES.length, "послуг"],
            [ICON_STYLES.length, "стилів"],
            [total, "SVG-файлів"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-serif text-3xl sm:text-4xl">{value}</dd>
              <dd className="text-ink-soft text-xs">{label}</dd>
            </div>
          ))}
        </dl>
      </header>

      <StyleTabs active={active} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <p className="text-ink-soft mb-4 text-sm">
          <span className="text-ink font-semibold">{activeMeta.label}</span> — {activeMeta.hint}
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} style={active} />
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-line mx-auto max-w-6xl border-t px-4 py-8 sm:px-6">
        <div className="text-ink-soft flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="flex items-center gap-2">
            <i className="bg-ink size-4 rounded-full" aria-hidden /> #14213D
          </span>
          <span className="flex items-center gap-2">
            <i className="bg-gold size-4 rounded-full" aria-hidden /> #B98B53
          </span>
          <span>viewBox 48/64 · масштабуються без втрат</span>
        </div>
      </footer>
    </>
  );
}
