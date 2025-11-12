import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, MapPin, Trash2 } from 'lucide-react';
import { Booking } from '../types';
import { StatusBadge } from './Badges';
import { useOutsideClick } from '../hooks';
import { DayBookingsSkeleton } from './skeletons';

interface DayBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
  isLoading?: boolean;
}

export const DayBookingsDrawer: React.FC<DayBookingsDrawerProps> = ({ 
  isOpen, 
  onClose, 
  date, 
  bookings, 
  onBookingClick,
  onDelete,
  isLoading = false
}) => {
  const drawerRef = useOutsideClick(onClose);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Bookings for {date.toLocaleDateString()}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {isLoading ? (
                  <DayBookingsSkeleton />
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No bookings for this date</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map(booking => (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-all duration-200"
                          onClick={() => onBookingClick(booking)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {booking.customer.fullName}
                            </h3>
                            <StatusBadge status={booking.status} />
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{booking.startTime} - {booking.endTime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{booking.people} people</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-900">
                            {booking.serviceType}
                            {booking.location && (
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <MapPin className="w-3 h-3" />
                                {booking.location}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onBookingClick(booking);
                              }}
                              className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
                            >
                              View Details
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(booking.id);
                              }}
                              className="px-3 py-1.5 bg-rose-100 text-rose-700 text-sm rounded-lg font-medium hover:bg-rose-200 transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};