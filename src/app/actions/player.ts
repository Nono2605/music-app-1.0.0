"use server";

import { createClient } from "@/lib/supabase/server";
import { api } from "@/lib/api";

export interface StreamUrl {
  url: string;
  format: string;
}

export async function getStreamUrl(trackId: string): Promise<StreamUrl> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  return api.get<StreamUrl>(`/tracks/${trackId}/stream`, { accessToken: session.access_token });
}
