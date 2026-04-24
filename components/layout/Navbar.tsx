"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useProfileStore } from "@/store";
import { translations } from "@/lib/i18n/translations";
import type { Language } from "@/lib/i18n/translations";

const NAV_LINKS = [
  { key: "chat", href: "/chat", icon: "💬" },
  { key: "guide", href: "/guide", icon: "📋" },
  { key: "timeline", href: "/timeline", icon: "📅" },
  { key: "eligibility", href: "/eligibility", icon: "✅" },
  { key: "documents", href: "/documents", icon: "📄" },
];

export function Navbar() {
  const pathname = usePathname();
  const { profile, setLanguage, setCountry } = useProfileStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const lang = profile.language as Language;
  const nav = translations[lang].nav;

  const navLabels: Record<string, string> = {
    chat: nav.chat,
    guide: nav.guide,
    timeline: nav.timeline,
    eligibility: nav.eligibility,
    documents: nav.documents,
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(15,23,42,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(59,130,246,0.12)",
        boxShadow: "0 1px 0 rgba(59,130,246,0.06)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                boxShadow: "0 0 12px rgba(37,99,235,0.35)",
              }}
            >
              ⚡
            </div>
            <div className="hidden sm:block">
              <span
                className="text-lg font-extrabold tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #60A5FA, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ElectIQ
              </span>
            </div>
          </Link>

          {/* Desktop Nav — centered */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map(({ key, href, icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className={`nav-item ${active ? "active" : ""}`}
                  style={{ fontSize: "13px", padding: "7px 12px", gap: "6px" }}
                >
                  <span style={{ fontSize: "13px" }}>{icon}</span>
                  <span>{navLabels[key]}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Controls — always visible, compact */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {/* Country Toggle */}
            <div
              className="hidden sm:flex items-center rounded-lg overflow-hidden"
              style={{ border: "1px solid rgba(59,130,246,0.18)", background: "rgba(15,23,42,0.6)" }}
            >
              {(["IN", "US"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCountry(c)}
                  title={c === "IN" ? "India" : "United States"}
                  className="px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 flex items-center gap-1"
                  style={{
                    background: profile.country === c ? "linear-gradient(135deg, #2563EB, #1D4ED8)" : "transparent",
                    color: profile.country === c ? "#fff" : "#64748B",
                  }}
                >
                  <span>{c === "IN" ? "🇮🇳" : "🇺🇸"}</span>
                  <span className="hidden lg:inline">{c}</span>
                </button>
              ))}
            </div>

            {/* Language Toggle */}
            <div
              className="hidden sm:flex items-center rounded-lg overflow-hidden"
              style={{ border: "1px solid rgba(124,58,237,0.18)", background: "rgba(15,23,42,0.6)" }}
            >
              {(["en", "hi"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className="px-2.5 py-1.5 text-xs font-semibold transition-all duration-200"
                  style={{
                    background: profile.language === l ? "linear-gradient(135deg, #7C3AED, #6D28D9)" : "transparent",
                    color: profile.language === l ? "#fff" : "#64748B",
                    fontFamily: l === "hi" ? "Noto Sans Devanagari, sans-serif" : "inherit",
                    minWidth: "32px",
                  }}
                >
                  {l === "en" ? "EN" : "हि"}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "#94A3B8", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div
            className="md:hidden pb-4 pt-2"
            style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}
          >
            <div className="flex flex-col gap-1 mb-3">
              {NAV_LINKS.map(({ key, href, icon }) => (
                <Link
                  key={key}
                  href={href}
                  className={`nav-item ${pathname === href ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{icon}</span>
                  <span>{navLabels[key]}</span>
                </Link>
              ))}
            </div>
            <div className="flex gap-2 px-1">
              <div
                className="flex rounded-lg overflow-hidden flex-1"
                style={{ border: "1px solid rgba(59,130,246,0.2)" }}
              >
                {(["IN", "US"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCountry(c)}
                    className="flex-1 py-2 text-xs font-semibold transition-all"
                    style={{
                      background: profile.country === c ? "linear-gradient(135deg, #2563EB, #1D4ED8)" : "transparent",
                      color: profile.country === c ? "#fff" : "#94A3B8",
                    }}
                  >
                    {c === "IN" ? "🇮🇳 India" : "🇺🇸 USA"}
                  </button>
                ))}
              </div>
              <div
                className="flex rounded-lg overflow-hidden"
                style={{ border: "1px solid rgba(124,58,237,0.2)" }}
              >
                {(["en", "hi"] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className="px-4 py-2 text-xs font-semibold transition-all"
                    style={{
                      background: profile.language === l ? "linear-gradient(135deg, #7C3AED, #6D28D9)" : "transparent",
                      color: profile.language === l ? "#fff" : "#94A3B8",
                    }}
                  >
                    {l === "en" ? "EN" : "हि"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
