import { useEffect } from "react";
import Router from "next/router";
import { Session } from "next-auth";
import { useSession } from "next-auth/client";

export interface WithAuthHook {
  session: Session;
  haveAuthenticated: () => boolean;
}

interface WithAuthInterface {
  redirectTo?: false | string;
  redirectIfFound?: boolean | string;
  permittedRole?: boolean | string | Array<string>;
}

type UseSession = [Session & { user?: { role?: string } }, boolean];

// Helper function to check if user can access content
function isAuthorised(
  role: string,
  permittedRole: string | Array<string> | boolean
): boolean {
  if (typeof permittedRole === "string" && permittedRole === role) {
    return true;
  }
  if (Array.isArray(permittedRole)) {
    return permittedRole.includes(role);
  }
  return false;
}

export default function withAuth({
  redirectTo = false,
  redirectIfFound = false,
  permittedRole = false,
}: WithAuthInterface = {}) {
  const [session, loading]: UseSession = useSession();
  // Helper function returned to block content flashing
  const haveAuthenticated = () => {
    // if no session, not authenticated
    if (!session) return false;
    // if have session and no special role, is authenticated
    if (!permittedRole) return true;
    // if have session and role required, need check if authorized
    if (permittedRole && session?.user?.role)
      return isAuthorised(session.user.role, permittedRole);
    // Don't need authentication
    return false;
  };
  useEffect(() => {
    // if no redirect or still loading just return (on page already)
    if (!redirectTo || loading) return;
    // Shorcircuiting Redirection Scenarios (don't use redirectIfFound if possible)
    // 1. Redirect if not logged in
    // 2. Redirect only if found the user
    // 3. Redirect if not authorised
    // 4. Redirect only if authorised
    if (
      (redirectTo && !redirectIfFound && !session) ||
      (redirectIfFound && session && !permittedRole) ||
      (permittedRole && !isAuthorised(session.user.role, permittedRole)) ||
      (permittedRole &&
        redirectIfFound &&
        isAuthorised(session.user.role, permittedRole))
    ) {
      Router.replace(redirectTo);
    }
  }, [loading, redirectIfFound, redirectTo]);

  return { session, haveAuthenticated };
}
