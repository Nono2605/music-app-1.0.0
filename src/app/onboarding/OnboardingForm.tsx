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
        className="input-field"
      />
      {state?.error && <p style={{ color: "#ff6b6b" }}>{state.error}</p>}
      <button type="submit" disabled={pending} className="btn btn-primary" style={{ padding: "0.75rem 1rem" }}>
        {pending ? "Saving…" : "Continue"}
      </button>
    </form>
  );
}
