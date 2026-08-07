import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-sans">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
