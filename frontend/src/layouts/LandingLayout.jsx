import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/shell/Header'
import Footer from '@/components/shell/Footer'
import MobileNav from '@/components/navigation/MobileNav'
import ScrollToTop from '@/components/shell/ScrollToTop'
import { mainNavigation } from '@/config/navigation'

export function LandingLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const mobileItems = mainNavigation.map((item) => ({
    id: item.id,
    label: item.title,
    icon: item.icon,
    route: item.route,
  }))

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-sans">
      <ScrollToTop />
      <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={mobileItems}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default LandingLayout
