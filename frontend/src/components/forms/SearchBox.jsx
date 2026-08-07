import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function SearchBox({
  value = '',
  onChange,
  placeholder = 'Search...',
  onClear,
  shortcutHint = '⌘K',
  className,
  ...props
}) {
  return (
    <div className={cn('relative flex items-center w-full max-w-md', className)}>
      <div className="absolute left-3.5 flex items-center pointer-events-none text-neutral-500">
        <Icon name="Search" size={16} />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl py-2.5 pl-10 pr-12 text-xs font-semibold focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-neutral-505 placeholder:text-neutral-500"
        {...props}
      />
      <div className="absolute right-3.5 flex items-center gap-1.5">
        {value ? (
          <button
            type="button"
            onClick={onClear}
            className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
          >
            <Icon name="X" size={14} />
          </button>
        ) : (
          shortcutHint && (
            <span className="hidden sm:inline-block text-[9px] font-bold text-neutral-500 bg-neutral-950 border border-neutral-850 px-1.5 py-0.5 rounded shadow-sm select-none" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {shortcutHint}
            </span>
          )
        )}
      </div>
    </div>
  )
}

export default SearchBox
