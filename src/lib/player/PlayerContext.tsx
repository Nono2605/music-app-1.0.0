"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { getStreamUrl } from "@/app/actions/player";

export interface PlayerTrack {
  id: string;
  title: string;
  artistName: string;
  coverUrl: string | null;
}

interface PlayerState {
  track: PlayerTrack | null;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  error: string | null;
}

interface PlayerContextValue extends PlayerState {
  play: (track: PlayerTrack) => void;
  toggle: () => void;
  seek: (seconds: number) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}

const initialState: PlayerState = {
  track: null,
  isPlaying: false,
  isLoading: false,
  currentTime: 0,
  duration: 0,
  error: null,
};

// Le <audio> vit ici, monté une seule fois dans le layout racine : la
// lecture survit à la navigation client-side tant que ce Provider reste
// monté, ce qui est le cas puisqu'il enveloppe {children} au niveau racine.
export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackIdRef = useRef<string | null>(null);
  const [state, setState] = useState<PlayerState>(initialState);

  const play = useCallback(async (track: PlayerTrack) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (trackIdRef.current === track.id) {
      audio.play().catch((err) => {
        setState((s) => ({ ...s, isPlaying: false, error: err instanceof Error ? err.message : "Could not resume playback." }));
      });
      setState((s) => ({ ...s, isPlaying: true }));
      return;
    }

    trackIdRef.current = track.id;
    setState({ ...initialState, track, isLoading: true });

    try {
      const { url } = await getStreamUrl(track.id);
      if (trackIdRef.current !== track.id) return; // un autre morceau a été choisi entre-temps
      audio.src = url;
      await audio.play();
      setState((s) => ({ ...s, isLoading: false, isPlaying: true }));
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        isPlaying: false,
        error: err instanceof Error ? err.message : "Could not play this track.",
      }));
    }
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !trackIdRef.current) return;
    if (audio.paused) {
      audio.play().catch((err) => {
        setState((s) => ({ ...s, isPlaying: false, error: err instanceof Error ? err.message : "Could not resume playback." }));
      });
      setState((s) => ({ ...s, isPlaying: true }));
    } else {
      audio.pause();
      setState((s) => ({ ...s, isPlaying: false }));
    }
  }, []);

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = seconds;
    setState((s) => ({ ...s, currentTime: seconds }));
  }, []);

  return (
    <PlayerContext.Provider value={{ ...state, play, toggle, seek }}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => {
          // Lire currentTarget tout de suite : la fonction de mise à jour du
          // state passée à setState s'exécute de façon différée, et React a
          // déjà recyclé l'événement synthétique à ce moment-là (currentTarget
          // devient null) — d'où le crash "Cannot read properties of null".
          const currentTime = e.currentTarget.currentTime;
          setState((s) => ({ ...s, currentTime }));
        }}
        onLoadedMetadata={(e) => {
          const duration = e.currentTarget.duration;
          setState((s) => ({ ...s, duration }));
        }}
        onEnded={() => setState((s) => ({ ...s, isPlaying: false, currentTime: 0 }))}
        onError={() =>
          setState((s) => ({ ...s, isPlaying: false, isLoading: false, error: "Playback error." }))
        }
      />
    </PlayerContext.Provider>
  );
}
