import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState, type PropsWithChildren } from "react";
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function AuthProvider({
  children
}: PropsWithChildren){
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        await supabase.auth.getSession();
      }finally {
        setReady(true);
      }
    }

    run();
  }, [])

  if(!ready) return null;

  return (
    <SessionContextProvider supabaseClient={supabase} >
      {children}
    </SessionContextProvider>
  )
}