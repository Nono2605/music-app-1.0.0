import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "var(--space-xl) var(--space-lg)" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "var(--space-sm)" }}>
        Your music. Your artists. Your impact.
      </h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-md)" }}>
        Home feed — coming next. For now:
      </p>
      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        <Link href="/discover" style={{ color: "var(--color-blue-bright)" }}>
          Browse Discover →
        </Link>
        <Link href="/login" style={{ color: "var(--color-blue-bright)" }}>
          Log in →
        </Link>
      </div>
    </div>
  );
}
