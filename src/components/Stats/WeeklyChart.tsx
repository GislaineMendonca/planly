import { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { format, subDays, isSameDay, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Task } from '../../types';

interface WeeklyChartProps {
  tasks: Task[];
}

export function WeeklyChart({ tasks }: WeeklyChartProps) {
  
  const data = useMemo(() => {
    const last7Days = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      
      const completedCount = tasks.filter(task => {
        if (!task.isCompleted || !task.completedAt) return false;
        return isSameDay(startOfDay(task.completedAt), startOfDay(date));
      }).length;

      last7Days.push({
        name: format(date, 'EEE', { locale: ptBR }),
        fullDate: format(date, "d 'de' MMMM", { locale: ptBR }),
        tarefas: completedCount,
      });
    }
    return last7Days;
  }, [tasks]);

  return (
    <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
        Produtividade Semanal
      </h3>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              dy={10}
            />
            
            <YAxis 
              allowDecimals={false}
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
            />
            
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }}
            />
            
            <Bar 
              dataKey="tarefas" 
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              barSize={32}
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}