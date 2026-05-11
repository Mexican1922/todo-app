interface Props {
  total: number
  done: number
}

export default function StatsBar({ total, done }: Props) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-white/25 font-mono">{done} of {total} done</span>
        <span className="text-xs text-white/25 font-mono">{pct}%</span>
      </div>
      <div className="h-px bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500/60 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
