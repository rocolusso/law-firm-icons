import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Іконки юридичних послуг",
    template: "%s · Іконки юридичних послуг",
  },
  description:
    "Каталог SVG-іконок для сайту юридичної компанії: 18 послуг, 10 стилів, без тексту на іконці.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f3ec",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
