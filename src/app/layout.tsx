import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Link from "next/link";
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
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--space-sm) var(--space-lg)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <Link
            href="/"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.125rem" }}
          >
            BRAND
          </Link>
          <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
            <Link href="/discover">Discover</Link>
            <Link href="/login">Log in</Link>
          </div>
        </nav>
        <main style={{ flex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
