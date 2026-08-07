import { Outlet } from 'react-router-dom'

export default function ProtectedLayout() {
  // Protected guard logic placeholder (e.g. check auth context)
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Outlet />
    </div>
  )
}
