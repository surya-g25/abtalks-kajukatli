import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from '@/components/shell/Header'
import Sidebar from '@/components/shell/Sidebar'
import MobileBottomNav from '@/components/shell/MobileBottomNav'
import MobileNav from '@/components/navigation/MobileNav'
import Footer from '@/components/shell/Footer'
import ScrollToTop from '@/components/shell/ScrollToTop'
import DynamicBreadcrumb from '@/components/shell/DynamicBreadcrumb'
import Container from '@/components/layout-primitives/Container'
import { AIAssistantDrawer } from '@/components/ai/AIAssistantDrawer'
import { mainNavigation } from '@/config/navigation'

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false)

  const mobileItems = mainNavigation.map((item) => ({
    id: item.id,
    label: item.title,
    icon: item.icon,
    route: item.route,
  }))

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-sans">
      <ScrollToTop />
      {/* Toast Notification Container */}
      <Toaster position="top-right" theme="dark" closeButton richColors />

      <Header
        onMobileMenuToggle={() => setMobileMenuOpen(true)}
        onAiToggle={() => setAiDrawerOpen((prev) => !prev)}
      />

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={mobileItems}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 min-w-0">
          <Container maxWidth="full">
            <DynamicBreadcrumb />
            <Outlet />
          </Container>
        </main>
      </div>

      <AIAssistantDrawer isOpen={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} />

      <MobileBottomNav />
      <Footer />
    </div>
  )
}

export default AppLayout
