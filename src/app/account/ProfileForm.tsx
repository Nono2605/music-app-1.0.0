"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/actions/account";

interface Props {
  username: string;
  displayName: string;
  bio: string;
}

export function ProfileForm({ username, displayName, bio }: Props) {
  const [state, action, pending] = useActionState(updateProfile, undefined);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", maxWidth: 420 }}>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>Username</span>
        <input type="text" name="username" defaultValue={username} required minLength={3} style={inputStyle} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>Display name</span>
        <input type="text" name="display_name" defaultValue={displayName} style={inputStyle} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>Bio</span>
        <textarea name="bio" defaultValue={bio} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
      </label>
      {state?.error && <p style={{ color: "#ff6b6b" }}>{state.error}</p>}
      {state?.message && <p style={{ color: "var(--color-blue-bright)" }}>{state.message}</p>}
      <button type="submit" disabled={pending} style={buttonStyle}>
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.65rem 0.9rem",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border)",
  background: "var(--color-card)",
  color: "var(--color-text)",
  fontFamily: "inherit",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.65rem 1.25rem",
  borderRadius: "var(--radius-sm)",
  border: "none",
  background: "var(--gradient-signature)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  alignSelf: "flex-start",
};
