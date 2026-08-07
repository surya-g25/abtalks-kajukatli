import { Link } from 'react-router-dom'
import Icon from '@/components/common/Icon'
import { footerNavigation } from '@/config/navigation'

export function Footer() {
  return (
    <footer className="w-full glass-panel border-t border-neutral-800/80 mt-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-neutral-800">
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-black text-sm">
              AB
            </div>
            <span className="text-base font-extrabold text-white">ABTalks</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Elevating conversations, community challenges, and interactive video experiences.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">Product</h4>
          <ul className="space-y-2 text-xs font-medium text-neutral-400">
            {footerNavigation.product.map((item) => (
              <li key={item.label}>
                <Link to={item.route} className="hover:text-amber-400 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">Company</h4>
          <ul className="space-y-2 text-xs font-medium text-neutral-400">
            {footerNavigation.company.map((item) => (
              <li key={item.label}>
                <a href={item.route} className="hover:text-amber-400 transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links & Version */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">Connect</h4>
          <div className="flex items-center gap-3 text-neutral-400">
            {footerNavigation.socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:text-amber-400 hover:border-neutral-700 transition"
                aria-label={item.label}
              >
                <Icon name={item.icon} size={16} />
              </a>
            ))}
          </div>
          <div className="mt-4 text-[11px] font-mono text-neutral-500">v1.0.0 — Production Build</div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
        <p>© {new Date().getFullYear()} ABTalks Redesign. All rights reserved.</p>
        <div className="flex gap-4">
          {footerNavigation.legal.map((item) => (
            <a key={item.label} href={item.route} className="hover:text-neutral-400 transition">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
