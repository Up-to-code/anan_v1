// components/layout/ActionHeader.tsx
import { ArrowLeft, LucideIcon, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import type { LucideIcon as LucideIconType } from 'lucide-react';

interface Action {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: LucideIconType;
}

interface ActionHeaderProps {
  title: string;
  description?: string;
  backLink?: string;
  backText?: string;
  primaryAction?: Action;
  secondaryActions?: Action[];
  moreActions?: Action[];
  children?: React.ReactNode;
}

export function ActionHeader({
  title,
  description,
  backLink,
  backText = "Back",
  primaryAction,
  secondaryActions = [],
  moreActions = [],
  children
}: ActionHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            {/* Back Link */}
            {backLink && (
              <nav className="flex mb-4" aria-label="Back">
                <a
                  href={backLink}
                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="flex-shrink-0 -ml-1 mr-1 h-4 w-4" />
                  {backText}
                </a>
              </nav>
            )}

            {/* Title and Description */}
            <div>
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                {title}
              </h1>
              {description && (
                <p className="mt-2 text-sm text-gray-500">
                  {description}
                </p>
              )}
            </div>

            {children}
          </div>

          {/* Actions */}
          <div className="mt-4 flex sm:mt-0 sm:ml-4 space-x-3">
            {/* Secondary Actions */}
            {secondaryActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant="secondary"
                icon={action.icon}
              >
                {action.label}
              </Button>
            ))}

            {/* Primary Action */}
            {primaryAction && (
              <Button
                onClick={primaryAction.onClick}
                variant={primaryAction.variant || 'primary'}
                icon={primaryAction.icon}
              >
                {primaryAction.label}
              </Button>
            )}

            {/* More Actions Dropdown */}
            {moreActions.length > 0 && (
              <Dropdown
                trigger={
                  <Button variant="secondary" icon={MoreVertical}>More</Button>
                }
                items={moreActions.map(action => ({
                  label: action.label,
                  icon: action.icon,
                  onClick: action.onClick,
                  variant: action.variant === "danger" ? "danger" : "default"
                }))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}