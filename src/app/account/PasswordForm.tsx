"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/actions/account";

export function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", maxWidth: 420 }}>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>New password</span>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          placeholder="Min. 8 characters"
          className="input-field"
        />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>Confirm new password</span>
        <input type="password" name="confirm_password" required minLength={8} className="input-field" />
      </label>
      {state?.error && <p style={{ color: "#ff6b6b" }}>{state.error}</p>}
      {state?.message && <p style={{ color: "var(--color-blue-bright)" }}>{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary"
        style={{ padding: "0.65rem 1.25rem", alignSelf: "flex-start" }}
      >
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
