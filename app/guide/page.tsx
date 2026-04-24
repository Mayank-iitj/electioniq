"use client";

import { useState } from "react";
import Link from "next/link";
import { useProfileStore, useGuideStore } from "@/store";
import { COUNTRIES } from "@/lib/data/elections";
import { translations } from "@/lib/i18n/translations";
import type { Language } from "@/lib/i18n/translations";

const STEP_ICONS = ["🛡️", "📝", "🔍", "🗳️", "📊"];
const STEP_COLORS = ["#3B82F6", "#8B5CF6", "#06B6D4", "#F97316", "#10B981"];

// Normal mode content
const normalContent = [
  {
    title: "Check Your Eligibility",
    desc: "Before you can vote, confirm you meet the basic requirements: citizenship, age, and residency in your constituency.",
    details: [
      "Must be a citizen of your country",
      "Must be at least 18 years old",
      "Must be an ordinary resident in the constituency",
    ],
    action: "Check Eligibility →",
    actionHref: "/eligibility",
    tips: [
      "India: You need to be 18 on the qualifying date (January 1st of registration year)",
      "USA: You must be 18 by Election Day",
    ],
  },
  {
    title: "Register to Vote",
    desc: "Voter registration adds your name to the electoral roll. Without this, you cannot cast your vote on Election Day.",
    details: [
      "🇮🇳 India: Fill Form 6 at voters.eci.gov.in",
      "🇺🇸 USA: Register at vote.gov or your state's portal",
      "Submit required identity and address documents",
      "Registration typically takes 2–6 weeks to process",
    ],
    action: "View Document Guide →",
    actionHref: "/documents",
    tips: [
      "India: You can register year-round — no fixed deadline",
      "USA: Most states require registration 15–30 days before the election",
    ],
  },
  {
    title: "Verify Your Registration",
    desc: "After registering, confirm your name appears on the voter list and all details are correct.",
    details: [
      "🇮🇳 India: Search your name at voters.eci.gov.in",
      "🇺🇸 USA: Check at vote.gov or your state's website",
      "Verify name, address, constituency, and polling booth",
      "Update any incorrect information immediately",
    ],
    action: "Visit Voter Portal →",
    actionHref: "https://voters.eci.gov.in",
    tips: [
      "India: SMS 'EPIC <voter ID>' to 1950 for a quick check",
      "USA: Contact your local election office if you see errors",
    ],
  },
  {
    title: "Cast Your Vote",
    desc: "On Election Day, go to your designated polling booth and cast your vote. Your ballot is completely secret.",
    details: [
      "Find your polling booth location (check voter portal)",
      "Carry a valid photo ID (Voter ID or alternative)",
      "Polling hours: typically 7 AM – 6 PM",
      "Senior citizens, pregnant women, and PWDs get priority",
    ],
    action: "Ask AI Assistant →",
    actionHref: "/chat",
    tips: [
      "India: Indelible ink is applied to your finger to prevent double voting",
      "USA: Many states allow early voting or mail-in ballots",
      "Your vote is anonymous — no one can trace it back to you",
    ],
  },
  {
    title: "Track Election Results",
    desc: "After voting closes, results are counted and declared. Always follow official sources for accurate results.",
    details: [
      "🇮🇳 India: Live results on results.eci.gov.in",
      "🇺🇸 USA: Follow AP, Reuters, or your state's official site",
      "Results typically available within 24–48 hours",
      "Final certification may take several days",
    ],
    action: "Official Results →",
    actionHref: "https://results.eci.gov.in",
    tips: [
      "India: EVM counting begins after the last phase of voting",
      "USA: Mail-in ballots may take extra time — be patient",
      "Always refer to official sources, not social media rumors",
    ],
  },
];

// ELI5 content
const eli5Content = [
  {
    title: "Are You Allowed to Vote? 🤔",
    desc: "First, check if you're allowed to vote. It's like checking if you meet the age requirement to ride a roller coaster — but WAY more important!",
    details: [
      "✅ You need to be 18 or older",
      "✅ You need to be a citizen of the country",
      "✅ You need to live in the area where you want to vote",
    ],
    tips: ["Think of this as getting your ticket to participate in democracy!"],
    action: "Check if I Can Vote →",
    actionHref: "/eligibility",
  },
  {
    title: "Sign Up to Vote 📝",
    desc: "Voting doesn't happen automatically — you need to officially sign up (register). Think of it like making a reservation at a restaurant, but for democracy.",
    details: [
      "Fill out a simple online or paper form",
      "Provide your ID and where you live",
      "Takes about 5–10 minutes to complete",
      "Wait 2–4 weeks for confirmation",
    ],
    tips: ["India → voters.eci.gov.in | USA → vote.gov. Super easy!"],
    action: "See What Documents I Need →",
    actionHref: "/documents",
  },
  {
    title: "Double-Check Your Name is Listed 🔍",
    desc: "After you register, make sure your name is actually on the voter list. Sometimes errors happen — catch them early!",
    details: [
      "Search your name on the official voter portal",
      "Check your address and polling booth location",
      "If something's wrong, fix it ASAP",
    ],
    tips: ["India: SMS 'EPIC [your voter ID]' to 1950 for an instant check!"],
    action: "Check My Registration →",
    actionHref: "https://voters.eci.gov.in",
  },
  {
    title: "Go Vote! 🗳️",
    desc: "This is the exciting part! Go to your polling booth and press a button. Your voice literally shapes who runs the country!",
    details: [
      "Find your polling booth (it's on your voter card)",
      "Bring your voter ID or any photo ID",
      "Press the button next to your choice on the EVM",
      "Done! You voted! 🎉",
    ],
    tips: [
      "In India, you'll use an EVM — just press the button next to your choice",
      "Nobody can see who you voted for — it's completely private",
    ],
    action: "Ask AI About Voting →",
    actionHref: "/chat",
  },
  {
    title: "Watch the Results 📊",
    desc: "After everyone votes, counting begins! Follow official sources (not WhatsApp forwards!) for accurate results.",
    details: [
      "India: results.eci.gov.in shows live counting",
      "Results usually come out the day after voting ends",
      "The party with the most seats forms the government",
    ],
    tips: ["Ignore rumors on social media — always check official sources!"],
    action: "Official Results →",
    actionHref: "https://results.eci.gov.in",
  },
];

const STEP_NAMES = [
  "Check Eligibility",
  "Register to Vote",
  "Verify Registration",
  "Cast Your Vote",
  "Track Results",
];

export default function GuidePage() {
  const { profile } = useProfileStore();
  const { currentStep, completedSteps, eli5Mode, setStep, completeStep, toggleEli5 } = useGuideStore();
  const lang = profile.language as Language;
  const tx = translations[lang];
  const countryData = COUNTRIES[profile.country];

  const content = eli5Mode ? eli5Content : normalContent;
  const step = content[currentStep];
  const registrationSteps = countryData.voterRegistration.steps;

  return (
    <div style={{ background: "#0A1120", minHeight: "100%" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>

        {/* ===== PAGE HEADER ===== */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "100px",
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(59,130,246,0.25)",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#93C5FD" }}>
              {profile.country === "IN" ? "🇮🇳 India" : "🇺🇸 USA"} Election Process
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "#F1F5F9",
              margin: "0 0 10px",
              lineHeight: 1.1,
            }}
          >
            {tx.guide.title}
          </h1>
          <p style={{ color: "#64748B", fontSize: "15px", margin: "0 0 20px" }}>
            {tx.guide.subtitle}
          </p>

          {/* ELI5 Toggle */}
          <button
            onClick={toggleEli5}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.25s",
              background: eli5Mode ? "linear-gradient(135deg, #F97316, #EA580C)" : "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.3)",
              color: eli5Mode ? "#fff" : "#F97316",
              boxShadow: eli5Mode ? "0 0 18px rgba(249,115,22,0.35)" : "none",
            }}
          >
            🎯 {eli5Mode ? "✓ Simple Mode ON" : tx.guide.eli5Toggle}
          </button>
        </div>

        {/* ===== STEP STEPPER ===== */}
        <div style={{ marginBottom: "28px" }}>
          {/* Step circles row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "4px", position: "relative" }}>
            {content.map((_, i) => {
              const isCompleted = completedSteps.includes(i);
              const isCurrent = i === currentStep;
              const color = STEP_COLORS[i];
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  {/* Connector line */}
                  {i < content.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "22px",
                        left: "calc(50% + 22px)",
                        right: "calc(-50% + 22px)",
                        height: "2px",
                        background: completedSteps.includes(i)
                          ? `linear-gradient(to right, ${color}, ${STEP_COLORS[i + 1]})`
                          : "rgba(59,130,246,0.12)",
                        transition: "background 0.4s",
                        zIndex: 0,
                      }}
                    />
                  )}
                  {/* Circle */}
                  <button
                    onClick={() => setStep(i)}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      position: "relative",
                      zIndex: 1,
                      border: `2px solid ${isCurrent ? color : isCompleted ? color : "rgba(59,130,246,0.15)"}`,
                      background: isCompleted
                        ? `${color}22`
                        : isCurrent
                        ? `linear-gradient(135deg, ${color}33, ${color}11)`
                        : "rgba(15,23,42,0.8)",
                      boxShadow: isCurrent ? `0 0 18px ${color}55` : "none",
                      transform: isCurrent ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {isCompleted ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      STEP_ICONS[i]
                    )}
                  </button>
                  {/* Label */}
                  <span
                    style={{
                      fontSize: "11px",
                      textAlign: "center",
                      marginTop: "6px",
                      fontWeight: isCurrent ? 600 : 400,
                      color: isCurrent ? color : isCompleted ? "#64748B" : "#334155",
                      lineHeight: 1.3,
                      maxWidth: "80px",
                    }}
                  >
                    {STEP_NAMES[i]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "#334155" }}>Progress</span>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#60A5FA" }}>
                {Math.round((completedSteps.length / 5) * 100)}% Complete
              </span>
            </div>
            <div style={{ height: "5px", borderRadius: "100px", background: "rgba(30,41,59,0.8)", overflow: "hidden" }}>
              <div
                className="progress-bar"
                style={{
                  height: "100%",
                  borderRadius: "100px",
                  width: `${(completedSteps.length / 5) * 100}%`,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* ===== TWO-COLUMN CONTENT ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

          {/* LEFT: Step Detail Card */}
          <div
            style={{
              borderRadius: "20px",
              padding: "28px",
              background: `linear-gradient(145deg, ${STEP_COLORS[currentStep]}12 0%, rgba(30,41,59,0.8) 100%)`,
              border: `1px solid ${STEP_COLORS[currentStep]}35`,
              boxShadow: `0 0 40px ${STEP_COLORS[currentStep]}10`,
            }}
          >
            {/* Step header */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  flexShrink: 0,
                  background: `${STEP_COLORS[currentStep]}18`,
                  border: `1px solid ${STEP_COLORS[currentStep]}35`,
                }}
              >
                {STEP_ICONS[currentStep]}
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: STEP_COLORS[currentStep], margin: "0 0 4px", letterSpacing: "0.05em" }}>
                  STEP {currentStep + 1} OF 5
                </p>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#F1F5F9", margin: 0, lineHeight: 1.2 }}>
                  {step.title}
                </h2>
              </div>
            </div>

            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#94A3B8", marginBottom: "18px" }}>
              {step.desc}
            </p>

            {/* Detail items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" }}>
              {step.details.map((detail, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "rgba(15,23,42,0.6)",
                    border: "1px solid rgba(59,130,246,0.08)",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      flexShrink: 0,
                      background: `${STEP_COLORS[currentStep]}20`,
                      color: STEP_COLORS[currentStep],
                      fontWeight: 700,
                      marginTop: "1px",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span style={{ fontSize: "13px", color: "#CBD5E1", lineHeight: "1.5" }}>{detail}</span>
                </div>
              ))}
            </div>

            {/* Tips */}
            {step.tips && step.tips.length > 0 && (
              <div
                style={{
                  borderRadius: "12px",
                  padding: "14px",
                  marginBottom: "20px",
                  background: "rgba(16,185,129,0.07)",
                  border: "1px solid rgba(16,185,129,0.18)",
                }}
              >
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#34D399", margin: "0 0 8px", letterSpacing: "0.04em" }}>
                  💡 PRO TIPS
                </p>
                {step.tips.map((tip, i) => (
                  <p key={i} style={{ fontSize: "12px", color: "#94A3B8", margin: "0 0 4px", lineHeight: "1.5" }}>
                    • {tip}
                  </p>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {currentStep > 0 && (
                <button
                  onClick={() => setStep(currentStep - 1)}
                  className="btn-ghost"
                  style={{ flex: 1, padding: "11px", fontSize: "13px" }}
                >
                  ← Back
                </button>
              )}
              <button
                onClick={() => completeStep(currentStep)}
                className="btn-primary"
                style={{ flex: 2, padding: "11px", fontSize: "13px" }}
              >
                {currentStep < 4 ? "Mark Complete & Continue →" : "🎉 Complete!"}
              </button>
            </div>
          </div>

          {/* RIGHT: Registration process + links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Official Registration Steps */}
            <div
              style={{
                borderRadius: "20px",
                padding: "24px",
                background: "rgba(30,41,59,0.6)",
                border: "1px solid rgba(59,130,246,0.12)",
                flex: 1,
              }}
            >
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#93C5FD", margin: "0 0 4px" }}>
                {profile.country === "IN" ? "🇮🇳" : "🇺🇸"} Official Registration Process
              </h3>
              <p style={{ fontSize: "12px", color: "#334155", margin: "0 0 16px" }}>
                Source: {countryData.commission}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {registrationSteps.map((s) => (
                  <div key={s.step} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        flexShrink: 0,
                        background: s.color + "18",
                        border: `1px solid ${s.color}35`,
                        color: s.color,
                      }}
                    >
                      {s.step}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#E2E8F0", margin: "0 0 2px" }}>
                        {s.title}
                      </p>
                      <p style={{ fontSize: "12px", color: "#64748B", margin: 0, lineHeight: "1.5" }}>
                        {s.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Links */}
            <div
              style={{
                borderRadius: "20px",
                padding: "20px",
                background: "rgba(30,41,59,0.4)",
                border: "1px solid rgba(59,130,246,0.1)",
              }}
            >
              <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#93C5FD", margin: "0 0 12px" }}>
                🔗 Official Links
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {countryData.sources.map((src) => (
                  <a
                    key={src.url}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "rgba(15,23,42,0.6)",
                      border: "1px solid rgba(59,130,246,0.08)",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.08)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(15,23,42,0.6)";
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "#93C5FD" }}>{src.name}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick action */}
            <Link
              href="/eligibility"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.1))",
                border: "1px solid rgba(16,185,129,0.25)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
                color: "#34D399",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(16,185,129,0.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              ✅ Check Your Eligibility First
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
