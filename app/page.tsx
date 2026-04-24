"use client";

import Link from "next/link";
import { useProfileStore } from "@/store";
import { translations } from "@/lib/i18n/translations";
import type { Language } from "@/lib/i18n/translations";

const FEATURES = [
  {
    key: "chat",
    href: "/chat",
    icon: "💬",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.2)",
    gradient: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(29,78,216,0.05))",
    border: "rgba(59,130,246,0.25)",
  },
  {
    key: "guide",
    href: "/guide",
    icon: "📋",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.2)",
    gradient: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(109,40,217,0.05))",
    border: "rgba(139,92,246,0.25)",
  },
  {
    key: "timeline",
    href: "/timeline",
    icon: "📅",
    color: "#F97316",
    glow: "rgba(249,115,22,0.2)",
    gradient: "linear-gradient(135deg, rgba(234,88,12,0.15), rgba(194,65,12,0.05))",
    border: "rgba(249,115,22,0.25)",
  },
  {
    key: "eligibility",
    href: "/eligibility",
    icon: "✅",
    color: "#10B981",
    glow: "rgba(16,185,129,0.2)",
    gradient: "linear-gradient(135deg, rgba(5,150,105,0.15), rgba(4,120,87,0.05))",
    border: "rgba(16,185,129,0.25)",
  },
];

const STATS = [
  { value: "900M+", label: "Eligible Indian Voters", icon: "🇮🇳" },
  { value: "240M+", label: "Registered US Voters", icon: "🇺🇸" },
  { value: "2", label: "Languages Supported", icon: "🌐" },
  { value: "100%", label: "Non-Partisan", icon: "⚖️" },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Ask a Question", desc: "Type anything about elections in English or Hindi. Our AI understands your question.", icon: "💬" },
  { step: "2", title: "Get Instant Answers", desc: "Receive clear, step-by-step guidance grounded in official government sources.", icon: "⚡" },
  { step: "3", title: "Follow the Guide", desc: "Use interactive tools — timelines, eligibility checker, document guides — to take action.", icon: "🗺️" },
];

export default function HomePage() {
  const { profile } = useProfileStore();
  const lang = profile.language as Language;
  const tx = translations[lang];

  return (
    <div className="hero-bg grid-bg min-h-screen pb-16 w-full">
      
      {/* ===== HERO ===== */}
      <section className="relative w-full py-12 px-4 md:py-20 md:px-6 mb-0 block">
        {/* Background orbs */}
        <div
          className="absolute top-10 md:top-20 left-0 md:left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full pointer-events-none opacity-60 z-0"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-0 md:bottom-10 right-0 md:right-1/4 w-64 h-64 md:w-80 md:h-80 rounded-full pointer-events-none opacity-60 z-0"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 text-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in mx-auto bg-slate-800/70 border border-blue-500/30 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-300">
              {tx.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 animate-slide-up leading-tight text-slate-50">
            <span>{tx.hero.headline}</span>
            <br className="hidden sm:block" />
            {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
              {tx.hero.headlineAccent}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in font-medium text-slate-400">
            {tx.hero.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-lg mx-auto mb-12 animate-fade-in">
            <Link
              href="/chat"
              className="btn-primary flex items-center justify-center gap-3 text-base sm:text-lg px-8 py-4 w-full sm:w-auto shadow-glow-sm rounded-xl font-bold"
            >
              <span className="text-xl">💬</span>
              {tx.hero.cta}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/guide"
              className="btn-ghost flex items-center justify-center gap-3 text-base sm:text-lg px-8 py-4 w-full sm:w-auto hover:bg-slate-800 rounded-xl font-semibold bg-slate-800/60"
            >
              <span className="text-xl">📋</span>
              {tx.hero.ctaSecondary}
            </Link>
          </div>

          {/* Trust badge */}
          <div className="flex items-center justify-center gap-3 animate-fade-in">
            <div className="flex -space-x-2">
              {["🇮🇳", "🇺🇸"].map((flag, i) => (
                <span
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md bg-slate-800 border-2 border-blue-500/40"
                >
                  {flag}
                </span>
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-slate-400">
              ✅ {tx.hero.trustBadge}
            </span>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative z-10 w-full py-12 px-4 md:py-20 md:px-6 mb-0 block">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {STATS.map((stat) => (
              <div 
                key={stat.label} 
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-800/60 backdrop-blur-md border border-blue-500/15"
              >
                <div className="text-3xl mb-3 opacity-90">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-50 to-slate-400">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium uppercase tracking-wider text-center text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="relative z-10 w-full py-12 px-4 md:py-20 md:px-6 mb-0 block">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-slate-50">
              Everything You Need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Participate
              </span>
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto font-medium text-slate-500">
              From understanding your eligibility to casting your vote — we guide you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 px-6 box-border">
            {FEATURES.map(({ key, href, icon, color, gradient, border }) => {
              const feature = tx.features[key as keyof typeof tx.features];
              return (
                <Link
                  key={key}
                  href={href}
                  className="group flex flex-col relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] overflow-hidden box-border"
                  style={{
                    background: gradient,
                    border: `1px solid ${border}`,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm transition-transform group-hover:scale-110 shrink-0"
                    style={{ background: `${color}25`, border: `1px solid ${color}40` }}
                  >
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-50">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed flex-1 mb-6 text-slate-400">
                    {feature.desc}
                  </p>
                  <div
                    className="mt-auto flex items-center gap-2 text-sm font-bold group-hover:gap-4 transition-all"
                    style={{ color }}
                  >
                    Explore Feature
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative z-10 w-full py-12 px-4 md:py-20 md:px-6 mb-0 clear-both block">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-slate-50">
              How ElectIQ Works
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto font-medium text-slate-500">
              Get comprehensive civic guidance in three simple steps.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 relative w-full pt-4 before:content-[''] before:hidden md:before:block before:absolute before:w-2/3 before:h-1 before:rounded-full before:z-0 before:top-16 before:left-1/2 before:-translate-x-1/2 before:bg-gradient-to-r before:from-transparent before:via-blue-500/30 before:to-transparent">
            {HOW_IT_WORKS.map((item) => (
              <div 
                key={item.step} 
                className="relative z-1 text-center bg-slate-900/60 border border-blue-500/10 p-8 rounded-3xl backdrop-blur-md w-full max-w-[320px] flex-[1_1_200px]"
              >
                {/* Step Badge absolutely positioned */}
                <div 
                  className="absolute z-10 flex items-center justify-center shadow-glow-sm text-white font-bold bg-gradient-to-br from-blue-600 to-blue-800 border-4 border-slate-900 rounded-full"
                  style={{ top: "-14px", right: "-14px", width: "40px", height: "40px", fontSize: "16px" }}
                >
                  {item.step}
                </div>

                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto bg-gradient-to-br from-blue-600/15 to-purple-600/5 border border-blue-500/20">
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-slate-50">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative z-0 w-full mt-16 py-16 px-8 mb-0 block">
        <div className="max-w-7xl mx-auto w-full">
          <div className="rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden bg-gradient-to-br from-blue-600/15 to-purple-600/15 border border-blue-400/30 shadow-glow-lg backdrop-blur-xl">
            <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.1)_0%,transparent_80%)]" />
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 tracking-tight leading-tight text-slate-50">
              Your Vote,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Your Power
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed text-slate-400">
              In the 2024 Indian election, over 30 constituencies were decided by margins of under 1,000 votes. Your civic participation directly shapes the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
              <Link 
                href="/eligibility" 
                className="btn-primary w-full sm:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 text-base font-bold shadow-glow-sm rounded-xl"
              >
                <span className="text-xl">✅</span> Check My Eligibility
              </Link>
              <Link 
                href="/chat" 
                className="btn-ghost w-full sm:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 text-base font-bold bg-slate-800 hover:bg-slate-700 rounded-xl border border-white/10"
              >
                <span className="text-xl">💬</span> Ask AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
