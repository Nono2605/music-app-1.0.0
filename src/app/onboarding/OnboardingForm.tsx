"use client";

import { useActionState } from "react";
import { completeOnboarding } from "@/app/actions/onboarding";

export function OnboardingForm() {
  const [state, action, pending] = useActionState(completeOnboarding, undefined);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        minLength={3}
        style={{
          padding: "0.75rem 1rem",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--color-border)",
          background: "var(--color-card)",
          color: "var(--color-text)",
        }}
      />
      {state?.error && <p style={{ color: "#ff6b6b" }}>{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
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
        {pending ? "Saving…" : "Continue"}
      </button>
    </form>
  );
}
