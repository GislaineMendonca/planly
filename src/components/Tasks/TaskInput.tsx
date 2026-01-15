import { useState, FormEvent } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import type { Priority } from '../../types';

interface TaskInputProps {
  onAddTask: (title: string, priority: Priority) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask(title, priority);
    setTitle('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="O que você precisa fazer?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 
            text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
        />
        
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="appearance-none w-full pl-4 pr-10 py-3 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 
                text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
            
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
              <ChevronDown size={18} />
            </div>
          </div>

          <button
            type="submit"
            disabled={!title.trim()}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium 
              flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
      </div>
    </form>
  );
}