import { useMemo, useState, useCallback } from "react";
import { Trash2 } from "lucide-react";
import { useTasks } from "./hooks/useTasks";
import { useAlarm } from "./hooks/useAlarm";
import AddTask from "./components/AddTask";
import TaskItem from "./components/TaskItem";
import FilterTabs from "./components/FilterTabs";
import StatsBar from "./components/StatsBar";
import AlarmToast from "./components/AlarmToast";
import { useDateTime } from "./hooks/useDateTime";
import type { Filter } from "./types";

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask, markAlarmFired, clearDone } =
    useTasks();
  const { ringingTask, dismissAlarm } = useAlarm(tasks, markAlarmFired);
  const [filter, setFilter] = useState<Filter>("all");

  const { dateStr, timeStr } = useDateTime();

  const filtered = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.done);
    if (filter === "done") return tasks.filter((t) => t.done);
    if (filter === "alarm") return tasks.filter((t) => t.alarm);
    return tasks;
  }, [tasks, filter]);

  const counts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.filter((t) => !t.done).length,
      done: tasks.filter((t) => t.done).length,
      alarm: tasks.filter((t) => t.alarm).length,
    }),
    [tasks],
  );

  const handleFilterChange = useCallback((f: Filter) => setFilter(f), []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Replace the old header div with this */}
        <div className="mb-8">
          <div className="flex items-end justify-between mb-1">
            <p className="text-xs text-white/25 font-mono uppercase tracking-widest">
              {dateStr}
            </p>
            <p className="text-xs text-white/25 font-mono">{timeStr}</p>
          </div>
          <h1 className="text-2xl font-medium text-white/90 tracking-tight">
            My tasks
          </h1>
        </div>

        {ringingTask && (
          <AlarmToast task={ringingTask} onDismiss={dismissAlarm} />
        )}

        <StatsBar total={tasks.length} done={counts.done} />
        <AddTask onAdd={addTask} />
        <FilterTabs
          active={filter}
          counts={counts}
          onChange={handleFilterChange}
        />

        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/15 text-sm">Nothing here</p>
            </div>
          ) : (
            filtered.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>

        {counts.done > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={clearDone}
              className="flex items-center gap-1.5 text-xs text-white/15 hover:text-white/30 transition-colors"
            >
              <Trash2 size={11} />
              Clear {counts.done} completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
