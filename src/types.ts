export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: number
  text: string
  done: boolean
  alarm: string | null      // HH:MM
  alarmFired: boolean
  priority: Priority
  createdAt: number
}

export type Filter = 'all' | 'active' | 'done' | 'alarm'
