"use client";

import { useState } from "react";
import { useProfileStore, useEligibilityStore } from "@/store";
import { indiaElectionData, usaElectionData } from "@/lib/data/elections";
import { translations } from "@/lib/i18n/translations";
import type { Language } from "@/lib/i18n/translations";

type Country = "IN" | "US";

const CITIZENSHIP_OPTIONS = {
  IN: [
    { value: "indian", label: "🇮🇳 Indian Citizen" },
    { value: "pio", label: "🌏 Person of Indian Origin (PIO)" },
    { value: "oci", label: "📋 Overseas Citizen of India (OCI)" },
    { value: "foreign", label: "🌐 Foreign National / NRI" },
  ],
  US: [
    { value: "us-citizen", label: "🇺🇸 US Citizen (by birth)" },
    { value: "naturalized", label: "📜 Naturalized US Citizen" },
    { value: "green-card", label: "💚 Permanent Resident (Green Card)" },
    { value: "visa", label: "✈️ Visa Holder / Non-immigrant" },
  ],
};

export default function EligibilityPage() {
  const { profile, setCountry: setProfileCountry } = useProfileStore();
  const { result, setResult } = useEligibilityStore();
  const lang = profile.language as Language;
  const tx = translations[lang];

  const [age, setAge] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [country, setCountry] = useState<Country>(profile.country);
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const stateOptions = country === "IN" ? indiaElectionData.states : [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming", "District of Columbia",
  ];

  const handleCheck = async () => {
    if (!age || !citizenship) return;
    setLoading(true);
    try {
      const res = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, citizenship, country, state }),
      });
      const data = await res.json();
      setResult(data);
      setFormStep(2);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAge("");
    setCitizenship("");
    setState("");
    setResult(null);
    setFormStep(0);
  };

  const ageNum = parseInt(age, 10);
  const isStep0Valid = age && ageNum > 0 && ageNum < 120;
  const isFormValid = isStep0Valid && citizenship;

  const statusConfig = {
    eligible: { emoji: "🎉", title: tx.eligibility.results.eligible, cardClass: "eligible-card", color: "#10B981" },
    "not-eligible": { emoji: "⛔", title: tx.eligibility.results.notEligible, cardClass: "not-eligible-card", color: "#EF4444" },
    partial: { emoji: "⚠️", title: tx.eligibility.results.partial, cardClass: "partial-eligible-card", color: "#F97316" },
  };

  return (
    <div style={{ background: "#0A1120", minHeight: "100%" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 20px" }}>

        {/* ===== HEADER ===== */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "100px",
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
              marginBottom: "14px",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#34D399" }}>✅ Eligibility Checker</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#F1F5F9", margin: "0 0 10px", lineHeight: 1.1 }}>
            {tx.eligibility.title}
          </h1>
          <p style={{ color: "#64748B", fontSize: "15px", margin: 0 }}>
            {tx.eligibility.subtitle}
          </p>
        </div>

        {/* Quick Facts */}
        {formStep < 2 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
            {[
              { icon: "🎂", label: "Minimum Age", value: "18 years" },
              { icon: "🪪", label: "Citizenship", value: "Required" },
              { icon: "📍", label: "Residency", value: "In your district" },
            ].map((f) => (
              <div
                key={f.label}
                style={{
                  borderRadius: "14px",
                  padding: "14px",
                  textAlign: "center",
                  background: "rgba(30,41,59,0.5)",
                  border: "1px solid rgba(59,130,246,0.1)",
                }}
              >
                <div style={{ fontSize: "20px", marginBottom: "6px" }}>{f.icon}</div>
                <div style={{ fontSize: "11px", color: "#475569", marginBottom: "4px" }}>{f.label}</div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "#F1F5F9" }}>{f.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* ===== FORM ===== */}
        {formStep < 2 ? (
          <div
            style={{
              borderRadius: "22px",
              overflow: "hidden",
              background: "rgba(30,41,59,0.65)",
              border: "1px solid rgba(59,130,246,0.18)",
            }}
          >
            {/* Step tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid rgba(59,130,246,0.1)" }}>
              {["Country & Age", "Citizenship & Region"].map((label, i) => (
                <button
                  key={i}
                  onClick={() => i <= formStep && setFormStep(i)}
                  style={{
                    flex: 1,
                    padding: "14px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: i <= formStep ? "pointer" : "default",
                    background: i === formStep ? "rgba(37,99,235,0.12)" : "transparent",
                    color: i === formStep ? "#93C5FD" : "#334155",
                    border: "none",
                    borderBottom: i === formStep ? "2px solid #3B82F6" : "2px solid transparent",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      background: i === formStep ? "#3B82F6" : "rgba(59,130,246,0.15)",
                      color: i === formStep ? "#fff" : "#475569",
                    }}
                  >
                    {i + 1}
                  </span>
                  {label}
                </button>
              ))}
            </div>

            <div style={{ padding: "28px" }}>
              {formStep === 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                  {/* Country */}
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#93C5FD", marginBottom: "12px" }}>
                      🌍 {tx.eligibility.form.country}
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {(["IN", "US"] as Country[]).map((c) => (
                        <button
                          key={c}
                          onClick={() => { setCountry(c); setProfileCountry(c); setCitizenship(""); setState(""); }}
                          style={{
                            padding: "18px 16px",
                            borderRadius: "14px",
                            textAlign: "left",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            background: country === c
                              ? "linear-gradient(135deg, rgba(37,99,235,0.22), rgba(29,78,216,0.12))"
                              : "rgba(15,23,42,0.6)",
                            border: `2px solid ${country === c ? "rgba(59,130,246,0.55)" : "rgba(59,130,246,0.08)"}`,
                            boxShadow: country === c ? "0 0 18px rgba(37,99,235,0.18)" : "none",
                          }}
                        >
                          <div style={{ fontSize: "28px", marginBottom: "8px" }}>{c === "IN" ? "🇮🇳" : "🇺🇸"}</div>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: country === c ? "#93C5FD" : "#94A3B8", marginBottom: "3px" }}>
                            {c === "IN" ? "India" : "United States"}
                          </div>
                          <div style={{ fontSize: "11px", color: "#334155" }}>
                            {c === "IN" ? "Election Commission of India" : "Federal Election Commission"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age */}
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#93C5FD", marginBottom: "10px" }}>
                      🎂 {tx.eligibility.form.age}
                    </label>
                    <input
                      id="age-input"
                      type="number"
                      min="1"
                      max="120"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder={tx.eligibility.form.agePlaceholder}
                      className="input-field"
                      style={{ fontSize: "16px", fontWeight: 600 }}
                    />
                    {age && ageNum < 18 && (
                      <p style={{ fontSize: "12px", color: "#F97316", marginTop: "8px" }}>
                        ⚠️ You must be 18+ to vote. Prepare for when you turn 18!
                      </p>
                    )}
                    {age && ageNum >= 18 && ageNum <= 120 && (
                      <p style={{ fontSize: "12px", color: "#34D399", marginTop: "8px" }}>
                        ✅ Age requirement met!
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setFormStep(1)}
                    disabled={!isStep0Valid}
                    className="btn-primary"
                    style={{ padding: "14px", fontSize: "14px", opacity: isStep0Valid ? 1 : 0.45 }}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {formStep === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                  {/* Citizenship */}
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#93C5FD", marginBottom: "12px" }}>
                      🪪 {tx.eligibility.form.citizenship}
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {CITIZENSHIP_OPTIONS[country].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setCitizenship(opt.value)}
                          style={{
                            padding: "12px 14px",
                            borderRadius: "12px",
                            textAlign: "left",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: 500,
                            transition: "all 0.15s",
                            background: citizenship === opt.value ? "rgba(37,99,235,0.2)" : "rgba(15,23,42,0.6)",
                            border: `1px solid ${citizenship === opt.value ? "rgba(59,130,246,0.45)" : "rgba(59,130,246,0.08)"}`,
                            color: citizenship === opt.value ? "#93C5FD" : "#94A3B8",
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#93C5FD", marginBottom: "10px" }}>
                      📍 {tx.eligibility.form.state}{" "}
                      <span style={{ fontWeight: 400, color: "#334155", fontSize: "12px" }}>(optional)</span>
                    </label>
                    <select
                      id="state-select"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="input-field"
                      style={{ background: "rgba(15,23,42,0.85)", cursor: "pointer" }}
                    >
                      <option value="">{tx.eligibility.form.statePlaceholder}</option>
                      {stateOptions.map((s) => (
                        <option key={s} value={s} style={{ background: "#1E293B" }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => setFormStep(0)} className="btn-ghost" style={{ flex: 1, padding: "13px", fontSize: "13px" }}>
                      ← Back
                    </button>
                    <button
                      id="check-eligibility-btn"
                      onClick={handleCheck}
                      disabled={!isFormValid || loading}
                      className="btn-primary"
                      style={{ flex: 2, padding: "13px", fontSize: "14px", opacity: isFormValid ? 1 : 0.45 }}
                    >
                      {loading ? (
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                          <div style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                          Checking...
                        </span>
                      ) : tx.eligibility.form.check}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ===== RESULT ===== */
          result && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Status Banner */}
              <div
                className={statusConfig[result.status as keyof typeof statusConfig]?.cardClass || "partial-eligible-card"}
                style={{ borderRadius: "20px", padding: "32px", textAlign: "center" }}
              >
                <div style={{ fontSize: "56px", marginBottom: "12px" }}>
                  {statusConfig[result.status as keyof typeof statusConfig]?.emoji}
                </div>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#F1F5F9", margin: "0 0 10px" }}>
                  {statusConfig[result.status as keyof typeof statusConfig]?.title}
                </h2>
                <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0 }}>
                  Age: {result.age} · Citizenship: {result.citizenship} · {result.country}{result.state ? ` · ${result.state}` : ""}
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: result.missingRequirements.length > 0 ? "1fr 1fr" : "1fr", gap: "14px" }}>
                {/* Missing requirements */}
                {result.missingRequirements.length > 0 && (
                  <div
                    style={{
                      borderRadius: "16px",
                      padding: "20px",
                      background: "rgba(30,41,59,0.7)",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}
                  >
                    <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#FCA5A5", margin: "0 0 14px" }}>
                      ❌ {tx.eligibility.results.missing}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {result.missingRequirements.map((req: string, i: number) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                          <span style={{ color: "#EF4444", flexShrink: 0 }}>•</span>
                          <span style={{ fontSize: "13px", color: "#94A3B8", lineHeight: "1.5" }}>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next steps */}
                {result.nextSteps.length > 0 && (
                  <div
                    style={{
                      borderRadius: "16px",
                      padding: "20px",
                      background: "rgba(30,41,59,0.7)",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#34D399", margin: "0 0 14px" }}>
                      👉 {tx.eligibility.results.nextSteps}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {result.nextSteps.map((step: string, i: number) => (
                        <div
                          key={i}
                          style={{
                            padding: "10px 12px",
                            borderRadius: "10px",
                            background: "rgba(16,185,129,0.06)",
                            border: "1px solid rgba(16,185,129,0.12)",
                          }}
                        >
                          <span style={{ fontSize: "13px", color: "#94A3B8", lineHeight: "1.5" }}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={resetForm} className="btn-ghost" style={{ flex: 1, padding: "13px", fontSize: "13px" }}>
                  ← Check Again
                </button>
                {result.status !== "not-eligible" && (
                  <a
                    href={result.country === "IN" ? "https://voters.eci.gov.in" : "https://vote.gov"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      flex: 2,
                      padding: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      fontSize: "13px",
                    }}
                  >
                    🗳️ Register to Vote Now
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
