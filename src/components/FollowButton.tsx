"use client";

import { useState, useTransition } from "react";
import { followArtist, unfollowArtist } from "@/app/actions/follow";

export function FollowButton({ artistId, initialFollowing }: { artistId: string; initialFollowing: boolean }) {
  const [following, setFollowing] = useState(initialFollowing);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !following;
    setFollowing(next); // optimiste — on réconcilie si l'appel échoue
    startTransition(async () => {
      try {
        if (next) await followArtist(artistId);
        else await unfollowArtist(artistId);
      } catch {
        setFollowing(!next);
      }
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      style={{
        padding: "0.6rem 1.25rem",
        borderRadius: "var(--radius-sm)",
        border: following ? "1px solid var(--color-border)" : "none",
        background: following ? "transparent" : "var(--gradient-signature)",
        color: following ? "var(--color-text)" : "#fff",
        fontWeight: 600,
        cursor: pending ? "default" : "pointer",
        opacity: pending ? 0.7 : 1,
      }}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
