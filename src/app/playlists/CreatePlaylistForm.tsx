"use client";

import { useActionState } from "react";
import { createPlaylist } from "@/app/actions/playlists";

export function CreatePlaylistForm() {
  const [state, action, pending] = useActionState(createPlaylist, undefined);

  return (
    <form action={action} style={{ display: "flex", gap: "var(--space-sm)" }}>
      <input
        type="text"
        name="title"
        placeholder="New playlist name"
        required
        style={{
          flex: 1,
          padding: "0.65rem 1rem",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--color-border)",
          background: "var(--color-card)",
          color: "var(--color-text)",
        }}
      />
      <button
        type="submit"
        disabled={pending}
        style={{
          padding: "0.65rem 1.25rem",
          borderRadius: "var(--radius-sm)",
          border: "none",
          background: "var(--gradient-signature)",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {pending ? "Creating…" : "Create"}
      </button>
      {state?.error && <p style={{ color: "#ff6b6b" }}>{state.error}</p>}
    </form>
  );
}
