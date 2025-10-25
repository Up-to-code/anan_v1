/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/Table.tsx
import { ArrowUpDown, ChevronDown, LucideIcon, MoreHorizontal } from 'lucide-react';
import { Button } from './Button';
import { Dropdown } from './Dropdown';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: any) => void;
  actions?: Array<{
    label: string;
    onClick: (row: any) => void;
    icon?: React.ComponentType<any>;
    variant?: 'default' | 'danger';
  }>;
  loading?: boolean;
}

export function Table({ 
  columns, 
  data, 
  onSort, 
  onRowClick, 
  actions, 
  loading = false 
}: TableProps) {
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 border-b border-gray-200">
              {columns.map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {column.sortable && (
                    <button
                      onClick={() => onSort?.(column.key, 'asc')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ArrowUpDown size={14} />
                    </button>
                  )}
                </div>
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr 
              key={index}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Dropdown
                    trigger={
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    }
                    items={actions.map(action => ({
                      label: action.label,
                      // Fix: Ensure icon prop is a LucideIcon or undefined
                      icon: action.icon as LucideIcon | undefined,
                      onClick: () => action.onClick(row),
                      variant: action.variant
                    }))}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}