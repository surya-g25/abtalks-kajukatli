import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
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
import { pageTransition } from '@/utils/motion'

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false)
  const location = useLocation()

  const mobileItems = mainNavigation.map((item) => ({
    id: item.id,
    label: item.title,
    icon: item.icon,
    route: item.route,
  }))

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-sans">
      <ScrollToTop />
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
            {/* Global Page Transition Wrapper */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
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
