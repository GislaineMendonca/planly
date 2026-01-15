import { Trash2, CheckCircle2, Circle } from 'lucide-react';
import type { Task } from '../../types';
import { priorityStyles, priorityLabels } from '../../utils/styles';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div 
      className={`
        group flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-200
        ${task.isCompleted 
          ? 'bg-gray-50 border-gray-100 dark:bg-dark-800/50 dark:border-gray-800 opacity-75' 
          : 'bg-white border-gray-200 dark:bg-dark-800 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary-500/30'
        }
      `}
    >
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => onToggle(task.id)}
          className={`transition-colors duration-200 ${
            task.isCompleted ? 'text-green-500' : 'text-gray-300 hover:text-primary-500'
          }`}
        >
          {task.isCompleted ? (
            <CheckCircle2 size={24} className="fill-green-500 text-white" />
          ) : (
            <Circle size={24} />
          )}
        </button>

        <div className="flex flex-col">
          <span 
            className={`font-medium text-lg transition-all ${
              task.isCompleted 
                ? 'text-gray-400 line-through' 
                : 'text-gray-800 dark:text-gray-100'
            }`}
          >
            {task.title}
          </span>
          <span className="text-xs text-gray-400">
            {new Intl.DateTimeFormat('pt-BR', { 
              day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
            }).format(task.createdAt)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityStyles[task.priority]}`}>
          {priorityLabels[task.priority]}
        </span>

        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
          title="Remover tarefa"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}