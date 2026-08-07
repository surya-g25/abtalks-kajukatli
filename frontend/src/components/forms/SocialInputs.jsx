import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function GitHubInput({ label = 'GitHub Profile', error, success, value, onChange, placeholder = 'username', disabled, className, ...props }) {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <label className="text-xs font-bold text-neutral-300 uppercase tracking-wide">{label}</label>}
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center pointer-events-none text-neutral-400">
          <Icon name="Github" size={16} />
        </div>
        <div className="absolute left-9 text-xs font-semibold text-neutral-500 pointer-events-none select-none">
          github.com/
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full bg-neutral-900 border text-white rounded-xl py-2 pl-[110px] pr-10 text-xs font-medium focus:outline-none transition-all',
            error
              ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
              : success
              ? 'border-emerald-500/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30'
              : 'border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30',
            disabled && 'opacity-55 cursor-not-allowed'
          )}
          {...props}
        />
        {error && (
          <div className="absolute right-3 text-red-400 pointer-events-none">
            <Icon name="AlertCircle" size={16} />
          </div>
        )}
        {success && !error && (
          <div className="absolute right-3 text-emerald-400 pointer-events-none">
            <Icon name="CheckCircle" size={16} />
          </div>
        )}
      </div>
      {error && <p className="text-[10px] font-semibold text-red-400 mt-0.5">{error}</p>}
    </div>
  )
}

export function LinkedInInput({ label = 'LinkedIn Profile', error, success, value, onChange, placeholder = 'username', disabled, className, ...props }) {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <label className="text-xs font-bold text-neutral-300 uppercase tracking-wide">{label}</label>}
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center pointer-events-none text-neutral-400">
          <Icon name="Linkedin" size={16} />
        </div>
        <div className="absolute left-9 text-xs font-semibold text-neutral-500 pointer-events-none select-none">
          linkedin.com/in/
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full bg-neutral-900 border text-white rounded-xl py-2 pl-[134px] pr-10 text-xs font-medium focus:outline-none transition-all',
            error
              ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
              : success
              ? 'border-emerald-500/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30'
              : 'border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30',
            disabled && 'opacity-55 cursor-not-allowed'
          )}
          {...props}
        />
        {error && (
          <div className="absolute right-3 text-red-400 pointer-events-none">
            <Icon name="AlertCircle" size={16} />
          </div>
        )}
        {success && !error && (
          <div className="absolute right-3 text-emerald-400 pointer-events-none">
            <Icon name="CheckCircle" size={16} />
          </div>
        )}
      </div>
      {error && <p className="text-[10px] font-semibold text-red-400 mt-0.5">{error}</p>}
    </div>
  )
}
