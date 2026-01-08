import type { FilterStatus } from '../../types';

interface FilterBarProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

export function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  const filters: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'completed', label: 'Concluídas' },
  ];

  return (
    <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-dark-800 rounded-xl w-fit">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${currentFilter === filter.value
              ? 'bg-white dark:bg-dark-900 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}