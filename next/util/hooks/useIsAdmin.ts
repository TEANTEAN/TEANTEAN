import { useSession } from "next-auth/client";
import { ROLES } from "./withAuth";

export default function useIsAdmin() {
  const [session] = useSession();

  return !!(session?.user?.role === ROLES.ADMIN);
}
