import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { api } from "@/lib/api";
import { formatDuration } from "@/lib/formatDuration";
import { removeTrackFromPlaylist, deletePlaylist } from "@/app/actions/playlists";
import { TrackPlayButton } from "@/components/TrackPlayButton";
import { PlaylistVisibilityToggle } from "@/components/PlaylistVisibilityToggle";
import { AddTrackSearch } from "./AddTrackSearch";

interface PlaylistTrack {
  id: string;
  title: string;
  duration_seconds: number | null;
  position: number;
  artists: { name: string } | null;
}

interface PlaylistDetail {
  id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  is_public: boolean;
  is_owner: boolean;
  tracks: PlaylistTrack[];
}

export default async function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  let playlist: PlaylistDetail;
  try {
    playlist = await api.get<PlaylistDetail>(`/playlists/${id}`, { accessToken: session.access_token });
  } catch {
    notFound();
  }

  return (
    <div style={{ padding: "var(--space-lg)", maxWidth: 720 }}>
      <div style={{ display: "flex", gap: "var(--space-lg)", marginBottom: "var(--space-xl)", flexWrap: "wrap" }}>
        <div
          style={{
            width: 140,
            height: 140,
            flex: "none",
            borderRadius: "var(--radius-md)",
            background: playlist.cover_url
              ? `url(${playlist.cover_url}) center/cover`
              : "var(--gradient-signature)",
          }}
        />
        <div style={{ alignSelf: "flex-end", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h1 style={{ fontSize: "2rem" }}>{playlist.title}</h1>
          {playlist.description && <p style={{ color: "var(--color-text-muted)" }}>{playlist.description}</p>}
          {playlist.is_owner && (
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
              <PlaylistVisibilityToggle playlistId={playlist.id} initialIsPublic={playlist.is_public} />
              <form action={deletePlaylist.bind(null, playlist.id)}>
                <button type="submit" className="btn-plain" style={{ color: "#ff6b6b" }}>
                  Delete playlist
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <section style={{ marginBottom: "var(--space-xl)" }}>
        {playlist.tracks.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>No tracks yet.</p>
        ) : (
          <ol style={{ listStyle: "none" }}>
            {playlist.tracks.map((track, index) => (
              <li
                key={track.id}
                className="list-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                  padding: "0.65rem var(--space-sm)",
                  borderRadius: "var(--radius-sm)",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <span style={{ color: "var(--color-text-muted)", width: 24, textAlign: "right" }}>{index + 1}</span>
                <TrackPlayButton
                  track={{
                    id: track.id,
                    title: track.title,
                    artistName: track.artists?.name ?? "Unknown artist",
                    coverUrl: playlist.cover_url,
                  }}
                  size={28}
                />
                <span style={{ flex: 1 }}>
                  {track.title}{" "}
                  <span style={{ color: "var(--color-text-muted)" }}>— {track.artists?.name ?? "Unknown"}</span>
                </span>
                <span style={{ color: "var(--color-text-muted)", fontVariantNumeric: "tabular-nums" }}>
                  {formatDuration(track.duration_seconds)}
                </span>
                {playlist.is_owner && (
                  <form action={removeTrackFromPlaylist.bind(null, playlist.id, track.id)}>
                    <button
                      type="submit"
                      aria-label={`Remove ${track.title}`}
                      className="btn-plain"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      ✕
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ol>
        )}
      </section>

      {playlist.is_owner && (
        <section>
          <h2 style={{ fontSize: "1.125rem", marginBottom: "var(--space-md)" }}>Add tracks</h2>
          <AddTrackSearch playlistId={playlist.id} />
        </section>
      )}
    </div>
  );
}
