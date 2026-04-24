import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{
        background: "rgba(8,13,26,0.9)",
        borderTop: "1px solid rgba(59,130,246,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold"
                style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
              >
                ⚡
              </div>
              <span
                className="text-xl font-extrabold"
                style={{
                  background: "linear-gradient(135deg, #60A5FA, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ElectIQ
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
              An AI-powered civic education platform that helps citizens understand and participate in democracy.
            </p>
            <div className="flex gap-3 mt-4">
              <span
                className="chip text-xs"
                style={{ padding: "4px 10px" }}
              >
                🔒 Non-partisan
              </span>
              <span
                className="chip text-xs"
                style={{ padding: "4px 10px" }}
              >
                ✅ Verified Sources
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#93C5FD" }}>
              Features
            </h3>
            <ul className="space-y-2">
              {[
                { label: "AI Chat Assistant", href: "/chat" },
                { label: "Election Guide", href: "/guide" },
                { label: "Timeline", href: "/timeline" },
                { label: "Eligibility Checker", href: "/eligibility" },
                { label: "Document Guide", href: "/documents" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-blue-400"
                    style={{ color: "#64748B" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Sources */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#93C5FD" }}>
              Official Sources
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Election Commission of India", href: "https://eci.gov.in" },
                { label: "National Voter Portal (NVSP)", href: "https://voters.eci.gov.in" },
                { label: "Vote.gov (USA)", href: "https://vote.gov" },
                { label: "Federal Election Commission", href: "https://www.fec.gov" },
                { label: "USA.gov — Voting", href: "https://www.usa.gov/absentee-voting" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm flex items-center gap-1 transition-colors hover:text-blue-400"
                    style={{ color: "#64748B" }}
                  >
                    {item.label}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#93C5FD" }}>
              Disclaimer
            </h3>
            <div
              className="rounded-xl p-4 text-xs leading-relaxed"
              style={{
                background: "rgba(59,130,246,0.05)",
                border: "1px solid rgba(59,130,246,0.1)",
                color: "#64748B",
              }}
            >
              <p className="mb-2">
                ElectIQ provides <strong style={{ color: "#93C5FD" }}>procedural guidance only</strong>. We are not affiliated with any political party, candidate, or government body.
              </p>
              <p>
                All information is sourced from official government portals. Always verify critical information at official sources.
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}
        >
          <p className="text-xs" style={{ color: "#334155" }}>
            © 2024 ElectIQ. Built for civic empowerment.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#10B981", boxShadow: "0 0 6px #10B981" }}
            />
            <span className="text-xs" style={{ color: "#475569" }}>
              Information verified and up to date
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
