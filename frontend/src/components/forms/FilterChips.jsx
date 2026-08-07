import Chip from '@/components/ui/Chip'
import { cn } from '@/utils/cn'

export function FilterChips({
  options = [], // [{ label: 'Easy', value: 'easy', icon: <.../> }] or ['Easy', 'Medium']
  selectedValues, // Array of strings (multiselect) or single string
  onChange,
  multiSelect = false,
  className,
  ...props
}) {
  const handleSelect = (val) => {
    if (!onChange) return

    if (multiSelect) {
      const current = Array.isArray(selectedValues) ? selectedValues : []
      if (current.includes(val)) {
        onChange(current.filter((item) => item !== val))
      } else {
        onChange([...current, val])
      }
    } else {
      onChange(selectedValues === val ? null : val)
    }
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)} {...props}>
      {options.map((option) => {
        const label = typeof option === 'string' ? option : option.label
        const value = typeof option === 'string' ? option : option.value
        const icon = typeof option === 'string' ? null : option.icon

        const isActive = multiSelect
          ? Array.isArray(selectedValues) && selectedValues.includes(value)
          : selectedValues === value

        return (
          <Chip
            key={value}
            label={label}
            active={isActive}
            icon={icon}
            onClick={() => handleSelect(value)}
          />
        )
      })}
    </div>
  )
}

export default FilterChips
