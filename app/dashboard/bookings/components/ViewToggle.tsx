import React from 'react';
import { List, CalendarDays } from 'lucide-react';
import { MainView } from '../types';

interface ViewToggleProps {
  mainView: MainView;
  setMainView: (view: MainView) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ mainView, setMainView }) => (
  <div className="flex gap-1 mb-4 px-4">
    <button
      onClick={() => setMainView('table')}
      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
        mainView === 'table' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
      }`}
    >
      <List className="w-4 h-4" />
      Table View
    </button>
    <button
      onClick={() => setMainView('calendar')}
      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
        mainView === 'calendar' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
      }`}
    >
      <CalendarDays className="w-4 h-4" />
      Calendar View
    </button>
  </div>
);