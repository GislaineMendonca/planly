import { Play, Pause, RotateCcw, Coffee, Brain, Armchair } from 'lucide-react';
import { usePomodoro } from '../../hooks/usePomodoro';
import type { PomodoroMode } from '../../types';

export function PomodoroTimer() {
  const { 
    mode, timeLeft, formatTime, isActive, progress, 
    toggleTimer, resetTimer, changeMode 
  } = usePomodoro();

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col items-center">
      
      <div className="flex bg-white dark:bg-dark-800 p-1 rounded-2xl shadow-sm mb-10">
        <ModeButton 
          current={mode} target="focus" icon={<Brain size={18}/>} label="Foco" onClick={changeMode} 
        />
        <ModeButton 
          current={mode} target="shortBreak" icon={<Coffee size={18}/>} label="Pausa Curta" onClick={changeMode} 
        />
        <ModeButton 
          current={mode} target="longBreak" icon={<Armchair size={18}/>} label="Descanso Longo" onClick={changeMode} 
        />
      </div>

      <div className="relative w-72 h-72 mb-10 flex items-center justify-center">
        <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
          <circle
            cx="144" cy="144" r="130"
            className="stroke-gray-200 dark:stroke-dark-700 fill-none"
            strokeWidth="12"
          />
          <circle
            cx="144" cy="144" r="130"
            className={`fill-none transition-all duration-1000 ease-linear
              ${mode === 'focus' ? 'stroke-primary-500' : mode === 'shortBreak' ? 'stroke-emerald-500' : 'stroke-blue-500'}
            `}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="816"
            strokeDashoffset={816 - (816 * progress) / 100}
          />
        </svg>

        <div className="text-center z-10">
          <div className="text-6xl font-bold text-gray-800 dark:text-white font-mono tracking-wider">
            {formatTime(timeLeft)}
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
            {isActive ? 'Mantenha o foco' : 'Pronto para começar?'}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className={`
            px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95
            ${isActive ? 'bg-gray-800 dark:bg-dark-700 hover:bg-gray-900' : 'bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30'}
          `}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
          {isActive ? 'Pausar' : 'Iniciar Foco'}
        </button>

        <button
          onClick={resetTimer}
          className="p-4 rounded-2xl bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
          title="Reiniciar Timer"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}

function ModeButton({ 
  current, target, icon, label, onClick 
}: { 
  current: PomodoroMode; target: PomodoroMode; icon: React.ReactNode; label: string; onClick: (m: PomodoroMode) => void 
}) {
  const active = current === target;
  return (
    <button
      onClick={() => onClick(target)}
      className={`
        flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all
        ${active 
          ? 'bg-primary-50 dark:bg-dark-700 text-primary-700 dark:text-primary-400 shadow-sm' 
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}