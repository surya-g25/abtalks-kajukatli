import { useLocation, Link } from 'react-router-dom'
import Icon from '@/components/common/Icon'

export function DynamicBreadcrumb() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  if (pathnames.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-neutral-400 py-2">
      <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1">
        <Icon name="Home" size={14} />
        <span>Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')

        return (
          <div key={routeTo} className="flex items-center gap-2">
            <Icon name="ChevronRight" size={14} className="text-neutral-600 shrink-0" />
            {isLast ? (
              <span className="text-neutral-200 font-bold">{formattedName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-amber-400 transition-colors">
                {formattedName}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default DynamicBreadcrumb
