import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/common/Icon'
import Button from '@/components/ui/Button'
import CompletionRing from '@/components/progress/CompletionRing'
import ConfettiExplosion from '@/components/ui/ConfettiExplosion'

export function CompletionCelebrationModal({ isOpen, onClose }) {
  const [animatedXp, setAnimatedXp] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setAnimatedXp(0)
      const target = 250
      let current = 0
      const increment = 10
      const interval = setInterval(() => {
        current += increment
        if (current >= target) {
          setAnimatedXp(target)
          clearInterval(interval)
        } else {
          setAnimatedXp(current)
        }
      }, 30)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-neutral-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-center"
        >
          {/* Confetti Explosion particles */}
          <ConfettiExplosion />

          {/* Ambient Confetti Sparkle Aura */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800/80 text-neutral-400 hover:text-white transition"
          >
            <Icon name="X" size={18} />
          </button>

          {/* Trophy & Ring Icon */}
          <div className="relative mx-auto w-24 h-24 mb-4 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/40"
            />
            <CompletionRing percentage={100} size={88} strokeWidth={8} color="amber">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-neutral-950 shadow-lg shadow-amber-500/40"
              >
                <Icon name="Trophy" size={24} className="stroke-[2.5]" />
              </motion.div>
            </CompletionRing>
          </div>

          {/* Congratulations Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 inline-block mb-2">
              Mission Accomplished 🎉
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Day 14 Challenge Complete!
            </h2>
            <p className="text-xs text-neutral-300 mt-2 max-w-sm mx-auto leading-relaxed">
              Awesome work! You successfully built and submitted the custom React async retry hook.
            </p>
          </motion.div>

          {/* Reward Summary Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="my-6 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-semibold">Total XP Earned</span>
              <span className="text-lg font-mono font-black text-amber-400">+{animatedXp} XP</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-800/80">
              <span className="text-neutral-400 font-semibold">Streak Maintained</span>
              <span className="text-sm font-extrabold text-amber-400 flex items-center gap-1">
                <span>🔥 14 Days</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-800/80">
              <span className="text-neutral-400 font-semibold">Badges Unlocked</span>
              <span className="text-xs font-bold text-purple-300">"Flame Master" & "Async Ace"</span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-3 pt-2"
          >
            <Link to="/dashboard" className="w-full sm:flex-1">
              <Button variant="primary" size="md" className="w-full justify-center font-bold">
                <Icon name="Home" size={16} />
                <span>Return to Dashboard</span>
              </Button>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 text-xs font-bold transition"
            >
              Close & Review
            </button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default CompletionCelebrationModal
