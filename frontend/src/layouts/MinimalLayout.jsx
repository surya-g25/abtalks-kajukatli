import { Outlet } from 'react-router-dom'
import ScrollToTop from '@/components/shell/ScrollToTop'

export function MinimalLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 font-sans p-4">
      <ScrollToTop />
      <Outlet />
    </div>
  )
}

export default MinimalLayout
