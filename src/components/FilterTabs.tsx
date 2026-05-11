import type { Filter } from '../types'

interface Props {
  active: Filter
  counts: Record<Filter, number>
  onChange: (f: Filter) => void
}

const TABS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'done', label: 'Done' },
  { value: 'alarm', label: 'Alarms' },
]

export default function FilterTabs({ active, counts, onChange }: Props) {
  return (
    <div className="flex gap-1 mb-5">
      {TABS.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 ${
            active === tab.value
              ? 'bg-white/10 text-white/90'
              : 'text-white/30 hover:text-white/50'
          }`}
        >
          {tab.label}
          {counts[tab.value] > 0 && (
            <span className={`text-[10px] font-mono ${active === tab.value ? 'text-white/50' : 'text-white/20'}`}>
              {counts[tab.value]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
