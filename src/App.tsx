import { useState } from 'react';
import { LayoutDashboard, CheckSquare, Timer, BarChart2, Settings } from 'lucide-react';

import { useTodos } from './hooks/useTodos';
import type { FilterStatus } from './types';

import { TaskInput } from './components/Tasks/TaskInput';
import { TaskItem } from './components/Tasks/TaskItem';
import { FilterBar } from './components/Tasks/FilterBar';
import { PomodoroTimer } from './components/Pomodoro/Timer';

const StatsView = () => <div className="p-8"><h2 className="text-2xl font-bold dark:text-white">Produtividade</h2></div>;

const PomodoroView = () => (
  <div className="p-6 md:p-10 h-full flex flex-col">
    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Timer Pomodoro</h1>
    <div className="flex-1 flex items-center justify-center">
      <PomodoroTimer />
    </div>
  </div>
);

const TasksView = () => {
  const { tasks, addTask, toggleTask, removeTask } = useTodos();
  
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const totalCount = tasks.length;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Minhas Tarefas</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Você completou <strong className="text-primary-600 dark:text-primary-400">{completedCount}</strong> de <strong className="text-gray-700 dark:text-gray-300">{totalCount}</strong> tarefas
        </p>
      </div>

      <TaskInput onAddTask={addTask} />

      <FilterBar currentFilter={filter} onFilterChange={setFilter} />

      <div className="space-y-1">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-600 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
            <p>
              {filter === 'all' 
                ? 'Nenhuma tarefa por aqui. Adicione uma acima! 🚀' 
                : filter === 'pending'
                ? 'Tudo feito! Nenhuma pendência. 🎉'
                : 'Nenhuma tarefa concluída ainda.'}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
              onDelete={removeTask} 
            />
          ))
        )}
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'pomodoro' | 'stats'>('tasks');
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      
      <aside className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <CheckSquare className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-white">Planly</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem 
            icon={<LayoutDashboard size={20}/>} 
            label="Tarefas" 
            active={activeTab === 'tasks'} 
            onClick={() => setActiveTab('tasks')}
          />
          <NavItem 
            icon={<Timer size={20}/>} 
            label="Pomodoro" 
            active={activeTab === 'pomodoro'} 
            onClick={() => setActiveTab('pomodoro')}
          />
          <NavItem 
            icon={<BarChart2 size={20}/>} 
            label="Estatísticas" 
            active={activeTab === 'stats'} 
            onClick={() => setActiveTab('stats')}
          />
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Settings size={20} />
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'pomodoro' && <PomodoroView />}
        {activeTab === 'stats' && <StatsView />}
      </main>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 w-full text-sm font-medium rounded-lg transition-all
        ${active 
          ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-500' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default App;