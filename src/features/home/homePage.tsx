import { Button } from '@/components/ui/button'
import { UserButton } from '@/components/userButton'
import { GoogleButton } from '@/features/auth/googleButton'
import { useSession } from '@/features/auth/useSession'
import { Link } from 'react-router-dom'

export default function Home() {
  const { user } = useSession()

  return (
    <main>
      <header className='flex flex-wrap items-center justify-center p-4'>
        {user ? (
          <div className='flex flex-col items-center justify-center'>
            <UserButton />
            <span className='ml-2 font-medium text-lg text-neutral-900'>{user.user_metadata.name || user.email}</span>
          </div>
        ) : (
          <GoogleButton />
        )}
      </header>
      <section className='w-full flex flex-col items-center justify-'>
        <img src="./inkedalpha-logo.webp" alt="Logo" />
        {
          user &&
          <Link to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        }
      </section>
    </main>
  )
}
