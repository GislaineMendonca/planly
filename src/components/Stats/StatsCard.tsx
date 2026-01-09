interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <h4 className="text-3xl font-bold text-gray-800 dark:text-white">{value}</h4>
        {trend && <p className="text-xs text-green-500 mt-2 font-medium">{trend}</p>}
      </div>
      <div className="p-3 bg-primary-50 dark:bg-dark-700 rounded-xl text-primary-600 dark:text-primary-400">
        {icon}
      </div>
    </div>
  );
}