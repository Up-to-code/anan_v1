// components/ui/Avatar.tsx
interface AvatarProps {
    src?: string;
    alt: string;
    fallback: string;
    size?: 'sm' | 'md' | 'lg';
  }
  
  export function Avatar({ src, alt, fallback, size = 'md' }: AvatarProps) {
    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12'
    };
  
    return (
      <div className={`${sizes[size]} rounded-full bg-gray-300 flex items-center justify-center`}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="text-sm font-medium text-gray-600">{fallback}</span>
        )}
      </div>
    );
  }