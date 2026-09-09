"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { api } from "@/lib/api";
import type { AuthFormState } from "@/app/actions/auth";

export async function completeOnboarding(
  _state: AuthFormState | undefined,
  formData: FormData
): Promise<AuthFormState> {
  const username = String(formData.get("username") ?? "").trim();

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  try {
    await api.post("/profile", { username }, { accessToken: session.access_token });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not save profile." };
  }

  redirect("/");
}
