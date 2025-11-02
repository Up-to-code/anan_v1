/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from 'react';
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
  isOpen: boolean;
}

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
    { name: 'David Kim', email: 'david.kim@digital.com', phone: '+1 (555) 567-8901' },
    { name: 'Lisa Thompson', email: 'lisa.t@globalcorp.com', phone: '+1 (555) 678-9012' },
    { name: 'Robert Brown', email: 'robert.b@futuretech.com', phone: '+1 (555) 789-0123' },
    { name: 'Maria Garcia', email: 'maria.g@techstart.com', phone: '+1 (555) 890-1234' },
    { name: 'James Wilson', email: 'james.w@cloudsys.com', phone: '+1 (555) 901-2345' },
  ];

  const locations = ['Conference Room A', 'Conference Room B', 'Board Room', 'Office 101', 'Virtual Meeting', 'Training Center', 'Executive Suite', 'Demo Room'];
  
  const bookings: Booking[] = [];
  
  for (let i = 0; i < count; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 365) - 180); // +/- 6 months
    
    const startHour = 8 + Math.floor(Math.random() * 9); // 8 AM to 5 PM
    const durationOptions = [30, 60, 90, 120];
    const duration = durationOptions[Math.floor(Math.random() * durationOptions.length)];
    
    const startTime = `${startHour.toString().padStart(2, '0')}:00`;
    const endHour = startHour + Math.floor(duration / 60);
    const endTime = `${endHour.toString().padStart(2, '0')}:${(duration % 60).toString().padStart(2, '0')}`;
    
    bookings.push({
      id: (i + 1).toString(),
      title: `${['Product Demo', 'Sales Consultation', 'Quarterly Review', 'Team Workshop', 'Client Onboarding', 'Project Kickoff', 'Strategy Session', 'Budget Planning', 'Technical Review', 'Performance Review'][Math.floor(Math.random() * 10)]} ${Math.floor(Math.random() * 1000)}`,
      customer,
      date: startDate.toISOString().split('T')[0],
      startTime,
      endTime,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: types[Math.floor(Math.random() * types.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      duration,
      color: colors[Math.floor(Math.random() * colors.length)],
      notes: Math.random() > 0.7 ? `Additional notes for meeting ${i + 1}` : undefined,
    });
  }
  
  return bookings;
};

const mockBookings = generateMockBookings(500); // Large dataset of 500 bookings

// ============================================
// COMPONENTS
// ============================================

// Booking Details Drawer Component
const BookingDetails = ({ booking, onClose, onUpdate, isOpen }: BookingDetailsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'appointment': return 'bg-purple-100 text-purple-800';
      case 'event': return 'bg-orange-100 text-orange-800';
      case 'consultation': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-2xl bg-white border-l border-slate-200 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 flex-shrink-0">
            <h2 className="text-2xl font-bold text-slate-900">Booking Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {booking && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-900">{booking.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(booking.type)}`}>
                      {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Time & Date</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CalendarIcon className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-700">
                            {new Date(booking.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-700">
                            {booking.startTime} - {booking.endTime} ({booking.duration} min)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Location</h4>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-700">{booking.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Customer Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-700">{booking.customer.name}</span>
                        </div>
                        <div className="text-sm text-slate-700 ml-7">{booking.customer.email}</div>
                        <div className="text-sm text-slate-700 ml-7">{booking.customer.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {booking.notes && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-2">Notes</h4>
                    <p className="text-slate-700 bg-slate-50 rounded-lg p-4">{booking.notes}</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 p-6 flex-shrink-0">
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Reschedule
              </button>
              <button className="flex-1 border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                Send Reminder
              </button>
              <button className="px-4 py-3 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Month View Component
const MonthView = ({ 
  bookings, 
  onBookingClick, 
  currentDate, 
  onDateChange,
  onViewChange 
}: { 
  bookings: Booking[]; 
  onBookingClick: (booking: Booking) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange: (view: 'month' | 'week' | 'year' | 'list', date?: Date) => void;
}) => {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    onDateChange(newDate);
  };

  const getBookingsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return bookings.filter(booking => booking.date === dateStr);
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onViewChange('week', clickedDate);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

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
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

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
                  <div
                    key={booking.id}
                    onClick={() => onBookingClick(booking)}
                    className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: booking.color, color: 'white' }}
                  >
                    <div className="font-medium truncate">{booking.startTime} {booking.title}</div>
                  </div>
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
  onViewChange 
}: { 
  bookings: Booking[]; 
  onBookingClick: (booking: Booking) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange: (view: 'month' | 'week' | 'year' | 'list', date?: Date) => void;
}) => {
  const getWeekDates = (date: Date) => {
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
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setDate(currentDate.getDate() + 7);
    }
    onDateChange(newDate);
  };

  const getBookingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => booking.date === dateStr);
  };

  const handleDayHeaderClick = (date: Date) => {
    onViewChange('month', date);
  };

  const weekDates = getWeekDates(currentDate);
  const weekRange = `${weekDates[0].toLocaleDateString()} - ${weekDates[6].toLocaleDateString()}`;

  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 7; // 7 AM to 8 PM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

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
              const isToday = date.toDateString() === new Date().toDateString();
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
                <div key={index} className="h-16 p-2 text-xs text-slate-500 text-right border-t border-slate-200">
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
                          <div
                            onClick={() => onBookingClick(booking)}
                            className="w-full h-full rounded p-2 text-xs cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ backgroundColor: booking.color, color: 'white' }}
                          >
                            <div className="font-medium truncate">{booking.title}</div>
                            <div className="truncate">{booking.startTime} - {booking.endTime}</div>
                          </div>
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
  onViewChange 
}: { 
  bookings: Booking[]; 
  onBookingClick: (booking: Booking) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange: (view: 'month' | 'week' | 'year' | 'list', date?: Date) => void;
}) => {
  const navigateYear = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setFullYear(currentDate.getFullYear() - 1);
    } else {
      newDate.setFullYear(currentDate.getFullYear() + 1);
    }
    onDateChange(newDate);
  };

  const getBookingsForMonth = (month: number) => {
    const year = currentDate.getFullYear();
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate.getFullYear() === year && bookingDate.getMonth() === month;
    });
  };

  const handleMonthClick = (month: number) => {
    const monthDate = new Date(currentDate.getFullYear(), month, 1);
    onViewChange('month', monthDate);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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
                  const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), monthIndex, day).toDateString();

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
                    <div
                      key={booking.id}
                      onClick={() => onBookingClick(booking)}
                      className="text-xs p-2 rounded cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: booking.color, color: 'white' }}
                    >
                      <div className="font-medium truncate">{booking.title}</div>
                      <div className="truncate">{new Date(booking.date).getDate()} {booking.startTime}</div>
                    </div>
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
const ListView = ({ bookings, onBookingClick }: { 
  bookings: Booking[]; 
  onBookingClick: (booking: Booking) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

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
            {bookings.map(booking => (
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
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center gap-1 ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
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
                    <button className="text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-50 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
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
    </div>
  );
};

// Header Component
const Header = ({ currentView, onViewChange }: { 
  currentView: 'month' | 'week' | 'year' | 'list';
  onViewChange: (view: 'month' | 'week' | 'year' | 'list') => void;
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
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
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
  const [bookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'year' | 'list'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  // Filter bookings based on search, status, and date
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    const matchesDate = dateFilter === 'all' || (() => {
      const today = new Date();
      const bookingDate = new Date(booking.date);
      
      switch (dateFilter) {
        case 'today':
          return bookingDate.toDateString() === today.toDateString();
        case 'tomorrow':
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          return bookingDate.toDateString() === tomorrow.toDateString();
        case 'this_week':
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
        case 'next_week':
          const nextWeekStart = new Date(today);
          nextWeekStart.setDate(today.getDate() + (7 - today.getDay()));
          const nextWeekEnd = new Date(nextWeekStart);
          nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
          return bookingDate >= nextWeekStart && bookingDate <= nextWeekEnd;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  };

  const handleUpdateBooking = (updatedBooking: Booking) => {
    // In a real app, you would update the booking in your state/API
    console.log('Updated booking:', updatedBooking);
  };

  const closeDrawer = () => {
    setShowBookingDetails(false);
    setSelectedBooking(null);
  };

  const handleViewChange = (view: 'month' | 'week' | 'year' | 'list', date?: Date) => {
    setCurrentView(view);
    if (date) {
      setCurrentDate(date);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'month':
        return (
          <MonthView 
            bookings={filteredBookings} 
            onBookingClick={handleBookingClick}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onViewChange={handleViewChange}
          />
        );
      case 'week':
        return (
          <WeekView 
            bookings={filteredBookings} 
            onBookingClick={handleBookingClick}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onViewChange={handleViewChange}
          />
        );
      case 'year':
        return (
          <YearView 
            bookings={filteredBookings} 
            onBookingClick={handleBookingClick}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onViewChange={handleViewChange}
          />
        );
      case 'list':
        return (
          <ListView 
            bookings={filteredBookings} 
            onBookingClick={handleBookingClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header currentView={currentView} onViewChange={setCurrentView} />
        
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

        {/* Booking Details Drawer */}
        <BookingDetails
          booking={selectedBooking}
          onClose={closeDrawer}
          onUpdate={handleUpdateBooking}
          isOpen={showBookingDetails}
        />
      </div>
    </div>
  );
}