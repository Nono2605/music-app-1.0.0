import { api } from "@/lib/api";

interface Track {
  id: string;
  title: string;
  duration_seconds: number | null;
  artists: { name: string } | null;
  albums: { cover_url: string | null } | null;
}

interface TracksResponse {
  data: Track[];
}

export default async function DiscoverPage() {
  const { data: tracks } = await api.get<TracksResponse>("/tracks?limit=24");

  return (
    <div style={{ padding: "var(--space-lg)" }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "var(--space-sm)" }}>Discover</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-lg)" }}>
        Every track published on BRAND, most recent first.
      </p>

      {tracks.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)" }}>No tracks published yet — check back soon.</p>
      ) : (
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
      )}
    </div>
  );
}
