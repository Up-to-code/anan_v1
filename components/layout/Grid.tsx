// components/layout/Grid.tsx
interface GridProps {
    children: React.ReactNode;
    className?: string;
    cols?: 1 | 2 | 3 | 4 | 5 | 6;
    gap?: 'sm' | 'md' | 'lg';
  }
  
  export function Grid({ 
    children, 
    className = '',
    cols = 3,
    gap = 'md'
  }: GridProps) {
    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
    };
  
    const gaps = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8'
    };
  
    return (
      <div className={`grid ${gridCols[cols]} ${gaps[gap]} ${className}`}>
        {children}
      </div>
    );
  }