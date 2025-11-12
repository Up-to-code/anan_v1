import React from 'react';
import { Plus, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onNewBooking: () => void;
  isLoading: boolean;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onNewBooking, 
  isLoading, 
  onRefresh
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 p-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
      <p className="text-sm text-gray-600 mt-1">
        Manage all your bookings in one place
      </p>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-50 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh
      </button>
      <button
        onClick={onNewBooking}
        disabled={isLoading}
        className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-4 h-4" />
        New Booking
      </button>
    </div>
  </div>
);