/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useNavigate, useLocation } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Cuando Supabase regresa, la sesión ya debería estar en local storage.
    // Validamos y redirigimos a donde el usuario iba.
    const run = async () => {
      await supabase.auth.getSession()
      const state = (location.state as any) || {}
      navigate(state.from?.pathname || '/dashboard', { replace: true })
    }
    run()
  }, [navigate, location])

  return null
}