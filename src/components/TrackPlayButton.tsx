"use client";

import { usePlayer, type PlayerTrack } from "@/lib/player/PlayerContext";

export function TrackPlayButton({
  track,
  size = 36,
}: {
  track: PlayerTrack;
  /** Diamètre en px — plus petit pour les listes en ligne, plus grand pour les cartes. */
  size?: number;
}) {
  const { track: current, isPlaying, play, toggle } = usePlayer();
  const isCurrent = current?.id === track.id;
  const showPause = isCurrent && isPlaying;

  function handleClick() {
    if (isCurrent) toggle();
    else play(track);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={showPause ? "Pause" : "Play"}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "none",
        background: "var(--gradient-signature)",
        color: "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.4,
        flex: "none",
      }}
    >
      {showPause ? "❚❚" : "▶"}
    </button>
  );
}
