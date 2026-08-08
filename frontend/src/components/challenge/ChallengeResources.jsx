import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'

export function ChallengeResources({ challenge }) {
  const defaultResources = [
    {
      title: 'Official React Docs — Custom Hooks',
      type: 'Documentation',
      iconName: 'BookOpen',
      url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      description: 'Comprehensive guidelines on state extraction, hook composition, and effect cleanup patterns.',
    },
    {
      title: 'MDN Web Docs — AbortController Signal',
      type: 'Reference',
      iconName: 'FileText',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      description: 'Standard browser API for cancelling fetch HTTP requests to avoid unmounted React component state updates.',
    },
    {
      title: 'Async Hooks & Exponential Backoff Deep Dive',
      type: 'Video Tutorial',
      iconName: 'Video',
      url: 'https://youtube.com',
      color: 'text-red-400 bg-red-500/10 border-red-500/20',
      description: 'Step-by-step 15-minute video breakdown of state machine transitions during API retry policies.',
    },
    {
      title: 'ABTalks Reference GitHub Implementation',
      type: 'Sample Code',
      iconName: 'Code',
      url: 'https://github.com',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      description: 'Official starter template repo with TypeScript definitions, test mocks, and setup scripts.',
    },
  ]

  const resourcesList = challenge?.resources && challenge.resources.length > 0
    ? challenge.resources.map((r, idx) => ({
        title: r.title,
        type: r.type,
        url: r.url,
        description: r.description,
        iconName: idx === 0 ? 'BookOpen' : idx === 1 ? 'FileText' : idx === 2 ? 'Video' : 'Code',
        color: idx % 4 === 0
          ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
          : idx % 4 === 1
          ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
          : idx % 4 === 2
          ? 'text-red-400 bg-red-500/10 border-red-500/20'
          : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      }))
    : defaultResources

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Icon name="Bookmark" size={18} className="text-amber-400" />
          <h3 className="text-lg font-black text-white tracking-tight">Curated Learning Resources</h3>
        </div>
        <span className="text-xs font-semibold text-neutral-400">{resourcesList.length} Learning Guides</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resourcesList.map((res, idx) => (
          <GlassCard
            key={idx}
            className="p-5 border border-neutral-800/80 hover:border-neutral-700 transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className={`p-2.5 rounded-xl border ${res.color}`}>
                  <Icon name={res.iconName} size={18} />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800">
                  {res.type}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                {res.title}
              </h4>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{res.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-semibold text-[11px]">Free Access</span>
              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 font-bold hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Read Resource</span>
                <Icon name="ExternalLink" size={13} />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

export default ChallengeResources
