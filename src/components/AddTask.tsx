import { useState } from 'react'
import { Plus, Clock, Flag } from 'lucide-react'
import type { Priority } from '../types'

interface Props {
  onAdd: (text: string, alarm: string | null, priority: Priority) => void
}

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-zinc-400' },
  { value: 'medium', label: 'Med', color: 'text-blue-400' },
  { value: 'high', label: 'High', color: 'text-rose-400' },
]

export default function AddTask({ onAdd }: Props) {
  const [text, setText] = useState('')
  const [alarm, setAlarm] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [showExtra, setShowExtra] = useState(false)

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed, alarm || null, priority)
    setText('')
    setAlarm('')
    setPriority('medium')
    setShowExtra(false)
  }

  return (
    <div className="bg-[#161616] border border-white/[0.06] rounded-2xl p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0" />
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          onFocus={() => setShowExtra(true)}
          placeholder="Add a task..."
          maxLength={100}
          className="flex-1 bg-transparent text-sm text-white/80 placeholder-white/20 outline-none"
        />
        <button
          onClick={handleSubmit}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
          aria-label="Add task"
        >
          <Plus size={14} className="text-white/60" />
        </button>
      </div>

      {showExtra && (
        <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-white/30">
            <Clock size={13} />
            <input
              type="time"
              value={alarm}
              onChange={e => setAlarm(e.target.value)}
              className="bg-transparent text-xs text-white/50 outline-none w-[90px]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <Flag size={13} className="text-white/30" />
            <div className="flex gap-1">
              {PRIORITIES.map(p => (
                <button
                  key={p.value}
                  onClick={() => setPriority(p.value)}
                  className={`text-xs px-2 py-0.5 rounded-full transition-all ${
                    priority === p.value
                      ? 'bg-white/10 ' + p.color
                      : 'text-white/25 hover:text-white/40'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowExtra(false)}
            className="ml-auto text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
