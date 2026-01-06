import { useState } from 'react';
import { LayoutDashboard, CheckSquare, Timer, BarChart2, Settings } from 'lucide-react';

const TasksView = () => <div className="p-8"><h2 className="text-2xl font-bold dark:text-white">Minhas Tarefas</h2></div>;
const PomodoroView = () => <div className="p-8"><h2 className="text-2xl font-bold dark:text-white">Foco / Pomodoro</h2></div>;
const StatsView = () => <div className="p-8"><h2 className="text-2xl font-bold dark:text-white">Produtividade</h2></div>;

function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'pomodoro' | 'stats'>('tasks');
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      
      <aside className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
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

      <main className="flex-1 overflow-auto">
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