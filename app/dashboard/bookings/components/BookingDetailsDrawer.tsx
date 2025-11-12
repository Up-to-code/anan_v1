import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Building, UserCheck, MapPin, Tag, Edit, Trash2 } from 'lucide-react';
import { Booking } from '../types';
import { StatusBadge, PriorityBadge } from './Badges';
import { Rating } from './Rating';
import { useOutsideClick } from '../hooks';
import { formatCurrency } from '../utils';
import { BookingDetailsSkeleton } from './skeletons';

interface BookingDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
  booking?: Booking;
  isLoading?: boolean;
}

export const BookingDetailsDrawer: React.FC<BookingDetailsDrawerProps> = ({ 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete,
  booking,
  isLoading = false
}) => {
  const drawerRef = useOutsideClick(onClose);
  
  if (!booking && !isLoading) return null;

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
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 overflow-y-auto"
          >
            {isLoading ? (
              <BookingDetailsSkeleton />
            ) : booking ? (
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {booking.date.toLocaleDateString()} • {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    {/* Customer & Status */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-xl">
                            {booking.customer.fullName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.customer.fullName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusBadge status={booking.status} />
                            <PriorityBadge priority={booking.priority} />
                          </div>
                        </div>
                      </div>
                      {booking.rating && <Rating rating={booking.rating} />}
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.customer.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.customer.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {booking.customer.company && (
                          <div className="flex items-center gap-3">
                            <Building className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Company</p>
                              <p className="text-sm font-medium text-gray-900">
                                {booking.customer.company}
                              </p>
                            </div>
                          </div>
                        )}
                        {booking.customer.loyaltyTier && (
                          <div className="flex items-center gap-3">
                            <UserCheck className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Loyalty Tier</p>
                              <p className="text-sm font-medium text-gray-900 capitalize">
                                {booking.customer.loyaltyTier}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Booking Information</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500">Service Type</p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.serviceType}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Duration</p>
                              <p className="text-sm font-medium text-gray-900">
                                {booking.duration} minutes
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">People</p>
                              <p className="text-sm font-medium text-gray-900">
                                {booking.people}
                              </p>
                            </div>
                          </div>
                          {booking.occasion && (
                            <div>
                              <p className="text-xs text-gray-500">Occasion</p>
                              <p className="text-sm font-medium text-gray-900">
                                {booking.occasion}
                              </p>
                            </div>
                          )}
                          {booking.location && (
                            <div>
                              <p className="text-xs text-gray-500">Location</p>
                              <p className="text-sm font-medium text-gray-900">
                                {booking.location}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Financial Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Price</p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatCurrency(booking.price || 0)}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Deposit</p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatCurrency(booking.deposit || 0)}
                            </p>
                          </div>
                          {booking.staffAssigned && (
                            <div>
                              <p className="text-xs text-gray-500">Staff Assigned</p>
                              <p className="text-sm font-medium text-gray-900">
                                {booking.staffAssigned}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Special Requests & Notes */}
                    {booking.specialRequests && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Special Requests</h4>
                        <p className="text-sm text-gray-700 bg-amber-50 p-3 rounded-lg">
                          {booking.specialRequests}
                        </p>
                      </div>
                    )}

                    {booking.notes && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Internal Notes</h4>
                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                          {booking.notes}
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    {booking.tags && booking.tags.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {booking.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(booking)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Booking
                    </button>
                    <button
                      onClick={() => onDelete(booking.id)}
                      className="flex-1 px-4 py-2 bg-rose-100 text-rose-700 rounded-lg font-medium hover:bg-rose-200 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};