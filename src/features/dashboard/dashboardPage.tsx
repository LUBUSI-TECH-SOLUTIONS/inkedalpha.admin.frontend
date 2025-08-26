import { useSession } from '@/features/auth/useSession'

export default function Dashboard() {
  const { user } = useSession()
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
