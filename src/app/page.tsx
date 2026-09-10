import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Pas encore de vrai feed d'accueil connecté — /discover en attendant.
  redirect(session ? "/discover" : "/login");
}
