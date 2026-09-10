"use client";

import { useActionState } from "react";
import { updatePreferences } from "@/app/actions/account";

interface Props {
  explicitContent: boolean;
  favoriteGenres: string[];
}

export function PreferencesForm({ explicitContent, favoriteGenres }: Props) {
  const [state, action, pending] = useActionState(updatePreferences, undefined);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", maxWidth: 420 }}>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--color-text-muted)",
          fontSize: "0.875rem",
        }}
      >
        <input type="checkbox" name="explicit_content" defaultChecked={explicitContent} />
        Allow explicit content
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          Favorite genres (comma separated)
        </span>
        <input
          type="text"
          name="favorite_genres"
          defaultValue={favoriteGenres.join(", ")}
          placeholder="House, Hip-Hop, Jazz…"
          className="input-field"
        />
      </label>
      {state?.error && <p style={{ color: "#ff6b6b" }}>{state.error}</p>}
      {state?.message && <p style={{ color: "var(--color-blue-bright)" }}>{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary"
        style={{ padding: "0.65rem 1.25rem", alignSelf: "flex-start" }}
      >
        {pending ? "Saving…" : "Save preferences"}
      </button>
    </form>
  );
}
