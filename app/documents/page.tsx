"use client";

import { useState } from "react";
import { useProfileStore } from "@/store";
import { indiaElectionData, usaElectionData } from "@/lib/data/elections";
import { translations } from "@/lib/i18n/translations";
import type { Language } from "@/lib/i18n/translations";

type Tab = "registration" | "voting" | "alternatives";

const INDIA_DOCS = {
  registration: [
    { name: "Aadhaar Card", required: true, description: "Your 12-digit Aadhaar serves as proof of identity and age (if DOB is mentioned).", tip: "Link your Aadhaar with your voter ID for better verification.", icon: "🪪" },
    { name: "Proof of Age", required: true, description: "Birth certificate, school leaving certificate, or any document showing date of birth.", tip: "Aadhaar card is accepted as age proof if it shows your date of birth.", icon: "📋" },
    { name: "Proof of Residence", required: true, description: "Latest electricity/water/telephone bill, rent agreement, bank passbook, or postal certificate.", tip: "Document must show your current address clearly.", icon: "🏠" },
    { name: "Passport Photo", required: true, description: "Recent passport-size photograph (3.5cm × 3.5cm) with white background.", tip: "Use a recent photo — your voter ID will use this photo.", icon: "📸" },
  ],
  voting: [
    { name: "Voter ID (EPIC Card)", required: true, description: "Your Elector Photo Identity Card is the primary ID accepted at polling booths.", tip: "Download your e-EPIC from voters.eci.gov.in as a backup.", icon: "🗳️" },
    { name: "Aadhaar Card", required: false, description: "Accepted as alternative ID at polling booths if you don't have your Voter ID.", tip: "Aadhaar alone is sufficient even without the physical EPIC card.", icon: "🪪" },
    { name: "Passport", required: false, description: "Valid Indian passport is accepted as an alternative voter ID.", tip: "Both expired and valid passports may be accepted in some states.", icon: "📕" },
    { name: "Driving License", required: false, description: "Motor vehicle driving license with photo is an accepted alternative.", tip: "Must have your photograph clearly visible on the license.", icon: "🚗" },
    { name: "PAN Card", required: false, description: "Income Tax PAN card is accepted as a photo ID at polling booths.", tip: "Ensure the PAN card clearly shows your photo and name.", icon: "💳" },
    { name: "NREGA Job Card", required: false, description: "Job card issued under MGNREGA scheme with photograph.", tip: "Must be issued by a competent authority with your photograph.", icon: "📒" },
  ],
  alternatives: [
    { name: "Bank / Post Office Passbook with photo", icon: "📗" },
    { name: "Health Insurance Smart Card (Ministry of Labour)", icon: "🏥" },
    { name: "NPR Smart Card issued by RGI", icon: "🗂️" },
    { name: "Pension document with photograph", icon: "📃" },
    { name: "Central/State Government service identity card", icon: "🏛️" },
    { name: "MP / MLA / MLC identity card", icon: "👔" },
    { name: "Unique Disability ID (UDID) Card", icon: "♿" },
    { name: "Student ID from a recognized university", icon: "🎓" },
  ],
};

const USA_DOCS = {
  registration: [
    { name: "Social Security Number", required: true, description: "Your SSN (last 4 digits) is required on voter registration forms in most states.", tip: "Some states accept a state ID/driver's license number instead.", icon: "🔢" },
    { name: "State ID or Driver's License", required: false, description: "Required in some states for online voter registration.", tip: "Check your specific state's requirements at vote.gov.", icon: "🪪" },
    { name: "Proof of Citizenship", required: false, description: "Only a few states (e.g. Arizona, Kansas) require documentary proof of citizenship.", tip: "Passport or birth certificate is typically accepted.", icon: "📜" },
    { name: "Proof of Residence", required: false, description: "Utility bill, bank statement, or lease agreement showing your current address.", tip: "Required in states with same-day registration.", icon: "🏠" },
  ],
  voting: [
    { name: "Photo ID", required: false, description: "Required in 35 states. A state-issued photo ID is most widely accepted.", tip: "Check your state's ID requirement at vote.gov. Some states are strict, others flexible.", icon: "🪪" },
    { name: "Voter Registration Card", required: false, description: "Some states provide a registration card — bring it to confirm your registration.", tip: "Not required in most states — poll workers can look up your registration.", icon: "📋" },
    { name: "Utility Bill / Bank Statement", required: false, description: "Accepted as proof of address in non-strict ID states.", tip: "Must show your name and current address.", icon: "📄" },
  ],
  alternatives: [
    { name: "US Passport", icon: "📕" },
    { name: "Military ID", icon: "🎖️" },
    { name: "Tribal ID", icon: "🪶" },
    { name: "Student ID (state-issued)", icon: "🎓" },
    { name: "Government employee ID", icon: "🏛️" },
  ],
};

export default function DocumentsPage() {
  const { profile } = useProfileStore();
  const lang = profile.language as Language;
  const tx = translations[lang];
  const country = profile.country;

  const [activeTab, setActiveTab] = useState<Tab>("registration");
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const docs = country === "IN" ? INDIA_DOCS : USA_DOCS;
  const countryData = country === "IN" ? indiaElectionData : usaElectionData;

  const TABS: { id: Tab; label: string; icon: string; count: number }[] = [
    { id: "registration", label: tx.documents.categories.registration, icon: "📝", count: docs.registration.length },
    { id: "voting", label: tx.documents.categories.voting, icon: "🗳️", count: docs.voting.length },
    { id: "alternatives", label: tx.documents.categories.optional, icon: "📎", count: docs.alternatives.length },
  ];

  const currentDocs = activeTab === "alternatives" ? [] : (docs[activeTab] || []);
  const filteredDocs = currentDocs.filter(
    (doc) =>
      !searchQuery ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredAlternatives = (activeTab === "alternatives" ? docs.alternatives : []).filter(
    (doc) => !searchQuery || doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: "#0A1120", minHeight: "100%" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>

        {/* ===== HEADER ===== */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "100px",
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.25)",
              marginBottom: "14px",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#C4B5FD" }}>📄 Document Guide</span>
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
            {tx.documents.title}
          </h1>
          <p style={{ color: "#64748B", fontSize: "15px", margin: 0 }}>
            {tx.documents.subtitle}
          </p>
        </div>

        {/* ===== TAB NAV ===== */}
        <div
          style={{
            display: "flex",
            borderRadius: "16px",
            overflow: "hidden",
            background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(59,130,246,0.12)",
            marginBottom: "20px",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setExpandedDoc(null); }}
              style={{
                flex: 1,
                padding: "14px 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                background: activeTab === tab.id
                  ? "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.12))"
                  : "transparent",
                color: activeTab === tab.id ? "#93C5FD" : "#475569",
                borderBottom: activeTab === tab.id ? "2px solid #3B82F6" : "2px solid transparent",
                border: "none",
                transition: "all 0.2s",
              }}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span
                style={{
                  padding: "1px 7px",
                  borderRadius: "100px",
                  fontSize: "11px",
                  fontWeight: 700,
                  background: activeTab === tab.id ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.05)",
                  color: activeTab === tab.id ? "#60A5FA" : "#334155",
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ===== SEARCH ===== */}
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#334155",
              pointerEvents: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: "42px" }}
          />
        </div>

        {/* ===== ALTERNATIVES TAB INFO ===== */}
        {activeTab === "alternatives" && (
          <div
            style={{
              borderRadius: "12px",
              padding: "14px 16px",
              marginBottom: "16px",
              background: "rgba(139,92,246,0.07)",
              border: "1px solid rgba(139,92,246,0.18)",
            }}
          >
            <p style={{ fontSize: "13px", color: "#C4B5FD", margin: 0, lineHeight: "1.6" }}>
              {country === "IN"
                ? "ℹ️ The Election Commission of India accepts 12 alternative photo IDs if you don't have your Voter ID (EPIC) card. Any ONE of these is sufficient at the polling booth."
                : "ℹ️ Accepted IDs vary by state. Check your specific state requirements at vote.gov before heading to the polls."}
            </p>
          </div>
        )}

        {/* ===== DOCUMENT CARDS ===== */}
        {activeTab !== "alternatives" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            {filteredDocs.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px", color: "#334155" }}>
                No documents match your search.
              </div>
            )}
            {filteredDocs.map((doc) => {
              const isExpanded = expandedDoc === doc.name;
              return (
                <div
                  key={doc.name}
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: `1px solid ${isExpanded ? "rgba(59,130,246,0.35)" : "rgba(59,130,246,0.1)"}`,
                    background: isExpanded ? "rgba(37,99,235,0.06)" : "rgba(30,41,59,0.6)",
                    transition: "all 0.2s",
                  }}
                >
                  {/* Card header — clickable */}
                  <button
                    onClick={() => setExpandedDoc(isExpanded ? null : doc.name)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "16px 18px",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        flexShrink: 0,
                        background: doc.required ? "rgba(37,99,235,0.12)" : "rgba(16,185,129,0.08)",
                        border: `1px solid ${doc.required ? "rgba(37,99,235,0.25)" : "rgba(16,185,129,0.18)"}`,
                      }}
                    >
                      {doc.icon}
                    </div>
                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#E2E8F0" }}>{doc.name}</span>
                        <span
                          style={{
                            fontSize: "11px",
                            padding: "2px 8px",
                            borderRadius: "100px",
                            fontWeight: 600,
                            background: doc.required ? "rgba(37,99,235,0.18)" : "rgba(16,185,129,0.1)",
                            color: doc.required ? "#60A5FA" : "#34D399",
                          }}
                        >
                          {doc.required ? "✦ Required" : "Optional"}
                        </span>
                      </div>
                      <p style={{ fontSize: "12px", color: "#64748B", margin: 0, lineHeight: "1.5" }}>
                        {doc.description}
                      </p>
                    </div>
                    {/* Chevron */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="2"
                      style={{
                        flexShrink: 0,
                        transition: "transform 0.2s",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {/* Expanded tip */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: "0 18px 16px",
                        borderTop: "1px solid rgba(59,130,246,0.08)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          marginTop: "14px",
                          background: "rgba(251,191,36,0.06)",
                          border: "1px solid rgba(251,191,36,0.14)",
                        }}
                      >
                        <span style={{ fontSize: "16px", flexShrink: 0 }}>💡</span>
                        <p style={{ fontSize: "13px", color: "#D4B896", margin: 0, lineHeight: "1.6" }}>
                          {doc.tip}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Alternatives grid */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px", marginBottom: "24px" }}>
            {filteredAlternatives.map((doc, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "rgba(30,41,59,0.6)",
                  border: "1px solid rgba(139,92,246,0.1)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    flexShrink: 0,
                    background: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.18)",
                  }}
                >
                  {doc.icon}
                </div>
                <span style={{ fontSize: "13px", color: "#CBD5E1", flex: 1, lineHeight: "1.4" }}>{doc.name}</span>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: "rgba(16,185,129,0.18)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== BOTTOM CTA ===== */}
        <div
          style={{
            borderRadius: "18px",
            padding: "24px",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.08))",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>📋</div>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#F1F5F9", margin: "0 0 6px" }}>
            Ready to Register?
          </h3>
          <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 18px", lineHeight: "1.5" }}>
            Visit the official portal to submit your documents and complete voter registration.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={countryData.voterPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", padding: "12px 22px", borderRadius: "12px" }}
            >
              🌐 Go to Official Portal
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
            <button
              onClick={() => window.print()}
              className="btn-ghost"
              style={{ padding: "12px 22px", borderRadius: "12px" }}
            >
              🖨️ Print Checklist
            </button>
          </div>
          <p style={{ fontSize: "11px", color: "#334155", marginTop: "14px" }}>
            Source:{" "}
            <a href={countryData.commissionUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#3B82F6" }}>
              {countryData.commission}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
