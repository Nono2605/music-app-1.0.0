import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { api } from "@/lib/api";

interface Me {
  profile: { username: string } | null;
}

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const me = await api.get<Me>("/me", { accessToken: session.access_token });
  if (!me.profile) {
    redirect("/onboarding");
  }

  // Pas encore de vrai feed d'accueil connecté — /discover en attendant.
  redirect("/discover");
}
