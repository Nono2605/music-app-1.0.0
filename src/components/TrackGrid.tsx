export interface Track {
  id: string;
  title: string;
  duration_seconds: number | null;
  artists: { name: string } | null;
  albums: { cover_url: string | null } | null;
}

export function TrackGrid({ tracks, emptyMessage }: { tracks: Track[]; emptyMessage: string }) {
  if (tracks.length === 0) {
    return <p style={{ color: "var(--color-text-muted)" }}>{emptyMessage}</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "var(--space-md)",
      }}
    >
      {tracks.map((track) => (
        <article key={track.id}>
          <div
            style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: "var(--radius-md)",
              marginBottom: "0.65rem",
              background: track.albums?.cover_url
                ? `url(${track.albums.cover_url}) center/cover`
                : "var(--gradient-signature)",
            }}
          />
          <p style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{track.title}</p>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem" }}>
            {track.artists?.name ?? "Unknown artist"}
          </p>
        </article>
      ))}
    </div>
  );
}
