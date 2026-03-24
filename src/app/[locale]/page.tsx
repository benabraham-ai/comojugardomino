import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { DominoIcon, SignalBars } from "@/components/icons";
import { WebsiteSchema, OrganizationSchema } from "@/components/schema";


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
      {/* Schema.org Structured Data */}
      <WebsiteSchema />
      <OrganizationSchema />

      {/* Section 1: Hero Banner */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background — Espresso with warm gradients */}
        <div className="absolute inset-0 bg-espresso" />
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-dark-surface to-dark-raised" />
        
        {/* Warm ambient glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-mesa/15 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-caribe-teal/10 via-transparent to-transparent rounded-full blur-3xl" />
        </div>
        
        {/* Decorative domino tiles pattern — subtle, opacity 0.05-0.07 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating tile accents */}
          <div className="absolute top-[15%] left-[8%] w-10 h-20 border border-cream/5 rounded-lg -rotate-12 opacity-[0.05]" />
          <div className="absolute bottom-[25%] left-[35%] w-7 h-14 border border-cream/5 rounded-lg rotate-[22deg] opacity-[0.06]" />
          <div className="absolute top-[55%] right-[50%] w-8 h-16 border border-pegue-red/10 rounded-lg -rotate-[7deg] opacity-[0.05]" />
        </div>
        

        {/* Hero inner content container */}
        <div className="max-w-[1100px] mx-auto px-4 sm:px-10 py-24 sm:py-32 relative z-10 w-full">
          <div className="max-w-2xl">
            {/* Hero text content */}
            <div className="relative">
              <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-pegue-red mb-6 animate-fade-in">
                {t("hero_title")}
              </p>
              <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl text-cream">
                {t("hero_headline")}
              </h1>
              <p className="mt-6 text-lg sm:text-xl md:text-2xl text-cream-secondary max-w-2xl leading-relaxed">
                {t("hero_subtitle")}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/waitlist"
                  className="btn-coral inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-xl"
                >
                  <DominoIcon name="domino-live-logo" size={24} color="currentColor" className="mr-2" />
                  {t("hero_cta_primary")}
                </Link>
                <Link
                  href="/blog"
                  className="glass-button inline-flex items-center justify-center px-8 py-4 text-cream font-semibold text-lg rounded-xl hover:bg-cream/10 transition-all duration-300"
                >
                  {t("hero_cta_secondary")}
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="relative py-10 sm:py-12 bg-espresso border-t border-cream/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Main Headline */}
          <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-cream leading-tight">
            {t("trust_headline")}
          </h2>
          
          {/* Waitlist Counter */}
          <p className="mt-4 text-cream-muted text-base sm:text-lg">
            <span className="text-pegue-red font-bold text-lg sm:text-xl">1,247</span>
            {" "}{t("trust_counter_label")}
          </p>
        </div>
      </section>

      {/* Section 2: Sube de Nivel */}
      <section className="relative py-20 sm:py-28 bg-dark-surface">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-caribe-teal/20 text-caribe-teal rounded-full mb-6">
                {t("level_badge")}
              </span>
              <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight">
                {t("level_title")}
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-cream-secondary leading-relaxed">
                {t("level_subtitle")}
              </p>
              <Link
                href="/blog"
                className="mt-8 inline-flex items-center px-6 py-3 btn-teal text-white font-bold rounded-xl"
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
                  <div className="w-12 h-12 bg-gradient-to-br from-pegue-red to-ficha-gold rounded-xl flex items-center justify-center shadow-lg shadow-pegue-red/20">
                    <DominoIcon name="feature-lessons" size="lg" color="#1C0D00" weight="fill" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cream">Lecciones Rápidas</h3>
                    <p className="text-sm text-cream-muted">5-10 min cada una</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-cream/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-caribe-teal to-caribe-teal-light rounded-full" />
                  </div>
                  <div className="h-3 bg-cream/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-pegue-red to-ficha-gold rounded-full" />
                  </div>
                  <div className="h-3 bg-cream/10 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-caribe-teal to-caribe-teal-light rounded-full" />
                  </div>
                </div>
              </div>
              {/* Background accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-caribe-teal/20 to-transparent rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Juega Contra Bots */}
      <section className="relative py-20 sm:py-28 bg-espresso overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-mesa rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pegue-red rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-mesa/20 text-mesa rounded-full mb-6">
              {t("bots_badge")}
            </span>
            <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight">
              {t("bots_title")}
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-cream-secondary max-w-2xl mx-auto leading-relaxed">
              {t("bots_subtitle")}
            </p>
          </div>
          
          {/* Bot characters grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {([
              { 
                signalLevel: 1 as const, 
                label: "Fácil", 
                gradient: "from-caribe-teal/20 to-caribe-teal/5",
                borderColor: "border-caribe-teal/30"
              },
              { 
                signalLevel: 2 as const, 
                label: "Intermedio", 
                gradient: "from-mesa/20 to-mesa/5",
                borderColor: "border-mesa/30"
              },
              { 
                signalLevel: 3 as const, 
                label: "Avanzado", 
                gradient: "from-pegue-red/20 to-pegue-red/5",
                borderColor: "border-pegue-red/30"
              },
              { 
                signalLevel: 4 as const, 
                label: "Experto", 
                gradient: "from-ficha-gold/20 to-ficha-gold/5",
                borderColor: "border-ficha-gold/30"
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
            <Link
              href="/waitlist"
              className="btn-mesa inline-flex items-center px-8 py-4 text-espresso font-bold text-lg rounded-xl"
            >
              <DominoIcon name="game-controller" size="lg" color="currentColor" weight="fill" className="mr-2" />
              {t("bots_cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: DominoLive App Download */}
      <section className="relative py-20 sm:py-28 bg-dark-deep overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-radial from-pegue-red/8 via-transparent to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-caribe-teal/8 via-transparent to-transparent rounded-full blur-2xl" />
        </div>
        
        <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-pegue-red/20 text-pegue-red-light rounded-full mb-6">
            Disponible ahora
          </span>
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight">
            {t("app_title")}
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-cream-secondary leading-relaxed max-w-xl mx-auto">
            {t("app_subtitle")}
          </p>
          
          {/* App Store Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 bg-mesa-blanca text-espresso rounded-xl hover:bg-cream hover:scale-105 transition-all duration-300 min-w-[180px] shadow-lg"
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
              className="inline-flex items-center justify-center px-6 py-3 bg-mesa-blanca text-espresso rounded-xl hover:bg-cream hover:scale-105 transition-all duration-300 min-w-[180px] shadow-lg"
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
          <p className="mt-8 text-sm text-cream-muted">
            <span className="inline-block px-4 py-2 bg-cream/10 rounded-full">
              {t("app_coming_soon")}
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
