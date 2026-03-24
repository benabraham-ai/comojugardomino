import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Como Jugar Domino — Reglas, Estrategia y Cultura",
    template: "%s | Como Jugar Domino",
  },
  description:
    "Aprende a jugar domino: reglas, estrategias y cultura del domino latinoamericano. La guia definitiva para principiantes y expertos.",
  metadataBase: new URL("https://comojugardomino.com"),
  icons: {
    icon: "/icon-dark.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Como Jugar Domino",
    locale: "es_LA",
    alternateLocale: "en_US",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${outfit.variable} font-outfit antialiased bg-dark text-cream`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
