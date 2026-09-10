import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { api } from "@/lib/api";
import { formatDuration } from "@/lib/formatDuration";

interface AlbumTrack {
  id: string;
  title: string;
  duration_seconds: number | null;
  track_number: number | null;
}

interface AlbumDetail {
  id: string;
  title: string;
  cover_url: string | null;
  release_date: string | null;
  type: string;
  artists: { name: string; slug: string } | null;
  tracks: AlbumTrack[];
}

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  let album: AlbumDetail;
  try {
    album = await api.get<AlbumDetail>(`/albums/${id}`);
  } catch {
    notFound();
  }

  const releaseYear = album.release_date ? new Date(album.release_date).getFullYear() : null;

  return (
    <div style={{ padding: "var(--space-lg)", maxWidth: 720 }}>
      <div style={{ display: "flex", gap: "var(--space-lg)", marginBottom: "var(--space-xl)", flexWrap: "wrap" }}>
        <div
          style={{
            width: 180,
            height: 180,
            flex: "none",
            borderRadius: "var(--radius-md)",
            background: album.cover_url ? `url(${album.cover_url}) center/cover` : "var(--gradient-signature)",
          }}
        />
        <div style={{ alignSelf: "flex-end" }}>
          <p
            style={{
              textTransform: "uppercase",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              color: "var(--color-text-muted)",
              marginBottom: "0.35rem",
            }}
          >
            {album.type}
          </p>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{album.title}</h1>
          {album.artists && (
            <p style={{ color: "var(--color-text-muted)" }}>
              <Link href={`/artists/${album.artists.slug}`} style={{ color: "var(--color-blue-bright)" }}>
                {album.artists.name}
              </Link>
              {releaseYear && ` · ${releaseYear}`}
            </p>
          )}
        </div>
      </div>

      <section>
        {album.tracks.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>No tracks published yet.</p>
        ) : (
          <ol style={{ listStyle: "none" }}>
            {album.tracks.map((track, index) => (
              <li
                key={track.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                  padding: "0.65rem 0",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <span style={{ color: "var(--color-text-muted)", width: 24, textAlign: "right" }}>
                  {track.track_number ?? index + 1}
                </span>
                <span style={{ flex: 1 }}>{track.title}</span>
                <span style={{ color: "var(--color-text-muted)", fontVariantNumeric: "tabular-nums" }}>
                  {formatDuration(track.duration_seconds)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
