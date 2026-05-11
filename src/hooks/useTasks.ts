import { useState, useEffect } from 'react'
import type { Task } from '../types'

const KEY = 'vt_todo_tasks'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text: string, alarm: string | null, priority: Task['priority']) => {
    setTasks(prev => [
      {
        id: Date.now(),
        text,
        done: false,
        alarm,
        alarmFired: false,
        priority,
        createdAt: Date.now(),
      },
      ...prev,
    ])
  }

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const markAlarmFired = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, alarmFired: true } : t))
  }

  const clearDone = () => {
    setTasks(prev => prev.filter(t => !t.done))
  }

  return { tasks, addTask, toggleTask, deleteTask, markAlarmFired, clearDone }
}
