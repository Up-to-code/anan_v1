import React from 'react';
import { Mail, Phone, Eye, Trash2, MapPin } from 'lucide-react';
import { Booking } from '../types';
import { StatusBadge } from './Badges';
import { Pagination } from './Pagination';
import { TableRowSkeleton } from './skeletons';

interface BookingTableProps {
  bookings: Booking[];
  onView: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export const BookingTable: React.FC<BookingTableProps> = ({ 
  bookings, 
  onView, 
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 mx-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Date & Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Service</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(5)].map((_, index) => (
                <TableRowSkeleton key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 mx-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Customer</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Contact</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Date & Time</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Service</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr 
                key={booking.id} 
                className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                onClick={() => onView(booking)}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {booking.customer.fullName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {booking.customer.fullName}
                      </div>
                      {booking.customer.company && (
                        <div className="text-xs text-gray-500">
                          {booking.customer.company}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{booking.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{booking.customer.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900">
                      {booking.date instanceof Date ? booking.date.toLocaleDateString() : ''}
                    </div>
                    <div className="text-sm text-gray-600">
                      {booking.startTime} - {booking.endTime}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-900">{booking.serviceType}</div>
                  {booking.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      {booking.location}
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(booking);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(booking.id);
                      }}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};