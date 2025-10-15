import { RouterProvider } from 'react-router-dom'
import routes from '@/app/routes/routes'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  )
}
