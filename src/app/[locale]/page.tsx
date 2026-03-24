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
        {/* Background — Dark Earth with warm gradients */}
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-surface to-dark-raised" />
        
        {/* Warm ambient glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-earth-brown/15 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-earth-olive/10 via-transparent to-transparent rounded-full blur-3xl" />
        </div>
        
        {/* Decorative domino tiles pattern — subtle, opacity 0.05-0.07 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating tile accents */}
          <div className="absolute top-[15%] left-[8%] w-10 h-20 border border-cream/5 rounded-lg -rotate-12 opacity-[0.05]" />
          <div className="absolute bottom-[25%] left-[35%] w-7 h-14 border border-cream/5 rounded-lg rotate-[22deg] opacity-[0.06]" />
          <div className="absolute top-[55%] right-[50%] w-8 h-16 border border-coral/10 rounded-lg -rotate-[7deg] opacity-[0.05]" />
        </div>
        

        {/* Hero inner content container */}
        <div className="max-w-[1100px] mx-auto px-4 sm:px-10 py-24 sm:py-32 relative z-10 w-full">
          <div className="max-w-2xl">
            {/* Hero text content */}
            <div className="relative">
              <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-coral mb-6 animate-fade-in">
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

      {/* Trust Bar Section */}
      <section className="relative py-8 sm:py-10 bg-dark border-t border-cream/5">
        <div className="max-w-4xl mx-auto px-4">
          {/* Row 1: Feature Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {[
              { emoji: "🎙️", key: "trust_live_voice" },
              { emoji: "⚡", key: "trust_realtime" },
              { emoji: "🏆", key: "trust_tournaments" },
              { emoji: "📱", key: "trust_mobile" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-coral text-lg sm:text-xl">{item.emoji}</span>
                <span className="text-cream-muted text-sm font-medium">{t(item.key)}</span>
              </div>
            ))}
          </div>
          
          {/* Row 2: Waitlist Counter */}
          <div className="mt-6 text-center">
            <p className="text-cream-muted text-sm">
              <span className="text-cream font-bold text-base sm:text-lg">1,247</span>
              {" "}{t("trust_counter_label")}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Sube de Nivel */}
      <section className="relative py-20 sm:py-28 bg-dark-surface">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-earth-olive/20 text-earth-olive-light rounded-full mb-6">
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
                className="mt-8 inline-flex items-center px-6 py-3 btn-earth-olive text-white font-bold rounded-xl"
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
                  <div className="w-12 h-12 bg-gradient-to-br from-coral to-gold rounded-xl flex items-center justify-center shadow-lg shadow-coral/20">
                    <DominoIcon name="feature-lessons" size="lg" color="#1A1714" weight="fill" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cream">Lecciones Rápidas</h3>
                    <p className="text-sm text-cream-muted">5-10 min cada una</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-cream/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-earth-olive to-earth-olive-light rounded-full" />
                  </div>
                  <div className="h-3 bg-cream/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-coral to-gold rounded-full" />
                  </div>
                  <div className="h-3 bg-cream/10 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-earth-olive to-earth-olive-light rounded-full" />
                  </div>
                </div>
              </div>
              {/* Background accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-earth-olive/20 to-transparent rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Juega Contra Bots */}
      <section className="relative py-20 sm:py-28 bg-dark overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-earth-khaki rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-coral rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-earth-khaki/20 text-earth-khaki-light rounded-full mb-6">
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
                gradient: "from-earth-olive/20 to-earth-olive/5",
                borderColor: "border-earth-olive/30"
              },
              { 
                signalLevel: 2 as const, 
                label: "Intermedio", 
                gradient: "from-earth-khaki/20 to-earth-khaki/5",
                borderColor: "border-earth-khaki/30"
              },
              { 
                signalLevel: 3 as const, 
                label: "Avanzado", 
                gradient: "from-earth-terracotta/20 to-earth-terracotta/5",
                borderColor: "border-earth-terracotta/30"
              },
              { 
                signalLevel: 4 as const, 
                label: "Experto", 
                gradient: "from-gold/20 to-gold/5",
                borderColor: "border-gold/30"
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
              className="btn-earth-khaki inline-flex items-center px-8 py-4 text-dark font-bold text-lg rounded-xl"
            >
              <DominoIcon name="game-controller" size="lg" color="currentColor" weight="fill" className="mr-2" />
              {t("bots_cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: DominoLive App Download — Chess.com Style */}
      <section className="relative py-20 sm:py-28 bg-dark-deep overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-radial from-coral/8 via-transparent to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-earth-olive/8 via-transparent to-transparent rounded-full blur-2xl" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side: Text + Download Buttons */}
            <div className="order-2 md:order-1">
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-coral/20 text-coral-light rounded-full mb-6">
                Disponible ahora
              </span>
              <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight">
                {t("app_title")}
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-cream-secondary leading-relaxed max-w-md">
                {t("app_subtitle")}
              </p>
              
              {/* App Store Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-ivory text-dark rounded-xl hover:bg-cream hover:scale-105 transition-all duration-300 min-w-[180px] shadow-lg"
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
                  className="inline-flex items-center px-6 py-3 bg-ivory text-dark rounded-xl hover:bg-cream hover:scale-105 transition-all duration-300 min-w-[180px] shadow-lg"
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
            
            {/* Right Side: Phone Mockup */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div className="relative transform rotate-[8deg] hover:rotate-[5deg] transition-transform duration-500">
                {/* Phone shadow */}
                <div className="absolute inset-0 bg-black/40 rounded-[3rem] blur-2xl translate-x-4 translate-y-8 scale-95" />
                
                {/* iPhone Frame */}
                <div className="relative w-[280px] sm:w-[320px] h-[560px] sm:h-[640px] bg-gradient-to-b from-[#2A2420] to-[#1A1714] rounded-[3rem] p-2 border border-cream/10 shadow-2xl">
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20" />
                  
                  {/* Screen Content */}
                  <div className="relative w-full h-full bg-[#0D0B0A] rounded-[2.5rem] overflow-hidden">
                    {/* App Top Bar */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#1A1714] to-transparent z-10 pt-10 px-4">
                      <div className="flex items-center justify-between">
                        <span className="text-coral font-bold text-sm tracking-wide">dominolive</span>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-earth-olive" />
                          <span className="text-cream text-xs">1247</span>
                          <span className="text-lg">🇩🇴</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Game Timer */}
                    <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-dark-raised/90 backdrop-blur-sm px-4 py-2 rounded-full border border-cream/10">
                        <span className="text-gold font-mono font-bold text-lg">2:45</span>
                      </div>
                    </div>
                    
                    {/* Domino Board - Dark Wood */}
                    <div className="absolute inset-0 top-20 bottom-32 flex items-center justify-center">
                      <div className="w-[90%] h-[70%] bg-gradient-to-br from-[#3D2B1F] via-[#2A1E16] to-[#1E150F] rounded-xl border border-[#4A3828]/50 shadow-inner relative">
                        {/* Domino tiles on board - horizontal chain */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet">
                          {/* Domino Tile 1: [3|2] */}
                          <g transform="translate(30, 60)">
                            <rect x="0" y="0" width="35" height="18" rx="2" fill="#F0ECE2" stroke="#C8BC9F" strokeWidth="0.5"/>
                            <line x1="17.5" y1="2" x2="17.5" y2="16" stroke="#C8BC9F" strokeWidth="0.5"/>
                            {/* 3 dots */}
                            <circle cx="5" cy="5" r="1.5" fill="#1A1714"/>
                            <circle cx="8.75" cy="9" r="1.5" fill="#1A1714"/>
                            <circle cx="12.5" cy="13" r="1.5" fill="#1A1714"/>
                            {/* 2 dots */}
                            <circle cx="22.5" cy="5" r="1.5" fill="#1A1714"/>
                            <circle cx="27.5" cy="13" r="1.5" fill="#1A1714"/>
                          </g>
                          
                          {/* Domino Tile 2: [2|5] */}
                          <g transform="translate(65, 60)">
                            <rect x="0" y="0" width="35" height="18" rx="2" fill="#F0ECE2" stroke="#C8BC9F" strokeWidth="0.5"/>
                            <line x1="17.5" y1="2" x2="17.5" y2="16" stroke="#C8BC9F" strokeWidth="0.5"/>
                            {/* 2 dots */}
                            <circle cx="5" cy="5" r="1.5" fill="#1A1714"/>
                            <circle cx="12.5" cy="13" r="1.5" fill="#1A1714"/>
                            {/* 5 dots */}
                            <circle cx="22.5" cy="5" r="1.5" fill="#1A1714"/>
                            <circle cx="30" cy="5" r="1.5" fill="#1A1714"/>
                            <circle cx="26.25" cy="9" r="1.5" fill="#1A1714"/>
                            <circle cx="22.5" cy="13" r="1.5" fill="#1A1714"/>
                            <circle cx="30" cy="13" r="1.5" fill="#1A1714"/>
                          </g>
                          
                          {/* Domino Tile 3: [5|4] - vertical */}
                          <g transform="translate(100, 45) rotate(90)">
                            <rect x="0" y="0" width="35" height="18" rx="2" fill="#F0ECE2" stroke="#C8BC9F" strokeWidth="0.5"/>
                            <line x1="17.5" y1="2" x2="17.5" y2="16" stroke="#C8BC9F" strokeWidth="0.5"/>
                            {/* 5 dots */}
                            <circle cx="5" cy="5" r="1.5" fill="#1A1714"/>
                            <circle cx="12.5" cy="5" r="1.5" fill="#1A1714"/>
                            <circle cx="8.75" cy="9" r="1.5" fill="#1A1714"/>
                            <circle cx="5" cy="13" r="1.5" fill="#1A1714"/>
                            <circle cx="12.5" cy="13" r="1.5" fill="#1A1714"/>
                            {/* 4 dots */}
                            <circle cx="22.5" cy="5" r="1.5" fill="#1A1714"/>
                            <circle cx="30" cy="5" r="1.5" fill="#1A1714"/>
                            <circle cx="22.5" cy="13" r="1.5" fill="#1A1714"/>
                            <circle cx="30" cy="13" r="1.5" fill="#1A1714"/>
                          </g>
                          
                          {/* Domino Tile 4: [4|6] */}
                          <g transform="translate(120, 60)">
                            <rect x="0" y="0" width="35" height="18" rx="2" fill="#F0ECE2" stroke="#C8BC9F" strokeWidth="0.5"/>
                            <line x1="17.5" y1="2" x2="17.5" y2="16" stroke="#C8BC9F" strokeWidth="0.5"/>
                            {/* 4 dots */}
                            <circle cx="5" cy="5" r="1.5" fill="#1A1714"/>
                            <circle cx="12.5" cy="5" r="1.5" fill="#1A1714"/>
                            <circle cx="5" cy="13" r="1.5" fill="#1A1714"/>
                            <circle cx="12.5" cy="13" r="1.5" fill="#1A1714"/>
                            {/* 6 dots */}
                            <circle cx="22.5" cy="4" r="1.5" fill="#1A1714"/>
                            <circle cx="30" cy="4" r="1.5" fill="#1A1714"/>
                            <circle cx="22.5" cy="9" r="1.5" fill="#1A1714"/>
                            <circle cx="30" cy="9" r="1.5" fill="#1A1714"/>
                            <circle cx="22.5" cy="14" r="1.5" fill="#1A1714"/>
                            <circle cx="30" cy="14" r="1.5" fill="#1A1714"/>
                          </g>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Player's Hand at Bottom */}
                    <div className="absolute bottom-4 left-0 right-0 px-4">
                      <div className="flex justify-center gap-1">
                        {/* Hand tiles - standing vertically */}
                        {[
                          { dots1: 1, dots2: 4 },
                          { dots1: 6, dots2: 3 },
                          { dots1: 0, dots2: 2 },
                          { dots1: 5, dots2: 5 },
                        ].map((tile, i) => (
                          <div
                            key={i}
                            className={`w-8 h-16 bg-ivory rounded-md border border-cream-muted shadow-md flex flex-col items-center justify-between py-1 ${i === 1 ? 'transform -translate-y-2 ring-2 ring-coral/50' : ''}`}
                          >
                            <div className="w-6 h-6 flex flex-wrap justify-center items-center gap-0.5">
                              {[...Array(tile.dots1)].map((_, d) => (
                                <div key={d} className="w-1.5 h-1.5 bg-dark rounded-full" />
                              ))}
                            </div>
                            <div className="w-5 h-px bg-cream-muted/50" />
                            <div className="w-6 h-6 flex flex-wrap justify-center items-center gap-0.5">
                              {[...Array(tile.dots2)].map((_, d) => (
                                <div key={d} className="w-1.5 h-1.5 bg-dark rounded-full" />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Subtle screen glare */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
                
                {/* Hand reaching to place tile (like Chess.com) */}
                <div className="absolute -bottom-4 -right-8 sm:-right-12 w-24 sm:w-32 h-32 sm:h-40 z-30 hidden sm:block">
                  <svg viewBox="0 0 100 120" className="w-full h-full">
                    {/* Simplified hand silhouette */}
                    <path
                      d="M75,120 L75,80 Q75,70 70,65 L70,45 Q70,38 63,38 L63,30 Q63,25 58,25 L58,45 L58,28 Q58,22 52,22 L52,48 L52,25 Q52,18 45,18 L45,55 L40,35 Q38,28 32,30 L38,70 Q42,85 50,95 L50,120 Z"
                      fill="#E8C9A8"
                      stroke="#D4A574"
                      strokeWidth="1.5"
                    />
                    {/* Tile being held */}
                    <g transform="translate(42, 5) rotate(-15)">
                      <rect x="0" y="0" width="20" height="38" rx="3" fill="#F0ECE2" stroke="#C8BC9F" strokeWidth="1"/>
                      <line x1="0" y1="19" x2="20" y2="19" stroke="#C8BC9F" strokeWidth="0.5"/>
                      {/* 6 dots top */}
                      <circle cx="6" cy="6" r="2" fill="#1A1714"/>
                      <circle cx="14" cy="6" r="2" fill="#1A1714"/>
                      <circle cx="6" cy="10" r="2" fill="#1A1714"/>
                      <circle cx="14" cy="10" r="2" fill="#1A1714"/>
                      <circle cx="6" cy="14" r="2" fill="#1A1714"/>
                      <circle cx="14" cy="14" r="2" fill="#1A1714"/>
                      {/* 1 dot bottom */}
                      <circle cx="10" cy="28" r="2" fill="#1A1714"/>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
