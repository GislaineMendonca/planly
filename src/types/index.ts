export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: Priority;
  createdAt: Date;
  completedAt?: Date;
}

export type FilterStatus = 'all' | 'pending' | 'completed';

export interface TaskFilter {
  status: FilterStatus;
  priority: Priority | 'all';
  searchQuery: string;
}

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

export interface PomodoroSettings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  autoStartBreaks: boolean;
}

export interface DailyProductivity {
  day: string;
  completed: number;
  focusMinutes: number;
}