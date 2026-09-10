"use client";

import { useState, useTransition } from "react";
import { followUser, unfollowUser } from "@/app/actions/follow";

export function FollowUserButton({ userId, initialFollowing }: { userId: string; initialFollowing: boolean }) {
  const [following, setFollowing] = useState(initialFollowing);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !following;
    setFollowing(next); // optimiste — on réconcilie si l'appel échoue
    startTransition(async () => {
      try {
        if (next) await followUser(userId);
        else await unfollowUser(userId);
      } catch {
        setFollowing(!next);
      }
    });
  }

  return (
    <button onClick={toggle} disabled={pending} className={`btn ${following ? "btn-secondary" : "btn-primary"}`}>
      {following ? "Following" : "Follow"}
    </button>
  );
}
