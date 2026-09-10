"use client";

import { useActionState } from "react";
import { searchTracksForPlaylist, addTrackToPlaylist } from "@/app/actions/playlists";

export function AddTrackSearch({ playlistId }: { playlistId: string }) {
  const [state, action, pending] = useActionState(searchTracksForPlaylist, undefined);

  return (
    <div>
      <form action={action} style={{ display: "flex", gap: "var(--space-sm)", marginBottom: "var(--space-sm)" }}>
        <input
          type="text"
          name="q"
          placeholder="Search tracks to add"
          style={{
            flex: 1,
            padding: "0.6rem 0.9rem",
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
            padding: "0.6rem 1rem",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border)",
            background: "transparent",
            color: "var(--color-text)",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {state?.results && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {state.results.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
              No tracks match &quot;{state.query}&quot;.
            </p>
          ) : (
            state.results.map((track) => (
              <div
                key={track.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--color-card)",
                }}
              >
                <span>
                  {track.title}{" "}
                  <span style={{ color: "var(--color-text-muted)" }}>— {track.artists?.name ?? "Unknown"}</span>
                </span>
                <form action={addTrackToPlaylist.bind(null, playlistId, track.id)}>
                  <button
                    type="submit"
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--color-blue-bright)",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Add
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
