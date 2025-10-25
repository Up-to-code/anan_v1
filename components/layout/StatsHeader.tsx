// components/layout/StatsHeader.tsx
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Stat {
  label: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  description?: string;
}

interface StatsHeaderProps {
  title: string;
  description?: string;
  stats: Stat[];
}

export function StatsHeader({ title, description, stats }: StatsHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden rounded-lg border border-gray-200 p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">
                {stat.label}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stat.value}
              </dd>
              {stat.change && (
                <div className={`flex items-center text-sm font-medium ${
                  stat.change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change.type === 'increase' ? (
                    <TrendingUp size={16} className="mr-1" />
                  ) : (
                    <TrendingDown size={16} className="mr-1" />
                  )}
                  {stat.change.value}% from last period
                </div>
              )}
              {stat.description && (
                <p className="mt-2 text-xs text-gray-500">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}