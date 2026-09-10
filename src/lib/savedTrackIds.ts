import { api } from "@/lib/api";

interface LibraryRow {
  item_type: string;
  item: { id: string } | null;
}

/** Ids des morceaux déjà sauvegardés par l'utilisateur, pour amorcer SaveButton. */
export async function getSavedTrackIds(accessToken: string): Promise<Set<string>> {
  const { data } = await api.get<{ data: LibraryRow[] }>("/library", { accessToken });
  return new Set(data.filter((row) => row.item_type === "track" && row.item).map((row) => row.item!.id));
}
