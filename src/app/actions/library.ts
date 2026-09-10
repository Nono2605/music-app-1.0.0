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

export async function saveToLibrary(itemType: string, itemId: string) {
  await api.post(`/library/${itemType}/${itemId}`, undefined, { accessToken: await accessToken() });
}

export async function removeFromLibrary(itemType: string, itemId: string) {
  await api.delete(`/library/${itemType}/${itemId}`, { accessToken: await accessToken() });
}
