"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { api } from "@/lib/api";
import type { AuthFormState } from "@/app/actions/auth";

export async function updateProfile(
  _state: AuthFormState | undefined,
  formData: FormData
): Promise<AuthFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const displayName = String(formData.get("display_name") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return { error: "Not authenticated" };

  try {
    await api.post(
      "/profile",
      { username, display_name: displayName || null, bio: bio || null },
      { accessToken: session.access_token }
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not update profile." };
  }

  revalidatePath("/account");
  return { message: "Profile updated." };
}
