import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import Icon from '@/components/common/Icon'

export function Drawer({ isOpen, onClose, title, children, side = 'right', className }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const sideVariants = {
    right: { hidden: { x: '100%' }, visible: { x: 0 } },
    left: { hidden: { x: '-100%' }, visible: { x: 0 } },
  }

  const sideStyles = {
    right: 'right-0 top-0 bottom-0 w-full max-w-md border-l border-neutral-800',
    left: 'left-0 top-0 bottom-0 w-full max-w-md border-r border-neutral-800',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sideVariants[side]}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn('fixed z-10 bg-neutral-900 p-6 shadow-2xl flex flex-col', sideStyles[side], className)}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pt-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Drawer
