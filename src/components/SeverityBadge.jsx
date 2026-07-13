const STYLES = {
  정상: 'bg-emerald-100 text-emerald-700 ring-emerald-600/20',
  주의: 'bg-amber-100 text-amber-700 ring-amber-600/20',
  경고: 'bg-orange-100 text-orange-700 ring-orange-600/20',
  이상: 'bg-red-100 text-red-700 ring-red-600/20',
}

const DOT_STYLES = {
  정상: 'bg-emerald-500',
  주의: 'bg-amber-500',
  경고: 'bg-orange-500',
  이상: 'bg-red-500',
}

export default function SeverityBadge({ severity, size = 'md' }) {
  const sizeClass = size === 'lg' ? 'px-4 py-1.5 text-base' : 'px-2.5 py-1 text-xs'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset ${sizeClass} ${STYLES[severity] ?? 'bg-slate-100 text-slate-600 ring-slate-500/20'}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[severity] ?? 'bg-slate-400'}`} />
      {severity}
    </span>
  )
}
