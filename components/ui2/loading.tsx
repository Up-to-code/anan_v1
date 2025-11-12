import React from 'react';

// A deterministic skeleton to avoid using Math.random in client components

export const TableSkeleton: React.FC = () => {
  // Pre-defined row/col widths for variety in skeletons. Same every render.
  // These arrays' indexes correspond to the respective skeleton row indexes.
  const ROWS = 10;
  const AVATAR_WIDTHS = ['w-10', 'w-10', 'w-10', 'w-10', 'w-10', 'w-10', 'w-10', 'w-10', 'w-10', 'w-10'];
  const NAME_WIDTHS = ['w-32', 'w-36', 'w-28', 'w-40', 'w-32', 'w-30', 'w-34', 'w-38', 'w-30', 'w-32'];
  const EMAIL_WIDTHS = ['w-48', 'w-44', 'w-46', 'w-50', 'w-48', 'w-47', 'w-44', 'w-43', 'w-48', 'w-46'];
  const EXTRA_WIDTHS = ['w-40', 'w-38', 'w-36', 'w-44', 'w-42', 'w-39', 'w-41', 'w-40', 'w-42', 'w-38'];
  const COMPANY_WIDTHS = ['w-32', 'w-24', 'w-36', 'w-30', 'w-32', 'w-28', 'w-34', 'w-31', 'w-29', 'w-32'];
  const POSITION_WIDTHS = ['w-36', 'w-34', 'w-32', 'w-26', 'w-28', 'w-30', 'w-32', 'w-32', 'w-34', 'w-36'];
  const LAST_CONTACT_WIDTHS = ['w-24', 'w-20', 'w-22', 'w-16', 'w-18', 'w-18', 'w-20', 'w-24', 'w-20', 'w-22'];
  const TAG1_WIDTHS = ['w-16', 'w-18', 'w-14', 'w-20', 'w-17', 'w-12', 'w-19', 'w-17', 'w-18', 'w-16'];
  const TAG2_WIDTHS = ['w-20', 'w-18', 'w-16', 'w-16', 'w-12', 'w-19', 'w-17', 'w-15', 'w-20', 'w-16'];

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Last Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {Array.from({ length: ROWS }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-10 bg-slate-200 rounded-full ${AVATAR_WIDTHS[index]}`}></div>
                    <div className="ml-4 space-y-2">
                      <div className={`h-4 bg-slate-200 rounded ${NAME_WIDTHS[index]}`}></div>
                      <div className={`h-3 bg-slate-200 rounded ${EMAIL_WIDTHS[index]}`}></div>
                      <div className={`h-3 bg-slate-200 rounded ${EXTRA_WIDTHS[index]}`}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`h-4 bg-slate-200 rounded ${COMPANY_WIDTHS[index]}`}></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`h-4 bg-slate-200 rounded ${POSITION_WIDTHS[index]}`}></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`h-4 bg-slate-200 rounded ${LAST_CONTACT_WIDTHS[index]}`}></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <div className={`h-5 bg-slate-200 rounded ${TAG1_WIDTHS[index]}`}></div>
                    <div className={`h-5 bg-slate-200 rounded ${TAG2_WIDTHS[index]}`}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const CallBookingTableSkeleton: React.FC = () => {
  // Pre-defined deterministic widths for visual interest in skeleton
  const ROWS = 5;
  const BOOKING1_WIDTHS = ['w-32', 'w-34', 'w-31', 'w-30', 'w-36'];
  const BOOKING2_WIDTHS = ['w-24', 'w-20', 'w-22', 'w-20', 'w-26'];
  const CONTACT1_WIDTHS = ['w-28', 'w-30', 'w-24', 'w-32', 'w-26'];
  const CONTACT2_WIDTHS = ['w-32', 'w-29', 'w-28', 'w-31', 'w-29'];
  const DT1_WIDTHS = ['w-20', 'w-18', 'w-16', 'w-20', 'w-22'];
  const DT2_WIDTHS = ['w-16', 'w-15', 'w-18', 'w-15', 'w-16'];
  const TAG1_WIDTHS = ['w-16', 'w-18', 'w-14', 'w-17', 'w-16'];
  const TAG2_WIDTHS = ['w-20', 'w-15', 'w-16', 'w-17', 'w-18'];

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Booking
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {Array.from({ length: ROWS }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-2">
                    <div className={`h-4 bg-slate-200 rounded ${BOOKING1_WIDTHS[index]}`}></div>
                    <div className={`h-3 bg-slate-200 rounded ${BOOKING2_WIDTHS[index]}`}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    <div className="ml-3 space-y-1">
                      <div className={`h-4 bg-slate-200 rounded ${CONTACT1_WIDTHS[index]}`}></div>
                      <div className={`h-3 bg-slate-200 rounded ${CONTACT2_WIDTHS[index]}`}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className={`h-4 bg-slate-200 rounded ${DT1_WIDTHS[index]}`}></div>
                    <div className={`h-3 bg-slate-200 rounded ${DT2_WIDTHS[index]}`}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <div className={`h-5 bg-slate-200 rounded ${TAG1_WIDTHS[index]}`}></div>
                    <div className={`h-5 bg-slate-200 rounded ${TAG2_WIDTHS[index]}`}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};