import React from "react";
import { ChevronRightCircle } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        {items.map((item, index) => (
          <li key={item.href}>
            <div className="flex items-center">
              {index > 0 && <ChevronRightCircle size={16} className="text-gray-400 mx-4" />}
              <a
                href={item.href}
                className={`text-sm font-medium ${
                  index === items.length - 1
                    ? 'text-gray-500 cursor-default'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-current={index === items.length - 1 ? "page" : undefined}
                tabIndex={index === items.length - 1 ? -1 : 0}
              >
                {item.label}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}