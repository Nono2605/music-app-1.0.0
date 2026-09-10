"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "var(--space-xl) auto",
        padding: "0 var(--space-md)",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "var(--space-sm)" }}>Something went wrong</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-md)" }}>
        Please try again in a moment.
      </p>
      <button
        onClick={reset}
        style={{
          padding: "0.75rem 1rem",
          borderRadius: "var(--radius-sm)",
          border: "none",
          background: "var(--gradient-signature)",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
