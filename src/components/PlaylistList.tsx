import Link from "next/link";

export interface PlaylistSummary {
  id: string;
  title: string;
  cover_url: string | null;
}

export function PlaylistList({ playlists, emptyMessage }: { playlists: PlaylistSummary[]; emptyMessage: string }) {
  if (playlists.length === 0) {
    return <p style={{ color: "var(--color-text-muted)" }}>{emptyMessage}</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {playlists.map((playlist) => (
        <Link
          key={playlist.id}
          href={`/playlists/${playlist.id}`}
          className="list-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-md)",
            padding: "0.6rem",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              flex: "none",
              borderRadius: "var(--radius-sm)",
              background: playlist.cover_url
                ? `url(${playlist.cover_url}) center/cover`
                : "var(--gradient-signature)",
            }}
          />
          <span style={{ fontWeight: 600 }}>{playlist.title}</span>
        </Link>
      ))}
    </div>
  );
}
