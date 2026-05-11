import { Bell, X } from 'lucide-react'
import type { Task } from '../types'

interface Props {
  task: Task
  onDismiss: () => void
}

export default function AlarmToast({ task, onDismiss }: Props) {
  return (
    <div className="alarm-pulse flex items-center gap-3 bg-amber-400/10 border border-amber-400/30 rounded-2xl px-4 py-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0">
        <Bell size={15} className="text-amber-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-amber-400/70 font-mono uppercase tracking-widest mb-0.5">Reminder</p>
        <p className="text-sm text-amber-100 truncate">{task.text}</p>
      </div>
      <button
        onClick={onDismiss}
        className="w-7 h-7 rounded-full flex items-center justify-center text-amber-400/50 hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  )
}
