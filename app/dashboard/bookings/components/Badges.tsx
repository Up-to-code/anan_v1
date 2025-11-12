import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Booking } from '../types';

interface StatusBadgeProps {
  status: Booking['status'];
}

interface PriorityBadgeProps {
  priority: Booking['priority'];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<Booking['status'], { color: string, icon: React.ElementType }> = {
    pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: Clock },
    confirmed: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle },
    cancelled: { color: 'bg-rose-100 text-rose-800 border-rose-200', icon: XCircle },
    completed: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle },
    'no-show': { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: AlertCircle }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1.5 rounded-full text-xs font-medium border ${config.color}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const priorityConfig: Record<Booking['priority'], { color: string }> = {
    normal: { color: 'bg-gray-100 text-gray-800 border-gray-200' },
    high: { color: 'bg-orange-100 text-orange-800 border-orange-200' },
    urgent: { color: 'bg-red-100 text-red-800 border-red-200' }
  };

  const config = priorityConfig[priority];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1.5 rounded-full text-xs font-medium border ${config.color}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};