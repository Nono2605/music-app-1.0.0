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
        <input type="text" name="username" defaultValue={username} required minLength={3} className="input-field" />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>Display name</span>
        <input type="text" name="display_name" defaultValue={displayName} className="input-field" />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>Bio</span>
        <textarea name="bio" defaultValue={bio} rows={3} className="input-field" style={{ resize: "vertical" }} />
      </label>
      {state?.error && <p style={{ color: "#ff6b6b" }}>{state.error}</p>}
      {state?.message && <p style={{ color: "var(--color-blue-bright)" }}>{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary"
        style={{ padding: "0.65rem 1.25rem", alignSelf: "flex-start" }}
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
