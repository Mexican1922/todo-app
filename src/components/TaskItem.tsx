import { Check, Trash2, Bell } from 'lucide-react'
import type { Task } from '../types'

interface Props {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const PRIORITY_DOT: Record<Task['priority'], string> = {
  low: 'bg-zinc-600',
  medium: 'bg-blue-500',
  high: 'bg-rose-500',
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <div
      className={`task-enter group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
        task.done
          ? 'bg-transparent border-white/[0.03] opacity-40'
          : 'bg-[#161616] border-white/[0.06] hover:border-white/10'
      }`}
    >
      {/* Priority dot */}
      <div className={`w-1 h-1 rounded-full flex-shrink-0 ${PRIORITY_DOT[task.priority]} ${task.done ? 'opacity-0' : ''}`} />

      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? 'Mark undone' : 'Mark done'}
        className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
          task.done
            ? 'bg-emerald-500/20 border-emerald-500/40'
            : 'border-white/20 hover:border-white/40'
        }`}
      >
        {task.done && <Check size={10} className="text-emerald-400" strokeWidth={3} />}
      </button>

      {/* Text */}
      <span className={`flex-1 text-sm transition-all duration-200 ${task.done ? 'line-through text-white/30' : 'text-white/75'}`}>
        {task.text}
      </span>

      {/* Alarm badge */}
      {task.alarm && (
        <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400/50 flex-shrink-0">
          <Bell size={10} />
          {task.alarm}
        </span>
      )}

      {/* Delete */}
      <button
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg flex items-center justify-center text-white/20 hover:text-rose-400 hover:bg-rose-400/10 transition-all duration-150"
      >
        <Trash2 size={12} />
      </button>
    </div>
  )
}
