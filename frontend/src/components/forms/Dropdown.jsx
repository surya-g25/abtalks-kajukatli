import { useState, useRef, useEffect } from 'react'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function Dropdown({
  options = [], // [{ label, value, iconName }]
  value,
  onChange,
  label,
  placeholder = 'Select option',
  disabled = false,
  className,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-1.5 w-full relative', className)} {...props}>
      {label && <label className="text-xs font-bold text-neutral-300 uppercase tracking-wide">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl py-2.5 px-3.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer select-none',
          isOpen && 'border-amber-500/80 ring-1 ring-amber-500/20',
          disabled && 'opacity-55 cursor-not-allowed pointer-events-none'
        )}
      >
        <div className="flex items-center gap-2">
          {selectedOption?.iconName && (
            <span className="text-amber-400">
              <Icon name={selectedOption.iconName} size={15} />
            </span>
          )}
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <Icon name="ChevronDown" size={14} className={cn('text-neutral-500 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full glass-panel border border-neutral-800 rounded-xl shadow-2xl p-1 z-50 max-h-56 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange?.(opt.value)
                  setIsOpen(false)
                }}
                className={cn(
                  'flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer',
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-850 hover:text-white'
                )}
              >
                {opt.iconName && (
                  <span className={isSelected ? 'text-neutral-950' : 'text-amber-400'}>
                    <Icon name={opt.iconName} size={14} />
                  </span>
                )}
                <span className="flex-1">{opt.label}</span>
                {isSelected && <Icon name="Check" size={14} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown
