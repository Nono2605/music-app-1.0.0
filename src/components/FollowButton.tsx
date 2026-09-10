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
      className={`btn ${following ? "btn-secondary" : "btn-primary"}`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
