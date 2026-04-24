import type { Metadata } from "next";
import "./globals.css";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";

export const metadata: Metadata = {
  title: "ElectIQ — AI-Powered Election Assistant",
  description:
    "Your intelligent, unbiased guide to elections, voting rights, and civic participation. Understand the election process in simple language — available in English and Hindi.",
  keywords:
    "election, voting, voter registration, India elections, USA elections, civic education, AI assistant, ECI, Election Commission",
  authors: [{ name: "ElectIQ" }],
  openGraph: {
    title: "ElectIQ — AI-Powered Election Assistant",
    description: "Understand your democracy. AI-powered election guide for India and USA.",
    type: "website",
    siteName: "ElectIQ",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&family=Noto+Sans+Devanagari:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans antialiased"
        style={{ background: "#0A1120", color: "#F1F5F9", overflowX: "hidden" }}
        suppressHydrationWarning
      >
        <NavbarWrapper>{children}</NavbarWrapper>
      </body>
    </html>
  );
}
