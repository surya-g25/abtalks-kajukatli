import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function AchievementPopup({ isOpen, onClose, achievementName = 'Pioneer', rewardXp = 100, description, iconName = 'Award', className, ...props }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md" className={className} {...props}>
      <div className="flex flex-col items-center text-center p-4">
        {/* Celebration Glowing Circle */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl scale-125 animate-pulse pointer-events-none" />
          <div className="relative p-5 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 text-neutral-950 shadow-xl shadow-amber-500/30 border border-amber-400">
            <Icon name={iconName} size={42} />
          </div>
        </div>

        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
          Achievement Unlocked!
        </span>

        <h3 className="text-xl font-black text-white mt-2 leading-snug">
          {achievementName}
        </h3>

        {description && (
          <p className="text-xs text-neutral-400 mt-2 max-w-xs leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm font-bold text-amber-400 flex items-center gap-1.5 px-6 select-none">
          <Icon name="Zap" size={16} />
          <span>+{rewardXp} XP Reward Claimed</span>
        </div>

        <div className="flex items-center gap-3 w-full mt-8">
          <Button variant="outline" size="sm" className="flex-1 font-bold" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" className="flex-1 font-bold gap-1.5">
            <Icon name="Share2" size={14} />
            Share
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export function CompletionDialog({ isOpen, onClose, title = 'Challenge Completed!', stats = [], primaryActionLabel = 'Done', onPrimaryAction, className, ...props }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md" className={className} {...props}>
      <div className="flex flex-col items-center text-center p-4">
        <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-5">
          <Icon name="Trophy" size={36} />
        </div>

        <h3 className="text-lg font-bold text-white leading-tight">
          {title}
        </h3>
        <p className="text-xs text-neutral-400 mt-1 max-w-xs">
          Fantastic job! You've successfully completed all tasks and milestones.
        </p>

        {stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 w-full mt-6 bg-neutral-900/60 border border-neutral-850 p-4 rounded-2xl" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {stats.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center p-2 rounded-xl bg-neutral-950/40 border border-neutral-900/50">
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wide">{s.label}</span>
                <span className="text-sm font-black text-white mt-1 flex items-center gap-1">
                  {s.icon && <Icon name={s.icon} size={12} className="text-amber-400" />}
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <Button
          variant="primary"
          size="sm"
          className="w-full mt-8 font-bold"
          onClick={() => {
            onPrimaryAction?.()
            onClose()
          }}
        >
          {primaryActionLabel}
        </Button>
      </div>
    </Modal>
  )
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  title = 'Are you sure?',
  description = 'This action cannot be undone. Please confirm.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  isDestructive = false,
  className,
  ...props
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm" className={className} {...props}>
      <div className="p-2 text-center sm:text-left">
        <div className={cn(
          'p-3 rounded-full w-fit mx-auto sm:mx-0 mb-4 border',
          isDestructive
            ? 'bg-red-500/10 text-red-400 border-red-500/20'
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        )}>
          <Icon name={isDestructive ? 'AlertTriangle' : 'HelpCircle'} size={24} />
        </div>

        <h3 className="text-base font-bold text-white tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-6 pt-4 border-t border-neutral-900/60 w-full">
          <Button variant="outline" size="sm" className="w-full sm:w-auto font-bold py-2 order-2 sm:order-1" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={isDestructive ? 'danger' : 'primary'}
            size="sm"
            className="w-full sm:w-auto font-bold py-2 order-1 sm:order-2"
            onClick={() => {
              onConfirm?.()
              onClose()
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
