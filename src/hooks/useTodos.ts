import { useState, useEffect } from 'react';
import type { Task, Priority } from '../types/index';

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('planly-tasks');
    
    if (!saved) return [];

    try {
      return JSON.parse(saved).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined
      }));
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('planly-tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = (title: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
      priority,
      createdAt: new Date(),
    };
    
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => 
      prev.map((task) => {
        if (task.id === id) {
          const newStatus = !task.isCompleted;
          return {
            ...task,
            isCompleted: newStatus,
            completedAt: newStatus ? new Date() : undefined 
          };
        }
        return task;
      })
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTaskPriority = (id: string, newPriority: Priority) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

  return {
    tasks,
    addTask,
    toggleTask,
    removeTask,
    updateTaskPriority
  };
}