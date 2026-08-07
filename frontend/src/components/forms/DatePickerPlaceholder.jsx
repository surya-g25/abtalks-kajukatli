import { useState, useRef, useEffect } from 'react'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function DatePickerPlaceholder({
  value, // string format: e.g. YYYY-MM-DD
  onChange,
  label,
  placeholder = 'Select date',
  disabled = false,
  className,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  // Mock days of calendar grid
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-1.5 w-full relative', className)} {...props}>
      {label && <label className="text-xs font-bold text-neutral-300 uppercase tracking-wide">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl py-2.5 px-3.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer select-none text-left',
          isOpen && 'border-amber-500/80 ring-1 ring-amber-500/20',
          disabled && 'opacity-55 cursor-not-allowed pointer-events-none'
        )}
      >
        <span className="text-neutral-500">
          <Icon name="Calendar" size={15} />
        </span>
        <span className="flex-1">{value || placeholder}</span>
        <Icon name="ChevronDown" size={14} className={cn('text-neutral-500 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-[240px] glass-panel border border-neutral-800 rounded-xl shadow-2xl p-3 z-50 select-none">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-white">August 2026</span>
            <div className="flex gap-1 text-neutral-400">
              <button type="button" className="p-1 hover:text-white cursor-pointer"><Icon name="ChevronLeft" size={12} /></button>
              <button type="button" className="p-1 hover:text-white cursor-pointer"><Icon name="ChevronRight" size={12} /></button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-neutral-500 mb-1.5">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Pad calendar grid */}
            <span className="text-neutral-900" />
            <span className="text-neutral-900" />
            <span className="text-neutral-900" />
            <span className="text-neutral-900" />
            <span className="text-neutral-900" />

            {daysInMonth.map((day) => {
              const dayStr = `2026-08-${String(day).padStart(2, '0')}`
              const isSelected = value === dayStr
              const isToday = day === 8

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => {
                    onChange?.(dayStr)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'h-6 w-6 rounded-md text-[10px] font-bold flex items-center justify-center cursor-pointer transition-colors',
                    isSelected
                      ? 'bg-amber-500 text-neutral-950 font-black'
                      : isToday
                      ? 'border border-amber-500/50 text-amber-400 font-extrabold'
                      : 'text-neutral-300 hover:bg-neutral-850'
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePickerPlaceholder
