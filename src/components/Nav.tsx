import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { api } from "@/lib/api";
import { logout } from "@/app/actions/auth";
import { NavLink } from "@/components/NavLink";

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
    <nav style={navStyle}>
      <Link href="/" style={brandStyle}>
        BRAND
      </Link>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <NavLink href="/discover">Discover</NavLink>
        <NavLink href="/search">Search</NavLink>
        {session ? (
          <>
            <NavLink href="/library">Library</NavLink>
            <NavLink href="/playlists">Playlists</NavLink>
            <NavLink href="/account">
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span aria-hidden style={avatarStyle}>
                  {displayName?.[0]?.toUpperCase() ?? "?"}
                </span>
                {displayName ?? "Account"}
              </span>
            </NavLink>
            <form action={logout}>
              <button type="submit" className="btn-plain">
                Log out
              </button>
            </form>
          </>
        ) : (
          <>
            <NavLink href="/login">Log in</NavLink>
            <NavLink href="/signup">Sign up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export function NavFallback() {
  return (
    <nav style={navStyle}>
      <span style={brandStyle}>BRAND</span>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }} />
    </nav>
  );
}

const navStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "var(--space-sm) var(--space-lg)",
  borderBottom: "1px solid var(--color-border)",
};

const brandStyle: React.CSSProperties = {
  fontFamily: "var(--font-heading)",
  fontWeight: 700,
  fontSize: "1.125rem",
};

const avatarStyle: React.CSSProperties = {
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
};
