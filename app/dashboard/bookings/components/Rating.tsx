import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating?: number;
}

export const Rating: React.FC<RatingProps> = ({ rating }) => {
  if (!rating) return null;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'text-amber-400 fill-current'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};