import React from 'react';
import { cn } from '@/lib/utils';

type ValueOf<T, K extends keyof T> = T[K];

interface Column<T> {
  key: keyof T;
  title: string;
  render?: (value: ValueOf<T, keyof T>, row: T) => React.ReactNode;
  width?: string;
}

interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  className?: string;
  emptyMessage?: string;
}

export function DataGrid<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  className,
  emptyMessage = "No data available"
}: DataGridProps<T>) {
  return (
    <div className={cn('overflow-x-auto bg-white rounded-lg border border-slate-200', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-3 text-left text-sm font-semibold text-slate-900"
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={String(row[keyField])} className="border-b border-slate-200 hover:bg-slate-50">
                {columns.map((column) => {
                  const value = row[column.key];
                  return (
                    <td key={String(column.key)} className="px-4 py-3 text-sm text-slate-600">
                      {column.render
                        ? column.render(value, row)
                        : value as React.ReactNode}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}