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
        className="input-field"
        style={{ flex: 1 }}
      />
      <button type="submit" disabled={pending} className="btn btn-primary" style={{ padding: "0.65rem 1.25rem" }}>
        {pending ? "Creating…" : "Create"}
      </button>
      {state?.error && <p style={{ color: "#ff6b6b" }}>{state.error}</p>}
    </form>
  );
}
