import Icon from '@/components/common/Icon'

export function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-neutral-400">
      {items.map((item, idx) => (
        <div key={item.label} className="flex items-center gap-2">
          {idx > 0 && <Icon name="ChevronRight" size={14} className="text-neutral-600" />}
          {item.href ? (
            <a href={item.href} className="hover:text-amber-400 transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-neutral-200 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumb
