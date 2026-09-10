import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Suspense } from "react";
import { Nav, NavFallback } from "@/components/Nav";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BRAND",
  description: "Your music. Your artists. Your impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <Suspense fallback={<NavFallback />}>
          <Nav />
        </Suspense>
        <main style={{ flex: 1 }}>{children}</main>
        {/* Emplacement réservé pour le lecteur persistant — activé en Phase 5 */}
        <div id="player-dock" />
      </body>
    </html>
  );
}
