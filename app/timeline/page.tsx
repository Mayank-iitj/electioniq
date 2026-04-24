"use client";

import { useState } from "react";
import { useProfileStore } from "@/store";
import { translations } from "@/lib/i18n/translations";
import type { Language } from "@/lib/i18n/translations";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const INDIA_TIMELINE = [
  { id: "announcement", phase: "Announcement", date: "March 2024", shortDate: "Mar", icon: "📢", color: "#3B82F6", description: "Election Commission announces the full schedule. Model Code of Conduct comes into effect.", keyFacts: ["MCC enforced nationwide", "Dates & constituency breakdown announced", "De-notification of sitting government"] },
  { id: "registration", phase: "Voter Registration", date: "Ongoing", shortDate: "Ongoing", icon: "📝", color: "#8B5CF6", description: "Citizens register or update voter information via the NVSP portal throughout the year.", keyFacts: ["Form 6 for new registration", "Form 8 for address change", "NVSP online portal available 24/7"] },
  { id: "nomination", phase: "Candidate Nomination", date: "Mar–Apr 2024", shortDate: "Mar–Apr", icon: "🙋", color: "#06B6D4", description: "Candidates file nomination papers. Scrutiny and last date for withdrawal of nominations.", keyFacts: ["Filed at Returning Officer office", "Security deposit required", "Scrutiny & withdrawal period"] },
  { id: "campaign", phase: "Campaign Period", date: "Apr–May 2024", shortDate: "Apr–May", icon: "📣", color: "#F97316", description: "Political parties campaign for votes. Last 48 hours before polling is a silent period.", keyFacts: ["Campaign rallies & advertisements", "Election expenditure limits apply", "48-hour silent period before polling"] },
  { id: "polling", phase: "Voting (7 Phases)", date: "Apr 19 – Jun 1", shortDate: "Apr–Jun", icon: "🗳️", color: "#EF4444", description: "Voting conducted in 7 phases across different states. Polling hours: 7 AM to 6 PM.", keyFacts: ["7 phases over 44 days", "7 AM – 6 PM polling hours", "EVM + VVPAT used across all booths"] },
  { id: "counting", phase: "Vote Counting", date: "June 4, 2024", shortDate: "Jun 4", icon: "🔢", color: "#10B981", description: "All EVMs brought to counting centers. Results declared constituency by constituency.", keyFacts: ["Counting at designated centers", "Candidates & agents can observe", "Live results on results.eci.gov.in"] },
  { id: "government", phase: "New Government", date: "June 2024", shortDate: "Jun", icon: "🏛️", color: "#FBBF24", description: "Party/coalition with majority forms the government. Prime Minister is sworn in.", keyFacts: ["272+ seats needed for majority", "President invites majority party", "Cabinet sworn in at Rashtrapati Bhavan"] },
];

const USA_TIMELINE = [
  { id: "primaries", phase: "Primary Elections", date: "Jan–Sep 2024", shortDate: "Jan–Sep", icon: "🗳️", color: "#3B82F6", description: "Party members vote to choose their preferred presidential candidate.", keyFacts: ["State-by-state primaries", "Delegates allocated proportionally", "Caucuses in some states"] },
  { id: "registration", phase: "Voter Registration Deadline", date: "Oct 15, 2024", shortDate: "Oct 15", icon: "📝", color: "#8B5CF6", description: "Most states require registration 15–30 days before the general election.", keyFacts: ["Deadlines vary by state", "Some states allow same-day registration", "Check vote.gov for your state"] },
  { id: "early-voting", phase: "Early Voting", date: "Oct 19 – Nov 4", shortDate: "Oct–Nov", icon: "⏰", color: "#F97316", description: "Many states allow early in-person voting before Election Day.", keyFacts: ["Available in most states", "Extended hours available", "No reason required in most states"] },
  { id: "election-day", phase: "Election Day", date: "November 5, 2024", shortDate: "Nov 5", icon: "🔴", color: "#EF4444", description: "National Election Day. Polls open 6 AM – 8 PM (varies by state).", keyFacts: ["First Tuesday after November 1st", "Polls: 6 AM – 8 PM", "Bring valid photo ID (check state rules)"] },
  { id: "electoral-college", phase: "Electoral College", date: "December 2024", shortDate: "Dec", icon: "🏛️", color: "#10B981", description: "Electors from each state formally cast their votes for President and VP.", keyFacts: ["538 total electors", "270 needed to win", "Winner-takes-all in most states"] },
  { id: "certification", phase: "Congress Certifies", date: "January 6, 2025", shortDate: "Jan 6", icon: "✅", color: "#06B6D4", description: "Congress meets in joint session to certify the Electoral College results.", keyFacts: ["Joint session of Congress", "VP presides over the session", "Official certification of the winner"] },
  { id: "inauguration", phase: "Inauguration Day", date: "January 20, 2025", shortDate: "Jan 20", icon: "🎊", color: "#FBBF24", description: "The new President is sworn into office at the US Capitol.", keyFacts: ["Held at the US Capitol", "Presidential Oath of Office", "Transfer of power completed"] },
];

const VOTER_TURNOUT_DATA = [
  { year: "2009", india: 58.2, usa: 57.1 },
  { year: "2014", india: 66.4, usa: 36.4 },
  { year: "2016", india: 66.4, usa: 55.7 },
  { year: "2018", india: 67.1, usa: 49.3 },
  { year: "2019", india: 67.4, usa: 53.4 },
  { year: "2020", india: 68.0, usa: 66.9 },
  { year: "2022", india: 68.4, usa: 46.9 },
  { year: "2024", india: 65.8, usa: 63.1 },
];

export default function TimelinePage() {
  const { profile } = useProfileStore();
  const lang = profile.language as Language;
  const tx = translations[lang];
  const country = profile.country;

  const timeline = country === "IN" ? INDIA_TIMELINE : USA_TIMELINE;
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [showChart, setShowChart] = useState(false);

  const selected = timeline[selectedPhase];

  return (
    <div style={{ background: "#0A1120", minHeight: "100%" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>

        {/* ===== HEADER ===== */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "100px",
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.25)",
              marginBottom: "14px",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#FB923C" }}>
              📅 Election Calendar
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
            {tx.timeline.title}
          </h1>
          <p style={{ color: "#64748B", fontSize: "15px", margin: 0 }}>
            {tx.timeline.subtitle}
          </p>
        </div>

        {/* ===== TIMELINE TRACK ===== */}
        <div
          style={{
            borderRadius: "20px",
            padding: "24px 20px 20px",
            background: "rgba(30,41,59,0.55)",
            border: "1px solid rgba(59,130,246,0.12)",
            marginBottom: "20px",
            overflowX: "auto",
          }}
        >
          <div style={{ minWidth: "560px", position: "relative" }}>
            {/* Track background */}
            <div
              style={{
                position: "absolute",
                top: "22px",
                left: "22px",
                right: "22px",
                height: "3px",
                background: "rgba(59,130,246,0.1)",
                borderRadius: "100px",
              }}
            />
            {/* Progress fill */}
            <div
              style={{
                position: "absolute",
                top: "22px",
                left: "22px",
                height: "3px",
                borderRadius: "100px",
                background: `linear-gradient(to right, ${timeline[0].color}, ${selected.color})`,
                width: `${(selectedPhase / (timeline.length - 1)) * (100 - (44 / timeline.length))}%`,
                transition: "width 0.4s ease",
              }}
            />
            {/* Phase nodes */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {timeline.map((item, i) => {
                const isPast = i < selectedPhase;
                const isCurrent = i === selectedPhase;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPhase(i)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        transition: "all 0.3s",
                        background: isCurrent
                          ? item.color
                          : isPast
                          ? item.color + "33"
                          : "rgba(15,23,42,0.8)",
                        border: `2px solid ${isCurrent || isPast ? item.color : "rgba(59,130,246,0.15)"}`,
                        boxShadow: isCurrent ? `0 0 20px ${item.color}66` : "none",
                        transform: isCurrent ? "scale(1.15)" : "scale(1)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        marginTop: "8px",
                        textAlign: "center",
                        color: isCurrent ? item.color : isPast ? "#475569" : "#334155",
                        fontWeight: isCurrent ? 700 : 400,
                        maxWidth: "64px",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.shortDate}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== PHASE DETAIL + SIDEBAR ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "16px", marginBottom: "20px" }}>

          {/* Phase Detail */}
          <div
            style={{
              borderRadius: "20px",
              padding: "28px",
              background: `linear-gradient(145deg, ${selected.color}14 0%, rgba(30,41,59,0.8) 100%)`,
              border: `1px solid ${selected.color}35`,
              boxShadow: `0 0 40px ${selected.color}0C`,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  flexShrink: 0,
                  background: selected.color + "18",
                  border: `1px solid ${selected.color}35`,
                }}
              >
                {selected.icon}
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: selected.color, margin: "0 0 6px", letterSpacing: "0.06em" }}>
                  PHASE {selectedPhase + 1} OF {timeline.length}
                </p>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#F1F5F9", margin: "0 0 8px", lineHeight: 1.1 }}>
                  {selected.phase}
                </h2>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    padding: "4px 12px",
                    borderRadius: "100px",
                    background: selected.color + "15",
                    color: selected.color,
                  }}
                >
                  📅 {selected.date}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#94A3B8", marginBottom: "18px" }}>
              {selected.description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
              {selected.keyFacts.map((fact, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "rgba(15,23,42,0.7)",
                    border: "1px solid rgba(59,130,246,0.08)",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: selected.color + "20",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={selected.color} strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "13px", color: "#CBD5E1", lineHeight: "1.5" }}>{fact}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {selectedPhase > 0 && (
                <button
                  onClick={() => setSelectedPhase(selectedPhase - 1)}
                  className="btn-ghost"
                  style={{ flex: 1, padding: "11px", fontSize: "13px" }}
                >
                  ← Previous
                </button>
              )}
              {selectedPhase < timeline.length - 1 && (
                <button
                  onClick={() => setSelectedPhase(selectedPhase + 1)}
                  className="btn-primary"
                  style={{ flex: 2, padding: "11px", fontSize: "13px" }}
                >
                  Next Phase →
                </button>
              )}
            </div>
          </div>

          {/* Phase List Sidebar */}
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              background: "rgba(30,41,59,0.5)",
              border: "1px solid rgba(59,130,246,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(59,130,246,0.08)", flexShrink: 0 }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#60A5FA", margin: 0 }}>All Phases</p>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {timeline.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedPhase(i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(59,130,246,0.06)",
                    background: i === selectedPhase ? item.color + "12" : "transparent",
                    cursor: "pointer",
                    transition: "background 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (i !== selectedPhase)
                      (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (i !== selectedPhase)
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        margin: "0 0 2px",
                        color: i === selectedPhase ? item.color : "#94A3B8",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.phase}
                    </p>
                    <p style={{ fontSize: "11px", color: "#334155", margin: 0 }}>{item.shortDate}</p>
                  </div>
                  {i <= selectedPhase && (
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== VOTER TURNOUT SECTION ===== */}
        <div
          style={{
            borderRadius: "20px",
            padding: "24px",
            background: "rgba(30,41,59,0.5)",
            border: "1px solid rgba(59,130,246,0.12)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#F1F5F9", margin: "0 0 4px" }}>
                📊 Voter Turnout Comparison
              </h3>
              <p style={{ fontSize: "12px", color: "#475569", margin: 0 }}>
                India 🇮🇳 vs USA 🇺🇸 general election voter turnout (%)
              </p>
            </div>
            <button
              onClick={() => setShowChart(!showChart)}
              style={{
                fontSize: "12px",
                padding: "8px 16px",
                borderRadius: "10px",
                background: showChart ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${showChart ? "rgba(59,130,246,0.35)" : "rgba(255,255,255,0.08)"}`,
                color: "#93C5FD",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              {showChart ? "Hide Chart ▲" : "Show Chart ▼"}
            </button>
          </div>

          {showChart ? (
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VOTER_TURNOUT_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIndia" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUSA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.07)" />
                  <XAxis dataKey="year" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} domain={[30, 80]} unit="%" />
                  <Tooltip
                    contentStyle={{
                      background: "#1E293B",
                      border: "1px solid rgba(59,130,246,0.2)",
                      borderRadius: "10px",
                      color: "#F1F5F9",
                      fontSize: "13px",
                    }}
                    formatter={(value) => [`${value}%`]}
                  />
                  <ReferenceLine y={50} stroke="rgba(255,255,255,0.07)" strokeDasharray="4 4" label={{ value: "50%", fill: "#334155", fontSize: 10 }} />
                  <Area type="monotone" dataKey="india" stroke="#3B82F6" strokeWidth={2.5} fill="url(#colorIndia)" name="India 🇮🇳" dot={{ fill: "#3B82F6", r: 3 }} />
                  <Area type="monotone" dataKey="usa" stroke="#F97316" strokeWidth={2.5} fill="url(#colorUSA)" name="USA 🇺🇸" dot={{ fill: "#F97316", r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
              {[
                { flag: "🇮🇳", label: "India 2024", value: "65.8%", color: "#3B82F6" },
                { flag: "🇺🇸", label: "USA 2024", value: "63.1%", color: "#F97316" },
                { flag: "🇮🇳", label: "India Best (2019)", value: "67.4%", color: "#10B981" },
                { flag: "🇺🇸", label: "USA Best (2020)", value: "66.9%", color: "#10B981" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    borderRadius: "14px",
                    padding: "16px",
                    textAlign: "center",
                    background: "rgba(15,23,42,0.7)",
                    border: "1px solid rgba(59,130,246,0.1)",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "6px" }}>{s.flag}</div>
                  <div style={{ fontSize: "22px", fontWeight: 900, color: s.color, marginBottom: "4px" }}>{s.value}</div>
                  <div style={{ fontSize: "11px", color: "#475569" }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
