"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { DominoIcon } from "@/components/icons";

export default function WaitlistPage() {
  const t = useTranslations("waitlist");
  const locale = useLocale();
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-near via-walnut to-walnut-light" />
        
        {/* Decorative domino tiles pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-8 w-24 h-48 border-2 border-cream/10 rounded-xl rotate-12 opacity-30" />
          <div className="absolute bottom-20 -right-12 w-28 h-56 border-2 border-cream/10 rounded-xl -rotate-12 opacity-20" />
          <div className="absolute top-1/4 right-1/3 w-20 h-40 border-2 border-green/20 rounded-xl rotate-45 opacity-20" />
          <div className="absolute bottom-1/3 left-1/4 w-16 h-32 border-2 border-cream/10 rounded-xl -rotate-6 opacity-25" />
          
          {/* Domino dots pattern */}
          <div className="absolute top-20 right-20 w-4 h-4 bg-cream/10 rounded-full" />
          <div className="absolute top-28 right-28 w-4 h-4 bg-cream/10 rounded-full" />
          <div className="absolute top-24 right-24 w-4 h-4 bg-cream/10 rounded-full" />
          <div className="absolute bottom-40 left-40 w-3 h-3 bg-green/20 rounded-full" />
          <div className="absolute bottom-32 left-32 w-3 h-3 bg-green/20 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-20 sm:py-32 relative z-10 w-full text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green to-teal rounded-2xl shadow-lg shadow-green/30">
              <DominoIcon name="domino-live-logo" size={48} color="#1a1a1a" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-cream">
            {t("hero_headline")}
          </h1>
          
          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-cream-muted max-w-2xl mx-auto leading-relaxed">
            {t("hero_subtitle")}
          </p>

          {/* CTA Label */}
          <p className="mt-10 text-sm font-bold tracking-[0.2em] uppercase text-green">
            {t("hero_cta")}
          </p>

          {/* Waitlist Form */}
          <div className="mt-6 max-w-md mx-auto">
            {status === "success" ? (
              <div className="glass-card rounded-2xl p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-cream">{t("success_message")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("email_placeholder")}
                  required
                  className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-cream placeholder:text-cream-muted focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-8 py-4 bg-green text-near font-bold text-lg rounded-xl hover:bg-green/90 hover:shadow-xl hover:shadow-green/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </span>
                  ) : (
                    t("submit_button")
                  )}
                </button>
              </form>
            )}
            
            {status === "error" && (
              <p className="mt-3 text-red-400 text-sm">{errorMessage}</p>
            )}
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-walnut-light to-walnut">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "users", key: "value_multiplayer" },
              { icon: "flag", key: "value_rules" },
              { icon: "trophy", key: "value_ranked" },
              { icon: "heart", key: "value_community" },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green to-teal rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green/20">
                  <ValueIcon name={item.icon} />
                </div>
                <p className="text-cream font-medium leading-relaxed">{t(item.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Tournament Section */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-walnut to-near overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-gold/10 via-transparent to-transparent rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 text-center border-gold/20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange to-gold rounded-2xl mb-8 shadow-lg shadow-orange/30">
              <svg className="w-10 h-10 text-near" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            
            <span className="inline-block px-4 py-1 text-xs font-bold tracking-wider uppercase bg-gold/20 text-gold rounded-full mb-6">
              {t("tournament_badge")}
            </span>
            
            <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight">
              {t("tournament_headline")}
            </h2>
            
            <p className="mt-6 text-lg text-cream-muted max-w-xl mx-auto leading-relaxed">
              {t("tournament_description")}
            </p>
          </div>
        </div>
      </section>

      {/* Footer Tagline */}
      <section className="py-12 bg-near text-center">
        <p className="text-xl sm:text-2xl font-bold text-cream-muted italic">
          &ldquo;{t("footer_tagline")}&rdquo;
        </p>
      </section>
    </>
  );
}

function ValueIcon({ name }: { name: string }) {
  switch (name) {
    case "users":
      return (
        <svg className="w-6 h-6 text-near" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case "flag":
      return (
        <svg className="w-6 h-6 text-near" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      );
    case "trophy":
      return (
        <svg className="w-6 h-6 text-near" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "heart":
      return (
        <svg className="w-6 h-6 text-near" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    default:
      return null;
  }
}
