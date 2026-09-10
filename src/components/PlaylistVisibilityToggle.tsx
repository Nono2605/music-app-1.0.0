"use client";

import { useState, useTransition } from "react";
import { setPlaylistVisibility } from "@/app/actions/playlists";

export function PlaylistVisibilityToggle({
  playlistId,
  initialIsPublic,
}: {
  playlistId: string;
  initialIsPublic: boolean;
}) {
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !isPublic;
    setIsPublic(next); // optimiste — on réconcilie si l'appel échoue
    startTransition(async () => {
      try {
        await setPlaylistVisibility(playlistId, next);
      } catch {
        setIsPublic(!next);
      }
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className="btn btn-secondary"
      style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
      aria-pressed={isPublic}
    >
      {isPublic ? "🌐 Public" : "🔒 Private"}
    </button>
  );
}
