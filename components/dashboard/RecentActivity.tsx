// components/dashboard/RecentActivity.tsx
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { User, ShoppingCart, DollarSign, FileText } from 'lucide-react';

interface Activity {
  id: number;
  type: 'user' | 'order' | 'payment' | 'document';
  title: string;
  description: string;
  time: string;
  user?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'user': return User;
      case 'order': return ShoppingCart;
      case 'payment': return DollarSign;
      case 'document': return FileText;
      default: return User;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'user': return 'primary';
      case 'order': return 'success';
      case 'payment': return 'warning';
      case 'document': return 'default';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
            View all
          </button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <Badge variant={getBadgeVariant(activity.type)} size="sm">
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  {activity.description}
                </p>
                {activity.user && (
                  <p className="text-xs text-gray-400 mt-1">
                    by {activity.user}
                  </p>
                )}
              </div>
              
              <div className="flex-shrink-0 text-xs text-gray-400">
                {activity.time}
              </div>
            </div>
          );
        })}
        </div>
      </CardContent>
    </Card>
  );
}