/**
 * Reusable Framer Motion Variants for Premium SaaS Animations
 */

export const fadeIn = (direction = 'up', type = 'tween', delay = 0, duration = 0.4) => ({
  hidden: {
    x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
})

export const scaleIn = (delay = 0, duration = 0.4) => ({
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 150,
      delay,
      duration,
    },
  },
})

export const slideIn = (direction = 'left', type = 'tween', delay = 0, duration = 0.4) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
})

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

export const pageTransition = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.18,
      ease: 'easeIn',
    },
  },
}
