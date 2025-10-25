/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/DataGrid.tsx
import { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { Table } from './Table';

interface DataGridProps {
  title: string;
  columns: any[];
  data: any[];
  onAdd?: () => void;
  onExport?: () => void;
  onSearch?: (query: string) => void;
  loading?: boolean;
  addButtonLabel?: string;
}

export function DataGrid({
  title,
  columns,
  data,
  onAdd,
  onExport,
  onSearch,
  loading = false,
  addButtonLabel = "Add New"
}: DataGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">
            {data.length} {data.length === 1 ? 'item' : 'items'} total
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full sm:w-64"
          />
          {onExport && (
            <Button variant="secondary" icon={Download} onClick={onExport}>
              Export
            </Button>
          )}
          {onAdd && (
            <Button icon={Download} onClick={onAdd}>
              {addButtonLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} data={data} loading={loading} />
    </div>
  );
}