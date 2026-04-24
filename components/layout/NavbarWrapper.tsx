"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// Pages that should NOT show the footer (full-screen apps)
const NO_FOOTER_ROUTES = ["/chat"];

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showFooter = !NO_FOOTER_ROUTES.includes(pathname);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
