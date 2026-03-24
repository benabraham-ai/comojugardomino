import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { DominoIcon, SignalBars } from "@/components/icons";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale: params.locale, namespace: "home" });
  return {
    title: t("hero_headline"),
    description: t("hero_subtitle"),
  };
}

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations("home");

  return (
    <>
      {/* Section 1: Hero Banner */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-near via-walnut to-walnut-light" />
        
        {/* Decorative domino tiles pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large decorative tiles */}
          <div className="absolute -top-4 -left-8 w-24 h-48 border-2 border-cream/10 rounded-xl rotate-12 opacity-30" />
          <div className="absolute bottom-20 -right-12 w-28 h-56 border-2 border-cream/10 rounded-xl -rotate-12 opacity-20" />
          <div className="absolute top-1/4 right-1/3 w-20 h-40 border-2 border-orange/20 rounded-xl rotate-45 opacity-20" />
          <div className="absolute bottom-1/3 left-1/4 w-16 h-32 border-2 border-cream/10 rounded-xl -rotate-6 opacity-25" />
          
          {/* Domino dots pattern */}
          <div className="absolute top-20 right-20 w-4 h-4 bg-cream/10 rounded-full" />
          <div className="absolute top-28 right-28 w-4 h-4 bg-cream/10 rounded-full" />
          <div className="absolute top-24 right-24 w-4 h-4 bg-cream/10 rounded-full" />
          <div className="absolute bottom-40 left-40 w-3 h-3 bg-orange/20 rounded-full" />
          <div className="absolute bottom-32 left-32 w-3 h-3 bg-orange/20 rounded-full" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 py-20 sm:py-32 relative z-10 w-full">
          <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-orange mb-6 animate-fade-in">
            {t("hero_title")}
          </p>
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl text-cream">
            {t("hero_headline")}
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-cream-muted max-w-2xl leading-relaxed">
            {t("hero_subtitle")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="https://dominolive.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange to-gold text-near font-bold text-lg rounded-xl hover:opacity-90 hover:shadow-xl hover:shadow-orange/30 hover:scale-105 transition-all duration-300"
            >
              <DominoIcon name="domino-live-logo" size={24} color="currentColor" className="mr-2" />
              {t("hero_cta_primary")}
            </a>
            <Link
              href="/blog"
              className="glass-button inline-flex items-center justify-center px-8 py-4 text-cream font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-cream/20 transition-all duration-300"
            >
              {t("hero_cta_secondary")}
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Sube de Nivel */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-walnut-light to-walnut">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-green/20 text-green rounded-full mb-6">
                {t("level_badge")}
              </span>
              <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight">
                {t("level_title")}
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-cream-muted leading-relaxed">
                {t("level_subtitle")}
              </p>
              <Link
                href="/blog"
                className="mt-8 inline-flex items-center px-6 py-3 bg-green text-near font-bold rounded-xl hover:bg-green/90 hover:shadow-lg hover:shadow-green/30 transition-all duration-300"
              >
                {t("level_cta")}
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              {/* Decorative card stack */}
              <div className="glass-card rounded-2xl p-8 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange to-gold rounded-xl flex items-center justify-center shadow-lg shadow-orange/20">
                    <DominoIcon name="feature-lessons" size="lg" color="#1a1a1a" weight="fill" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cream">Lecciones Rápidas</h3>
                    <p className="text-sm text-cream-muted">5-10 min cada una</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-cream/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-green to-teal rounded-full" />
                  </div>
                  <div className="h-3 bg-cream/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-orange to-gold rounded-full" />
                  </div>
                  <div className="h-3 bg-cream/10 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-green to-teal rounded-full" />
                  </div>
                </div>
              </div>
              {/* Background accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-green/20 to-transparent rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Juega Contra Bots */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-walnut to-near overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-teal/20 text-teal rounded-full mb-6">
              {t("bots_badge")}
            </span>
            <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight">
              {t("bots_title")}
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-cream-muted max-w-2xl mx-auto leading-relaxed">
              {t("bots_subtitle")}
            </p>
          </div>
          
          {/* Bot characters grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {([
              { 
                signalLevel: 1 as const, 
                label: "Fácil", 
                gradient: "from-[#6B9FBF]/20 to-[#6B9FBF]/5",
                borderColor: "border-[#6B9FBF]/30"
              },
              { 
                signalLevel: 2 as const, 
                label: "Intermedio", 
                gradient: "from-[#5B8FD9]/20 to-[#5B8FD9]/5",
                borderColor: "border-[#5B8FD9]/30"
              },
              { 
                signalLevel: 3 as const, 
                label: "Avanzado", 
                gradient: "from-[#E8973A]/20 to-[#E8973A]/5",
                borderColor: "border-[#E8973A]/30"
              },
              { 
                signalLevel: 4 as const, 
                label: "Experto", 
                gradient: "from-[#C9952C]/20 to-[#C9952C]/5",
                borderColor: "border-[#C9952C]/30"
              },
            ]).map((bot, i) => (
              <div
                key={i}
                className={`glass-card rounded-xl p-4 sm:p-6 text-center hover:scale-105 transition-transform duration-300 bg-gradient-to-br ${bot.gradient} border ${bot.borderColor}`}
              >
                <div className="flex justify-center mb-3">
                  <SignalBars level={bot.signalLevel} size="lg" />
                </div>
                <p className="font-bold text-cream text-sm sm:text-base">{bot.label}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a
              href="https://dominolive.com/play"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal to-green text-near font-bold text-lg rounded-xl hover:opacity-90 hover:shadow-xl hover:shadow-teal/30 transition-all duration-300"
            >
              <DominoIcon name="game-controller" size="lg" color="currentColor" weight="fill" className="mr-2" />
              {t("bots_cta")}
            </a>
          </div>
        </div>
      </section>

      {/* Section 4: DominoLive App Download */}
      <section className="relative py-20 sm:py-28 bg-near overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-orange/10 via-transparent to-transparent rounded-full" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange to-gold rounded-2xl mb-8 shadow-lg shadow-orange/30">
              <DominoIcon name="feature-app" size="xl" color="#1a1a1a" weight="fill" />
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight max-w-3xl mx-auto">
              {t("app_title")}
            </h2>
            <p className="mt-6 text-lg text-cream-muted max-w-xl mx-auto">
              {t("app_subtitle")}
            </p>
            
            {/* App Store Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-white text-near rounded-xl hover:bg-cream transition-colors duration-300 min-w-[180px]"
              >
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <p className="text-xs opacity-75">Download on the</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-white text-near rounded-xl hover:bg-cream transition-colors duration-300 min-w-[180px]"
              >
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <p className="text-xs opacity-75">GET IT ON</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </a>
            </div>
            
            {/* Coming soon badge */}
            <p className="mt-6 text-sm text-cream-muted">
              <span className="inline-block px-3 py-1 bg-cream/10 rounded-full">
                {t("app_coming_soon")}
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
