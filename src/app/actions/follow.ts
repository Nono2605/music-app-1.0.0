"use server";

import { createClient } from "@/lib/supabase/server";
import { api } from "@/lib/api";

async function accessToken() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");
  return session.access_token;
}

export async function followArtist(artistId: string) {
  await api.post(`/artists/${artistId}/follow`, undefined, { accessToken: await accessToken() });
}

export async function unfollowArtist(artistId: string) {
  await api.delete(`/artists/${artistId}/follow`, { accessToken: await accessToken() });
}
