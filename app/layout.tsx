import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "ClaimPilot AI",
  description: "Business insurance cockpit for coverage gaps, renewal decisions, and broker-ready submissions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <SiteNav />
        <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
