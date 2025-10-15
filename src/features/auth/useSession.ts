import { useSessionContext, useUser } from "@supabase/auth-helpers-react";

export function useSession() {
  const { session, isLoading, error } = useSessionContext()
  const user = useUser()
  return { session, user, isLoading, error }
}