import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'
import Badge from '@/components/ui/Badge'

export function PublicPortfolioSection() {
  const topProjects = [
    {
      name: 'Custom Async Data Fetching Hook',
      category: 'React & State Machines',
      stars: '142 ⭐',
      tech: ['React 19', 'TypeScript', 'AbortController'],
      link: 'https://github.com/alexrivera/react-async-retry-hook',
    },
    {
      name: 'Distributed Real-Time Audio Platform',
      category: 'Full-Stack Architecture',
      stars: '89 ⭐',
      tech: ['Node.js', 'Express', 'MongoDB', 'WebSockets'],
      link: 'https://github.com/alexrivera/audio-stream-server',
    },
    {
      name: 'SaaS Design System Components',
      category: 'UI Engineering',
      stars: '64 ⭐',
      tech: ['Tailwind CSS v4', 'Framer Motion', 'Lucide'],
      link: 'https://github.com/alexrivera/abtalks-ui-kit',
    },
  ]

  const skillsStack = [
    { name: 'React 19', level: 'Advanced' },
    { name: 'Node.js & Express', level: 'Advanced' },
    { name: 'TypeScript', level: 'Intermediate' },
    { name: 'MongoDB & Mongoose', level: 'Advanced' },
    { name: 'Tailwind CSS v4', level: 'Expert' },
    { name: 'Framer Motion', level: 'Advanced' },
    { name: 'REST APIs & WebSockets', level: 'Advanced' },
    { name: 'Jest & Unit Testing', level: 'Intermediate' },
  ]

  const certificates = [
    { title: 'ABTalks Level 12 Full-Stack Developer Certificate', date: 'Issued Oct 2026', badge: 'Verified' },
    { title: 'React 19 Async Architecture Master Badge', date: 'Issued Oct 2026', badge: 'Verified' },
  ]

  return (
    <div className="space-y-6">
      {/* Top Projects Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Icon name="Folder" size={18} className="text-amber-400" />
            <h3 className="text-lg font-black text-white tracking-tight">Top Verified Projects</h3>
          </div>
          <a
            href="https://github.com/alexrivera"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>View GitHub Repos</span>
            <Icon name="ExternalLink" size={13} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topProjects.map((p, idx) => (
            <GlassCard key={idx} className="p-5 border border-neutral-800/80 hover:border-neutral-700 transition space-y-3 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                    {p.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-400">{p.stars}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {p.name}
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tech.map((t, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-neutral-950 text-[10px] font-mono text-neutral-400 border border-neutral-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-semibold text-[11px]">Public Code</span>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Repository</span>
                  <Icon name="Github" size={13} />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Tech Stack & Certificates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Tech Stack */}
        <GlassCard className="p-6 border border-neutral-800/80 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
            <Icon name="Cpu" size={18} className="text-amber-400" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Skills & Tech Stack</h4>
          </div>

          <div className="flex flex-wrap gap-2">
            {skillsStack.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-xs font-bold text-white">{s.name}</span>
                <span className="text-[9px] font-extrabold uppercase text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  {s.level}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Verified Certificates */}
        <GlassCard className="p-6 border border-neutral-800/80 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
            <Icon name="Award" size={18} className="text-amber-400" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Verified Certificates</h4>
          </div>

          <div className="space-y-3">
            {certificates.map((c, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 flex items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-bold text-white">{c.title}</h5>
                  <span className="text-[10px] text-neutral-500 block mt-0.5">{c.date}</span>
                </div>
                <Badge variant="success" className="text-[9px] font-black uppercase shrink-0">
                  {c.badge}
                </Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default PublicPortfolioSection
