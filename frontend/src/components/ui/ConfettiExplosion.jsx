import { motion } from 'framer-motion'

export function ConfettiExplosion() {
  const colors = ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#3b82f6', '#f43f5e']

  const particles = Array.from({ length: 40 }).map((_, idx) => {
    // Math to compute explosion vectors radiating outward and upward
    const angle = (Math.random() * 120 + 210) * (Math.PI / 180) // 210 to 330 deg (upward fan)
    const distance = 100 + Math.random() * 180
    const xDest = Math.cos(angle) * distance
    const yDest = Math.sin(angle) * distance // peak height
    const color = colors[idx % colors.length]
    const size = 6 + Math.random() * 8
    const duration = 2.0 + Math.random() * 1.5
    const delay = Math.random() * 0.1

    return {
      id: idx,
      x: xDest,
      y: yDest,
      color,
      size,
      duration,
      delay,
    }
  })

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: [0, p.y, p.y + 400], // move up to peak, then fall down
            opacity: [1, 1, 0],
            scale: [1, 0.8, 0.3],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size * 0.65, // rectangular paper shards
            backgroundColor: p.color,
            borderRadius: '1.5px',
          }}
        />
      ))}
    </div>
  )
}

export default ConfettiExplosion
