"use client";

import { useActionState } from "react";
import { createPlaylist } from "@/app/actions/playlists";

export function CreatePlaylistForm() {
  const [state, action, pending] = useActionState(createPlaylist, undefined);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        <input
          type="text"
          name="title"
          placeholder="New playlist name"
          required
          className="input-field"
          style={{ flex: 1 }}
        />
        <button type="submit" disabled={pending} className="btn btn-primary" style={{ padding: "0.65rem 1.25rem" }}>
          {pending ? "Creating…" : "Create"}
        </button>
      </div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--color-text-muted)",
          fontSize: "0.875rem",
        }}
      >
        <input type="checkbox" name="is_public" />
        Make this playlist public
      </label>
      {state?.error && <p style={{ color: "#ff6b6b" }}>{state.error}</p>}
    </form>
  );
}
