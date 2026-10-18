import Image from "next/image";
import Link from "next/link";
import { getServiceNumber, iconPath, type IconStyleId, type Service } from "./catalog";

export function ServiceCard({ service, style }: { service: Service; style: IconStyleId }) {
  const number = String(getServiceNumber(service.slug)).padStart(2, "0");
  return (
    <Link
      href={`/icons/${service.slug}`}
      className="group border-line hover:border-gold relative flex flex-col items-center gap-3 rounded-2xl border bg-white p-4 pt-6 text-center transition active:scale-[0.98]"
    >
      <span className="text-gold-deep absolute top-3 left-4 font-mono text-[11px] tracking-wider">
        {number}
      </span>
      <Image
        src={iconPath(service.slug, style)}
        alt=""
        width={96}
        height={96}
        unoptimized
        className="size-20 sm:size-24"
      />
      <span className="text-sm leading-snug font-medium text-balance">{service.title}</span>
    </Link>
  );
}
