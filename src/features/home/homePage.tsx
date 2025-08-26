import { GoogleButton } from '@/features/auth/googleButton'
import { useSession } from '@/features/auth/useSession'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const { user } = useSession()

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div>
      <h1>Home</h1>
      {user ? (
        <>
          <p>Hola, {user.email}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <GoogleButton />
      )}
    </div>
  )
}
