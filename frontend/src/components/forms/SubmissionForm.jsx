import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

export function SubmissionForm({
  title,
  description,
  children,
  onSubmit,
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  isLoading = false,
  className,
  ...props
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'glass-panel p-6 rounded-2xl border border-neutral-800 space-y-6 w-full max-w-xl mx-auto',
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="border-b border-neutral-900/60 pb-4">
          {title && <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>}
          {description && <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{description}</p>}
        </div>
      )}

      <div className="space-y-4">
        {children}
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-900/60">
        {onCancel && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          size="sm"
          isLoading={isLoading}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default SubmissionForm
