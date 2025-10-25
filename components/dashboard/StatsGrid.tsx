/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/StatsGrid.tsx
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface StatCard {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<any>;
  description: string;
}

interface StatsGridProps {
  stats: StatCard[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} padding="lg" hover>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0 ml-4">
                <p className="text-sm font-medium text-gray-500 truncate">
                  {stat.title}
                </p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <Badge 
                    variant={stat.changeType === 'increase' ? 'success' : 'error'} 
                    className="ml-2"
                  >
                    {stat.changeType === 'increase' ? (
                      <TrendingUp size={12} className="mr-1" />
                    ) : (
                      <TrendingDown size={12} className="mr-1" />
                    )}
                    {stat.change}%
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {stat.description}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}