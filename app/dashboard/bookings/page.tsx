/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Calendar as CalendarIcon,
  List,
  MapPin,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Grid,
  CalendarDays,
  Eye,
  Loader2,
  Edit,
  Trash2,
  Phone,
  Mail,
  Video,
  Copy,
  Share,
  Archive,
  MoreHorizontal,
  Save,
  Undo,
} from 'lucide-react';

// ============================================
// TYPES
// ============================================
interface Booking {
  id: string;
  title: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  type: 'meeting' | 'appointment' | 'event' | 'consultation';
  location: string;
  notes?: string;
  duration: number;
  color: string;
}

interface BookingDetailsProps {
  booking: Booking | null;
  onClose: () => void;
  onUpdate: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
  isOpen: boolean;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

interface BookingFormProps {
  booking: Booking | null;
  onClose: () => void;
  onSave: (booking: Booking) => void;
  isOpen: boolean;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
const DateUtils = {
  getDaysInMonth: (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
  getFirstDayOfMonth: (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
  getWeekDates: (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(weekDate);
    }
    return weekDates;
  },
  formatDate: (date: Date) => date.toISOString().split('T')[0],
  isToday: (date: Date) => date.toDateString() === new Date().toDateString(),
  isSameDay: (date1: Date, date2: Date) => date1.toDateString() === date2.toDateString(),
};

const BookingUtils = {
  getStatusConfig: (status: string) => {
    const configs = {
      confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle },
      completed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  },
  getTypeConfig: (type: string) => {
    const configs = {
      meeting: { color: 'bg-blue-100 text-blue-800' },
      appointment: { color: 'bg-purple-100 text-purple-800' },
      event: { color: 'bg-orange-100 text-orange-800' },
      consultation: { color: 'bg-green-100 text-green-800' },
    };
    return configs[type as keyof typeof configs] || configs.meeting;
  },
};

// ============================================
// MOCK DATA - LARGE DATASET
// ============================================
const generateMockBookings = (count: number): Booking[] => {
  const types: Booking['type'][] = ['meeting', 'appointment', 'event', 'consultation'];
  const statuses: Booking['status'][] = ['confirmed', 'pending', 'cancelled', 'completed'];
  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#14b8a6'];
  
  const customers = [
    { name: 'Sarah Johnson', email: 'sarah.j@company.com', phone: '+1 (555) 123-4567' },
    { name: 'Michael Chen', email: 'michael.chen@startup.io', phone: '+1 (555) 987-6543' },
    { name: 'Emily Davis', email: 'emily.davis@enterprise.com', phone: '+1 (555) 456-7890' },
    { name: 'Alex Rodriguez', email: 'alex.r@techfirm.com', phone: '+1 (555) 234-5678' },
    { name: 'Jessica Williams', email: 'j.williams@innovate.co', phone: '+1 (555) 345-6789' },
  ];

  const locations = ['Conference Room A', 'Conference Room B', 'Board Room', 'Office 101', 'Virtual Meeting', 'Training Center'];
  
  const bookings: Booking[] = [];
  
  for (let i = 0; i < count; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 180) - 90);
    
    const startHour = 8 + Math.floor(Math.random() * 9);
    const durationOptions = [30, 60, 90, 120];
    const duration = durationOptions[Math.floor(Math.random() * durationOptions.length)];
    
    const startTime = `${startHour.toString().padStart(2, '0')}:00`;
    const endHour = startHour + Math.floor(duration / 60);
    const endTime = `${endHour.toString().padStart(2, '0')}:${(duration % 60).toString().padStart(2, '0')}`;
    
    bookings.push({
      id: `booking-${i + 1}`,
      title: `${['Product Demo', 'Sales Consultation', 'Quarterly Review', 'Team Workshop', 'Client Onboarding'][Math.floor(Math.random() * 5)]} ${i + 1}`,
      customer,
      date: DateUtils.formatDate(startDate),
      startTime,
      endTime,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: types[Math.floor(Math.random() * types.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      duration,
      color: colors[Math.floor(Math.random() * colors.length)],
      notes: Math.random() > 0.7 ? `Important meeting notes for booking ${i + 1}. Please prepare all necessary materials.` : undefined,
    });
  }
  
  return bookings;
};

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Loading Spinner Component
const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex items-center justify-center py-12">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  </div>
);

// Blur Overlay Component
const BlurOverlay = ({ isVisible, opacity = 30 }: { isVisible: boolean; opacity?: number }) => (
  <div 
    className={`fixed inset-0 bg-white backdrop-blur-sm transition-opacity duration-300 z-30 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    style={{ opacity: opacity / 100 }}
  />
);

// Action Dropdown Component
const ActionDropdown = ({ 
  booking, 
  onEdit, 
  onDelete, 
  onView 
}: { 
  booking: Booking;
  onEdit: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
  onView: (booking: Booking) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Eye, label: 'View Details', action: () => onView(booking), color: 'text-blue-600' },
    { icon: Edit, label: 'Edit Booking', action: () => onEdit(booking), color: 'text-green-600' },
    { icon: Copy, label: 'Duplicate', action: () => console.log('Duplicate', booking.id), color: 'text-purple-600' },
    { icon: Share, label: 'Share', action: () => console.log('Share', booking.id), color: 'text-orange-600' },
    { icon: Archive, label: 'Archive', action: () => console.log('Archive', booking.id), color: 'text-slate-600' },
    { icon: Trash2, label: 'Delete', action: () => onDelete(booking.id), color: 'text-red-600' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-slate-100 rounded transition-colors"
      >
        <MoreHorizontal className="w-4 h-4 text-slate-500" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.action();
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${action.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const config = BookingUtils.getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${config.color}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Type Badge Component
const TypeBadge = ({ type }: { type: string }) => {
  const config = BookingUtils.getTypeConfig(type);

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

// Pagination Component
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalItems,
  itemsPerPage
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-slate-600">
        Showing {startItem}-{endItem} of {totalItems} bookings
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-slate-300 rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = index + 1;
          } else if (currentPage <= 3) {
            pageNum = index + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + index;
          } else {
            pageNum = currentPage - 2 + index;
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                currentPage === pageNum
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-slate-300 rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Booking Card Component
const BookingCard = ({ 
  booking, 
  onView, 
  onEdit, 
  onDelete,
  compact = false 
}: { 
  booking: Booking;
  onView: (booking: Booking) => void;
  onEdit: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
  compact?: boolean;
}) => {
  if (compact) {
    return (
      <div
        onClick={() => onView(booking)}
        className="text-xs p-2 rounded cursor-pointer hover:opacity-80 transition-all border-l-4"
        style={{ 
          backgroundColor: booking.color, 
          color: 'white',
          borderLeftColor: booking.color
        }}
      >
        <div className="font-medium truncate">{booking.startTime} {booking.title}</div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 truncate">{booking.title}</h4>
          <p className="text-sm text-slate-600">{booking.customer.name}</p>
        </div>
        <ActionDropdown
          booking={booking}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-slate-600">
          <Clock className="w-4 h-4" />
          <span>{booking.startTime} - {booking.endTime}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{booking.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <StatusBadge status={booking.status} />
        <TypeBadge type={booking.type} />
      </div>
    </div>
  );
};

// ============================================
// CALENDAR VIEW COMPONENTS
// ============================================

// Month View Component
const MonthView = ({ 
  bookings, 
  onBookingClick, 
  currentDate, 
  onDateChange,
  onViewChange,
  isLoading 
}: { 
  bookings: Booking[]; 
  onBookingClick: (booking: Booking) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange: (view: 'month' | 'week' | 'year' | 'list', date?: Date) => void;
  isLoading: boolean;
}) => {
  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    onDateChange(newDate);
  }, [currentDate, onDateChange]);

  const getBookingsForDay = useCallback((day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return bookings.filter(booking => booking.date === dateStr);
  }, [bookings, currentDate]);

  const handleDayClick = useCallback((day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onViewChange('week', clickedDate);
  }, [currentDate, onViewChange]);

  const daysInMonth = DateUtils.getDaysInMonth(currentDate);
  const firstDay = DateUtils.getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <LoadingSpinner message="Loading month view..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{monthName}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDateChange(new Date())}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-slate-500">
            {day}
          </div>
        ))}

        {/* Empty cells for days before the first day of month */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="p-3 min-h-[100px] border border-slate-100 bg-slate-50 rounded-lg" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayBookings = getBookingsForDay(day);
          const isToday = DateUtils.isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));

          return (
            <div
              key={day}
              className={`p-2 min-h-[100px] border rounded-lg cursor-pointer ${
                isToday 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:bg-slate-50'
              } transition-colors`}
              onClick={() => handleDayClick(day)}
            >
              <div className={`text-sm font-medium mb-1 ${
                isToday ? 'text-blue-600' : 'text-slate-900'
              }`}>
                {day}
              </div>
              <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
                {dayBookings.slice(0, 2).map(booking => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onView={onBookingClick}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    compact
                  />
                ))}
                {dayBookings.length > 2 && (
                  <div className="text-xs text-slate-500 px-1">
                    +{dayBookings.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Week View Component
const WeekView = ({ 
  bookings, 
  onBookingClick, 
  currentDate, 
  onDateChange,
  onViewChange,
  isLoading 
}: { 
  bookings: Booking[]; 
  onBookingClick: (booking: Booking) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange: (view: 'month' | 'week' | 'year' | 'list', date?: Date) => void;
  isLoading: boolean;
}) => {
  const navigateWeek = useCallback((direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setDate(currentDate.getDate() + 7);
    }
    onDateChange(newDate);
  }, [currentDate, onDateChange]);

  const getBookingsForDate = useCallback((date: Date) => {
    const dateStr = DateUtils.formatDate(date);
    return bookings.filter(booking => booking.date === dateStr);
  }, [bookings]);

  const handleDayHeaderClick = useCallback((date: Date) => {
    onViewChange('month', date);
  }, [onViewChange]);

  const weekDates = DateUtils.getWeekDates(currentDate);
  const weekRange = `${weekDates[0].toLocaleDateString()} - ${weekDates[6].toLocaleDateString()}`;

  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 7; // 7 AM to 8 PM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <LoadingSpinner message="Loading week view..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      {/* Week Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{weekRange}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDateChange(new Date())}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Day Headers */}
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="p-3 text-sm font-medium text-slate-500">Time</div>
            {weekDates.map((date, index) => {
              const isToday = DateUtils.isToday(date);
              return (
                <div
                  key={index}
                  className={`p-3 text-center rounded-lg cursor-pointer ${
                    isToday ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50 hover:bg-slate-100'
                  } transition-colors`}
                  onClick={() => handleDayHeaderClick(date)}
                >
                  <div className="text-sm font-medium text-slate-900">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={`text-lg font-bold ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time Slots */}
          <div className="grid grid-cols-8 gap-1">
            {/* Time Column */}
            <div className="space-y-1">
              {timeSlots.map((time, index) => (
                <div 
                  key={index} 
                  className="h-16 p-2 text-xs text-slate-500 text-right border-t border-slate-200"
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Day Columns */}
            {weekDates.map((date, dayIndex) => {
              const dayBookings = getBookingsForDate(date);
              
              return (
                <div key={dayIndex} className="space-y-1 relative">
                  {timeSlots.map((time, timeIndex) => {
                    const booking = dayBookings.find(b => {
                      const bookingHour = parseInt(b.startTime.split(':')[0]);
                      const timeHour = parseInt(time.split(':')[0]);
                      return bookingHour === timeHour;
                    });

                    return (
                      <div
                        key={timeIndex}
                        className="h-16 p-1 border-t border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        {booking && (
                          <BookingCard
                            booking={booking}
                            onView={onBookingClick}
                            onEdit={() => {}}
                            onDelete={() => {}}
                            compact
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Year View Component
const YearView = ({ 
  bookings, 
  onBookingClick, 
  currentDate, 
  onDateChange,
  onViewChange,
  isLoading 
}: { 
  bookings: Booking[]; 
  onBookingClick: (booking: Booking) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange: (view: 'month' | 'week' | 'year' | 'list', date?: Date) => void;
  isLoading: boolean;
}) => {
  const navigateYear = useCallback((direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setFullYear(currentDate.getFullYear() - 1);
    } else {
      newDate.setFullYear(currentDate.getFullYear() + 1);
    }
    onDateChange(newDate);
  }, [currentDate, onDateChange]);

  const getBookingsForMonth = useCallback((month: number) => {
    const year = currentDate.getFullYear();
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate.getFullYear() === year && bookingDate.getMonth() === month;
    });
  }, [bookings, currentDate]);

  const handleMonthClick = useCallback((month: number) => {
    const monthDate = new Date(currentDate.getFullYear(), month, 1);
    onViewChange('month', monthDate);
  }, [currentDate, onViewChange]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <LoadingSpinner message="Loading year view..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      {/* Year Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{currentDate.getFullYear()}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateYear('prev')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDateChange(new Date())}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => navigateYear('next')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Year Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {months.map((month, monthIndex) => {
          const monthBookings = getBookingsForMonth(monthIndex);
          const monthDate = new Date(currentDate.getFullYear(), monthIndex, 1);
          
          return (
            <div 
              key={month} 
              className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => handleMonthClick(monthIndex)}
            >
              <h4 className="font-semibold text-slate-900 mb-3">{month}</h4>
              
              {/* Mini Calendar */}
              <div className="grid grid-cols-7 gap-1 text-xs mb-3">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                  <div key={day} className="text-center text-slate-500 font-medium">
                    {day}
                  </div>
                ))}
                
                {/* Month days */}
                {Array.from({ length: new Date(currentDate.getFullYear(), monthIndex + 1, 0).getDate() }).map((_, dayIndex) => {
                  const day = dayIndex + 1;
                  const dateStr = `${currentDate.getFullYear()}-${(monthIndex + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                  const dayBookings = bookings.filter(booking => booking.date === dateStr);
                  const isToday = DateUtils.isToday(new Date(currentDate.getFullYear(), monthIndex, day));

                  return (
                    <div
                      key={day}
                      className={`text-center p-1 rounded cursor-pointer ${
                        isToday 
                          ? 'bg-blue-600 text-white' 
                          : dayBookings.length > 0 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                            : 'text-slate-700 hover:bg-slate-200'
                      } transition-colors`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (dayBookings.length > 0) {
                          onBookingClick(dayBookings[0]);
                        }
                      }}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              {/* Booking Summary */}
              {monthBookings.length > 0 && (
                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <div className="text-sm font-medium text-slate-900">
                    {monthBookings.length} booking{monthBookings.length !== 1 ? 's' : ''}
                  </div>
                  {monthBookings.slice(0, 3).map(booking => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onView={onBookingClick}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      compact
                    />
                  ))}
                  {monthBookings.length > 3 && (
                    <div className="text-xs text-slate-500">
                      +{monthBookings.length - 3} more bookings
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// List View Component
const ListView = ({ 
  bookings, 
  onBookingClick,
  onEdit,
  onDelete,
  currentPage,
  onPageChange,
  isLoading 
}: { 
  bookings: Booking[]; 
  onBookingClick: (booking: Booking) => void;
  onEdit: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}) => {
  const itemsPerPage = 10;
  const totalItems = bookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <LoadingSpinner message="Loading bookings..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Booking
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {paginatedBookings.map(booking => (
              <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{booking.title}</div>
                    <div className="text-sm text-slate-500 capitalize">{booking.type}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{booking.customer.name}</div>
                    <div className="text-sm text-slate-500">{booking.customer.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-slate-900">
                      {new Date(booking.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-slate-500">
                      {booking.startTime} - {booking.endTime}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{booking.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onBookingClick(booking)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(booking)}
                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <ActionDropdown
                      booking={booking}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onView={onBookingClick}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarIcon className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No bookings found</h3>
          <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Create Booking
          </button>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="p-6 border-t border-slate-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
};

// ============================================
// FORM COMPONENTS
// ============================================

// Booking Form Component
const BookingForm = ({ booking, onClose, onSave, isOpen }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    customer: { name: '', email: '', phone: '' },
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    status: 'pending' as Booking['status'],
    type: 'meeting' as Booking['type'],
    location: '',
    notes: '',
    duration: 60,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (booking) {
      setFormData({
        title: booking.title,
        customer: { ...booking.customer },
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        status: booking.status,
        type: booking.type,
        location: booking.location,
        notes: booking.notes || '',
        duration: booking.duration,
      });
    } else {
      // Set default date to today
      setFormData(prev => ({
        ...prev,
        date: DateUtils.formatDate(new Date())
      }));
    }
  }, [booking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const savedBooking: Booking = {
      id: booking?.id || `booking-${Date.now()}`,
      ...formData,
      color: booking?.color || '#3b82f6',
    };

    onSave(savedBooking);
    setIsLoading(false);
  };

  return (
    <>
      <BlurOverlay isVisible={isOpen} opacity={30} />
      
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-2xl bg-white border-l border-slate-200 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 flex-shrink-0">
            <h2 className="text-2xl font-bold text-slate-900">
              {booking ? 'Edit Booking' : 'Create New Booking'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter booking title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Type *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Booking['type'] }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="meeting">Meeting</option>
                        <option value="appointment">Appointment</option>
                        <option value="event">Event</option>
                        <option value="consultation">Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Start Time *
                      </label>
                      <input
                        type="time"
                        required
                        value={formData.startTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        End Time *
                      </label>
                      <input
                        type="time"
                        required
                        value={formData.endTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter location"
                    />
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customer.name}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        customer: { ...prev.customer, name: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter customer name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.customer.email}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          customer: { ...prev.customer, email: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.customer.phone}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          customer: { ...prev.customer, phone: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Booking['status'] }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add any additional notes..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="border-t border-slate-200 p-6 flex-shrink-0">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    {booking ? 'Update Booking' : 'Create Booking'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Booking Details Component with Edit Mode
const BookingDetails = ({ 
  booking, 
  onClose, 
  onUpdate, 
  onDelete, 
  isOpen,
  isEditMode,
  onToggleEditMode
}: BookingDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Booking | null>(null);
  const [originalData, setOriginalData] = useState<Booking | null>(null);

  useEffect(() => {
    if (booking) {
      setFormData({ ...booking });
      setOriginalData({ ...booking });
    }
  }, [booking]);

  const handleAction = async (action: string) => {
    if (!booking) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    switch (action) {
      case 'confirm':
        onUpdate({ ...booking, status: 'confirmed' });
        break;
      case 'cancel':
        onUpdate({ ...booking, status: 'cancelled' });
        break;
      case 'complete':
        onUpdate({ ...booking, status: 'completed' });
        break;
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!formData) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onUpdate(formData);
    setIsLoading(false);
    onToggleEditMode();
  };

  const handleCancel = () => {
    if (originalData) {
      setFormData({ ...originalData });
    }
    onToggleEditMode();
  };

  const handleInputChange = (field: string, value: string | number) => {
    if (!formData) return;
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'customer') {
        setFormData({
          ...formData,
          customer: {
            ...formData.customer,
            [child]: value
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  return (
    <>
      <BlurOverlay isVisible={isOpen} opacity={30} />
      
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-2xl bg-white border-l border-slate-200 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 flex-shrink-0">
            <h2 className="text-2xl font-bold text-slate-900">Booking Details</h2>
            <div className="flex items-center gap-2">
              {booking && (
                <button
                  onClick={onToggleEditMode}
                  className={`p-2 rounded-lg transition-colors ${
                    isEditMode 
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                      : 'hover:bg-slate-100 text-slate-500'
                  }`}
                  title={isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
                >
                  {isEditMode ? <X className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {booking && formData && (
              <>
                <div className="flex items-center justify-between mb-6">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="text-xl font-semibold text-slate-900 bg-transparent border-b border-slate-300 focus:border-blue-500 focus:outline-none w-full"
                    />
                  ) : (
                    <h3 className="text-xl font-semibold text-slate-900">{booking.title}</h3>
                  )}
                  <div className="flex items-center gap-2">
                    {isEditMode ? (
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    ) : (
                      <StatusBadge status={booking.status} />
                    )}
                    {isEditMode ? (
                      <select
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="meeting">Meeting</option>
                        <option value="appointment">Appointment</option>
                        <option value="event">Event</option>
                        <option value="consultation">Consultation</option>
                      </select>
                    ) : (
                      <TypeBadge type={booking.type} />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Time & Date</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CalendarIcon className="w-4 h-4 text-slate-500" />
                          {isEditMode ? (
                            <input
                              type="date"
                              value={formData.date}
                              onChange={(e) => handleInputChange('date', e.target.value)}
                              className="text-slate-700 bg-transparent border-b border-slate-300 focus:border-blue-500 focus:outline-none"
                            />
                          ) : (
                            <span className="text-slate-700">
                              {new Date(booking.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-slate-500" />
                          {isEditMode ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="time"
                                value={formData.startTime}
                                onChange={(e) => handleInputChange('startTime', e.target.value)}
                                className="text-slate-700 bg-transparent border-b border-slate-300 focus:border-blue-500 focus:outline-none"
                              />
                              <span>-</span>
                              <input
                                type="time"
                                value={formData.endTime}
                                onChange={(e) => handleInputChange('endTime', e.target.value)}
                                className="text-slate-700 bg-transparent border-b border-slate-300 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                          ) : (
                            <span className="text-slate-700">
                              {booking.startTime} - {booking.endTime} ({booking.duration} min)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Location</h4>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        {isEditMode ? (
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="text-slate-700 bg-transparent border-b border-slate-300 focus:border-blue-500 focus:outline-none w-full"
                          />
                        ) : (
                          <span className="text-slate-700">{booking.location}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Customer Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-slate-500" />
                          {isEditMode ? (
                            <input
                              type="text"
                              value={formData.customer.name}
                              onChange={(e) => handleInputChange('customer.name', e.target.value)}
                              className="text-slate-700 bg-transparent border-b border-slate-300 focus:border-blue-500 focus:outline-none w-full"
                            />
                          ) : (
                            <span className="text-slate-700">{booking.customer.name}</span>
                          )}
                        </div>
                        {isEditMode ? (
                          <>
                            <div className="flex items-center gap-3 ml-7">
                              <Mail className="w-4 h-4 text-slate-500" />
                              <input
                                type="email"
                                value={formData.customer.email}
                                onChange={(e) => handleInputChange('customer.email', e.target.value)}
                                className="text-sm text-slate-700 bg-transparent border-b border-slate-300 focus:border-blue-500 focus:outline-none w-full"
                              />
                            </div>
                            <div className="flex items-center gap-3 ml-7">
                              <Phone className="w-4 h-4 text-slate-500" />
                              <input
                                type="tel"
                                value={formData.customer.phone}
                                onChange={(e) => handleInputChange('customer.phone', e.target.value)}
                                className="text-sm text-slate-700 bg-transparent border-b border-slate-300 focus:border-blue-500 focus:outline-none w-full"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-sm text-slate-700 ml-7">{booking.customer.email}</div>
                            <div className="text-sm text-slate-700 ml-7">{booking.customer.phone}</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Notes</h4>
                  {isEditMode ? (
                    <textarea
                      rows={4}
                      value={formData.notes || ''}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full text-slate-700 bg-slate-50 rounded-lg p-4 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add any additional notes..."
                    />
                  ) : (
                    <p className="text-slate-700 bg-slate-50 rounded-lg p-4">
                      {booking.notes || 'No notes added'}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 p-6 flex-shrink-0">
            {isEditMode ? (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1 border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Undo className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                {booking?.status === 'pending' && (
                  <button
                    onClick={() => handleAction('confirm')}
                    disabled={isLoading}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    Confirm
                  </button>
                )}
                
                {booking?.status === 'confirmed' && (
                  <button
                    onClick={() => handleAction('complete')}
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    Mark Complete
                  </button>
                )}

                {booking?.status !== 'cancelled' && (
                  <button
                    onClick={() => handleAction('cancel')}
                    disabled={isLoading}
                    className="flex-1 border border-red-300 text-red-700 py-3 px-4 rounded-lg font-medium hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                    Cancel
                  </button>
                )}

                <button
                  onClick={() => booking && onDelete(booking.id)}
                  disabled={isLoading}
                  className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================
// LAYOUT COMPONENTS
// ============================================

// Header Component
const Header = ({ 
  currentView, 
  onViewChange,
  onNewBooking,
  isEditMode,
  onToggleEditMode
}: { 
  currentView: 'month' | 'week' | 'year' | 'list';
  onViewChange: (view: 'month' | 'week' | 'year' | 'list') => void;
  onNewBooking: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}) => (
  <div className="flex flex-col gap-4 mb-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Bookings Calendar</h1>
        <p className="text-slate-600 mt-2">
          Manage your appointments, meetings, and events across different views
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
          <Upload className="w-4 h-4" />
          Import
        </button>
        <button className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
        <button 
          onClick={onNewBooking}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Booking
        </button>
      </div>
    </div>

    {/* View Toggle */}
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <button
          onClick={() => onViewChange('month')}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
            currentView === 'month'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          <CalendarIcon className="w-4 h-4" />
          Month
        </button>
        <button
          onClick={() => onViewChange('week')}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
            currentView === 'week'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          Week
        </button>
        <button
          onClick={() => onViewChange('year')}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
            currentView === 'year'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Grid className="w-4 h-4" />
          Year
        </button>
        <button
          onClick={() => onViewChange('list')}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
            currentView === 'list'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          <List className="w-4 h-4" />
          List
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleEditMode}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
            isEditMode
              ? 'bg-green-600 text-white'
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          {isEditMode ? (
            <>
              <Save className="w-4 h-4" />
              Exit Edit Mode
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              Edit Mode
            </>
          )}
        </button>
      </div>
    </div>
  </div>
);

// Search and Filter Component
const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
}) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-6">
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search bookings..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <div className="flex gap-3">
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">All Status</option>
        <option value="confirmed">Confirmed</option>
        <option value="pending">Pending</option>
        <option value="cancelled">Cancelled</option>
        <option value="completed">Completed</option>
      </select>
      <select
        value={dateFilter}
        onChange={(e) => onDateFilterChange(e.target.value)}
        className="px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">All Dates</option>
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="this_week">This Week</option>
        <option value="next_week">Next Week</option>
      </select>
      <button className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
        <Filter className="w-4 h-4" />
        More Filters
      </button>
    </div>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function BookingsCalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'year' | 'list'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [listPage, setListPage] = useState(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBookings(generateMockBookings(200));
      setIsLoading(false);
    };

    loadBookings();
  }, []);

  // Memoized filtered bookings for performance
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      
      const matchesDate = dateFilter === 'all' || (() => {
        const today = new Date();
        const bookingDate = new Date(booking.date);
        
        switch (dateFilter) {
          case 'today':
            return DateUtils.isToday(bookingDate);
          case 'tomorrow':
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            return DateUtils.isSameDay(bookingDate, tomorrow);
          case 'this_week':
            const weekDates = DateUtils.getWeekDates(today);
            return bookingDate >= weekDates[0] && bookingDate <= weekDates[6];
          case 'next_week':
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            const nextWeekDates = DateUtils.getWeekDates(nextWeek);
            return bookingDate >= nextWeekDates[0] && bookingDate <= nextWeekDates[6];
          default:
            return true;
        }
      })();

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [bookings, searchTerm, statusFilter, dateFilter]);

  // Handlers
  const handleBookingClick = useCallback((booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
    setIsEditMode(false);
  }, []);

  const handleEditBooking = useCallback((booking: Booking) => {
    setEditingBooking(booking);
    setIsDetailsOpen(false);
    setIsFormOpen(true);
  }, []);

  const handleDeleteBooking = useCallback((bookingId: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    setIsDetailsOpen(false);
  }, []);

  const handleUpdateBooking = useCallback((updatedBooking: Booking) => {
    setBookings(prev => prev.map(booking => 
      booking.id === updatedBooking.id ? updatedBooking : booking
    ));
    setIsFormOpen(false);
    setEditingBooking(null);
  }, []);

  const handleSaveBooking = useCallback((booking: Booking) => {
    if (editingBooking) {
      handleUpdateBooking(booking);
    } else {
      setBookings(prev => [...prev, booking]);
      setIsFormOpen(false);
    }
  }, [editingBooking, handleUpdateBooking]);

  const handleNewBooking = useCallback(() => {
    setEditingBooking(null);
    setIsFormOpen(true);
  }, []);

  const handleViewChange = useCallback((view: 'month' | 'week' | 'year' | 'list', date?: Date) => {
    setCurrentView(view);
    if (date) {
      setCurrentDate(date);
    }
    if (view === 'list') {
      setListPage(1);
    }
  }, []);

  const closeModals = useCallback(() => {
    setIsDetailsOpen(false);
    setIsFormOpen(false);
    setSelectedBooking(null);
    setEditingBooking(null);
    setIsEditMode(false);
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  // View rendering
  const renderView = useCallback(() => {
    const viewProps = {
      bookings: filteredBookings,
      onBookingClick: handleBookingClick,
      currentDate,
      onDateChange: setCurrentDate,
      onViewChange: handleViewChange,
      isLoading,
    };

    switch (currentView) {
      case 'month':
        return <MonthView {...viewProps} />;
      case 'week':
        return <WeekView {...viewProps} />;
      case 'year':
        return <YearView {...viewProps} />;
      case 'list':
        return (
          <ListView 
            {...viewProps}
            onEdit={handleEditBooking}
            onDelete={handleDeleteBooking}
            currentPage={listPage}
            onPageChange={setListPage}
          />
        );
      default:
        return null;
    }
  }, [currentView, filteredBookings, currentDate, isLoading, listPage, handleBookingClick, handleViewChange, handleEditBooking, handleDeleteBooking]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onNewBooking={handleNewBooking}
          isEditMode={isEditMode}
          onToggleEditMode={toggleEditMode}
        />
        
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
        />

        {/* Calendar View */}
        {renderView()}

        {/* Modals */}
        <BookingDetails
          booking={selectedBooking}
          onClose={closeModals}
          onUpdate={handleUpdateBooking}
          onDelete={handleDeleteBooking}
          isOpen={isDetailsOpen}
          isEditMode={isEditMode}
          onToggleEditMode={toggleEditMode}
        />

        <BookingForm
          booking={editingBooking}
          onClose={closeModals}
          onSave={handleSaveBooking}
          isOpen={isFormOpen}
        />
      </div>
    </div>
  );
}