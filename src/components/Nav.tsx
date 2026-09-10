import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { api } from "@/lib/api";
import { logout } from "@/app/actions/auth";

interface Me {
  profile: { username: string } | null;
}

export async function Nav() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let displayName: string | null = null;
  if (session) {
    try {
      const me = await api.get<Me>("/me", { accessToken: session.access_token });
      displayName = me.profile?.username ?? session.user.email ?? null;
    } catch {
      displayName = session.user.email ?? null;
    }
  }

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-sm) var(--space-lg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <Link
        href="/"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.125rem" }}
      >
        BRAND
      </Link>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <Link href="/discover">Discover</Link>
        <Link href="/search">Search</Link>
        {session ? (
          <>
            <Link href="/library">Library</Link>
            <Link href="/playlists">Playlists</Link>
            <Link
              href="/account"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--color-text-muted)",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "var(--gradient-signature)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {displayName?.[0]?.toUpperCase() ?? "?"}
              </span>
              {displayName ?? "Account"}
            </Link>
            <form action={logout}>
              <button
                type="submit"
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  font: "inherit",
                  padding: 0,
                }}
              >
                Log out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login">Log in</Link>
            <Link href="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export function NavFallback() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-sm) var(--space-lg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.125rem" }}>
        BRAND
      </span>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }} />
    </nav>
  );
}
