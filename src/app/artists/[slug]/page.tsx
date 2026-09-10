import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { api } from "@/lib/api";
import { TrackGrid, type Track } from "@/components/TrackGrid";
import { FollowButton } from "@/components/FollowButton";

interface ArtistDetail {
  id: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  verified: boolean;
  tracks: Omit<Track, "artists">[];
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { slug } = await params;

  let artist: ArtistDetail;
  try {
    artist = await api.get<ArtistDetail>(`/artists/${slug}`);
  } catch {
    notFound();
  }

  const { following } = await api.get<{ following: boolean }>(`/me/follows/${artist.id}`, {
    accessToken: session.access_token,
  });

  const tracksWithArtist: Track[] = artist.tracks.map((t) => ({ ...t, artists: { name: artist.name } }));

  return (
    <div>
      <div
        style={{
          height: 200,
          background: artist.banner_url
            ? `url(${artist.banner_url}) center/cover`
            : "var(--gradient-signature)",
        }}
      />
      <div style={{ padding: "0 var(--space-lg)", marginTop: -48 }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            border: "4px solid var(--color-bg)",
            background: artist.avatar_url
              ? `url(${artist.avatar_url}) center/cover`
              : "var(--gradient-signature)",
            marginBottom: "var(--space-sm)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", flexWrap: "wrap" }}>
          <h1 style={{ fontSize: "1.75rem" }}>
            {artist.name}
            {artist.verified && (
              <span title="Verified" style={{ color: "var(--color-blue-bright)" }}>
                {" "}
                ✓
              </span>
            )}
          </h1>
          <FollowButton artistId={artist.id} initialFollowing={following} />
        </div>
        {artist.bio && (
          <p style={{ color: "var(--color-text-muted)", maxWidth: "60ch", marginTop: "var(--space-sm)" }}>
            {artist.bio}
          </p>
        )}

        <section style={{ marginTop: "var(--space-xl)", paddingBottom: "var(--space-xl)" }}>
          <h2 style={{ fontSize: "1.125rem", marginBottom: "var(--space-md)" }}>Tracks</h2>
          <TrackGrid tracks={tracksWithArtist} emptyMessage="No tracks published yet." />
        </section>
      </div>
    </div>
  );
}
