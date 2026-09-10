import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Suspense } from "react";
import { Nav, NavFallback } from "@/components/Nav";
import { PlayerProvider } from "@/lib/player/PlayerContext";
import { PlayerBar } from "@/components/PlayerBar";
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
        <PlayerProvider>
          <Suspense fallback={<NavFallback />}>
            <Nav />
          </Suspense>
          <main style={{ flex: 1, paddingBottom: "var(--player-bar-height)" }}>{children}</main>
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  );
}
