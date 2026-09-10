"use client";

import { usePlayer } from "@/lib/player/PlayerContext";
import { formatDuration } from "@/lib/formatDuration";

export function PlayerBar() {
  const { track, isPlaying, isLoading, currentTime, duration, error, toggle, seek } = usePlayer();

  if (!track) return null;

  return (
    <div style={barStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", minWidth: 0, flex: "1 1 200px" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "var(--radius-sm)",
            flex: "none",
            background: track.coverUrl ? `url(${track.coverUrl}) center/cover` : "var(--gradient-signature)",
          }}
        />
        <div style={{ minWidth: 0 }}>
          <p style={titleStyle}>{track.title}</p>
          <p style={artistStyle}>{track.artistName}</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem", flex: "2 1 320px", maxWidth: 480 }}>
        <button
          onClick={toggle}
          disabled={isLoading}
          aria-label={isPlaying ? "Pause" : "Play"}
          style={playButtonStyle}
        >
          {isLoading ? "…" : isPlaying ? "❚❚" : "▶"}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%" }}>
          <span style={timeStyle}>{formatDuration(Math.floor(currentTime))}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={Math.min(currentTime, duration || 0)}
            onChange={(e) => seek(Number(e.target.value))}
            style={{ flex: 1, accentColor: "var(--color-blue-bright)" }}
            aria-label="Seek"
          />
          <span style={timeStyle}>{duration ? formatDuration(Math.floor(duration)) : "--:--"}</span>
        </div>
      </div>

      <div style={{ flex: "1 1 200px", textAlign: "right" }}>
        {error && <span style={{ color: "#ff6b6b", fontSize: "0.8125rem" }}>{error}</span>}
      </div>
    </div>
  );
}

const barStyle: React.CSSProperties = {
  position: "sticky",
  bottom: 0,
  display: "flex",
  alignItems: "center",
  gap: "var(--space-lg)",
  padding: "var(--space-sm) var(--space-lg)",
  borderTop: "1px solid var(--color-border)",
  background: "var(--color-card)",
  flexWrap: "wrap",
};

const titleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: "0.875rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const artistStyle: React.CSSProperties = {
  color: "var(--color-text-muted)",
  fontSize: "0.75rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const playButtonStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "none",
  background: "var(--gradient-signature)",
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
};

const timeStyle: React.CSSProperties = {
  color: "var(--color-text-muted)",
  fontSize: "0.75rem",
  fontVariantNumeric: "tabular-nums",
  width: 36,
  flex: "none",
};
