import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export const GoogleButton = () => {
  const handleGoogleSignIn = async () => {
    const redirectTo = window.location.origin + '/auth/callback';
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo
      }
    })
    if(error) {
      console.error('Error during Google sign-in:', error.message);
    }
  }

  return (
    <Button onClick={handleGoogleSignIn} variant="outline">
      Iniciar sesión
    </Button>
  )
}