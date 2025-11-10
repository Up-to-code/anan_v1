"use client";
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search,
  Filter,
  Plus,
  Calendar as CalendarIcon,
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
  X,
  CalendarDays,
  Eye,
  Loader2,
  Edit,
  Trash2,
  Phone,
  Mail,
  Video,
  Save,
  Users,
  Building,
  Coffee,
  Home,
  Briefcase,
  Star,
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
    avatar?: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  type: 'meeting' | 'appointment' | 'event' | 'consultation';
  location: string;
  notes?: string;
  duration: number;
  priority?: 'low' | 'medium' | 'high';
  attendees?: number;
  isRecurring?: boolean;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
const TimeUtils = {
  getTimeSlots: () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  },
  getTimePosition: (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60 + minutes) / (24 * 60) * 100;
  },
  getDurationHeight: (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const duration = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
    return (duration / (24 * 60)) * 100;
  },
  formatTime: (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  },
};

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
  getMonthData: (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { year, month, daysInMonth, startingDayOfWeek };
  },
};

const BookingUtils = {
  getStatusConfig: (status: string) => {
    const configs = {
      confirmed: { 
        color: 'bg-green-100 text-green-800 border-green-200', 
        icon: CheckCircle,
      },
      pending: { 
        color: 'bg-amber-100 text-amber-800 border-amber-200', 
        icon: AlertCircle,
      },
      cancelled: { 
        color: 'bg-red-100 text-red-800 border-red-200', 
        icon: XCircle,
      },
      completed: { 
        color: 'bg-blue-100 text-blue-800 border-blue-200', 
        icon: CheckCircle,
      },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  },
  getTypeConfig: (type: string) => {
    const configs = {
      meeting: { 
        color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        icon: Users,
      },
      appointment: { 
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: CalendarDays,
      },
      event: { 
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: Star,
      },
      consultation: { 
        color: 'bg-teal-100 text-teal-800 border-teal-200',
        icon: Briefcase,
      },
    };
    return configs[type as keyof typeof configs] || configs.meeting;
  },
  getPriorityConfig: (priority?: string) => {
    const configs = {
      high: { color: 'bg-red-500', label: 'High' },
      medium: { color: 'bg-yellow-500', label: 'Medium' },
      low: { color: 'bg-green-500', label: 'Low' },
    };
    return configs[priority as keyof typeof configs] || configs.medium;
  },
  getLocationIcon: (location: string) => {
    if (location.toLowerCase().includes('virtual') || location.toLowerCase().includes('zoom')) {
      return Video;
    }
    if (location.toLowerCase().includes('office') || location.toLowerCase().includes('room')) {
      return Building;
    }
    if (location.toLowerCase().includes('coffee') || location.toLowerCase().includes('cafe')) {
      return Coffee;
    }
    if (location.toLowerCase().includes('home')) {
      return Home;
    }
    return MapPin;
  },
};

// ============================================
// MOCK DATA
// ============================================
const generateMockBookings = (count: number): Booking[] => {
  const types: Booking['type'][] = ['meeting', 'appointment', 'event', 'consultation'];
  const statuses: Booking['status'][] = ['confirmed', 'pending', 'cancelled', 'completed'];
  const priorities: Booking['priority'][] = ['low', 'medium', 'high'];
  
  const customers = [
    { name: 'Sarah Johnson', email: 'sarah.j@company.com', phone: '+1 (555) 123-4567', avatar: 'SJ' },
    { name: 'Michael Chen', email: 'michael.chen@startup.io', phone: '+1 (555) 987-6543', avatar: 'MC' },
    { name: 'Emily Davis', email: 'emily.davis@enterprise.com', phone: '+1 (555) 456-7890', avatar: 'ED' },
    { name: 'Alex Rodriguez', email: 'alex.r@techfirm.com', phone: '+1 (555) 234-5678', avatar: 'AR' },
    { name: 'Jessica Williams', email: 'j.williams@innovate.co', phone: '+1 (555) 345-6789', avatar: 'JW' },
  ];

  const locations = [
    'Conference Room A',
    'Virtual Meeting - Zoom',
    'Board Room',
    'Office 101',
    'Training Center',
    'Coffee Shop',
    'Client Office',
    'Home Office',
  ];
  
  const titles = [
    'Product Strategy Meeting',
    'Client Consultation',
    'Team Standup',
    'Design Review',
    'Sales Presentation',
    'Project Kickoff',
    'Quarterly Review',
    'Training Session',
    'One-on-One',
    'Board Meeting',
  ];
  
  const bookings: Booking[] = [];
  
  for (let i = 0; i < count; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 180) - 90);
    
    const startHour = 8 + Math.floor(Math.random() * 10);
    const durationOptions = [30, 60, 90, 120, 180];
    const duration = durationOptions[Math.floor(Math.random() * durationOptions.length)];
    
    const startTime = `${startHour.toString().padStart(2, '0')}:00`;
    const endHour = startHour + Math.floor(duration / 60);
    const endMin = duration % 60;
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;
    
    bookings.push({
      id: `booking-${i + 1}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      customer,
      date: DateUtils.formatDate(startDate),
      startTime,
      endTime,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: types[Math.floor(Math.random() * types.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      duration,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      attendees: Math.floor(Math.random() * 10) + 1,
      notes: Math.random() > 0.6 ? `Important notes for booking ${i + 1}.` : undefined,
      isRecurring: Math.random() > 0.7,
    });
  }
  
  return bookings;
};

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Loading Spinner
const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex items-center justify-center py-12">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-sm text-slate-500 font-medium">{message}</p>
    </div>
  </div>
);

// Status Badge
const StatusBadge = ({ status }: { status: string }) => {
  const config = BookingUtils.getStatusConfig(status);
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.color} border`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Type Badge
const TypeBadge = ({ type }: { type: string }) => {
  const config = BookingUtils.getTypeConfig(type);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium ${config.color} border`}>
      <Icon className="w-3 h-3" />
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </div>
  );
};

// Priority Indicator
const PriorityIndicator = ({ priority }: { priority?: string }) => {
  if (!priority) return null;
  const config = BookingUtils.getPriorityConfig(priority);
  
  return (
    <div className="flex items-center gap-1">
      <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
      <span className="text-xs text-slate-600">{config.label}</span>
    </div>
  );
};

// Booking Card Component
const BookingCard = ({ 
  booking, 
  onView, 
  onEdit, 
  onDelete,
}: { 
  booking: Booking;
  onView: (booking: Booking) => void;
  onEdit: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
}) => {
  const typeConfig = BookingUtils.getTypeConfig(booking.type);
  const LocationIcon = BookingUtils.getLocationIcon(booking.location);
  
  return (
    <div className="group relative bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex gap-1 p-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(booking);
            }}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            aria-label="View booking"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(booking);
            }}
            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
            aria-label="Edit booking"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(booking.id);
            }}
            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            aria-label="Delete booking"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0`}>
          <typeConfig.icon className="w-6 h-6 text-blue-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">{booking.title}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{booking.customer.name}</span>
                </div>
                {booking.attendees && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{booking.attendees}</span>
                  </div>
                )}
              </div>
            </div>
            <StatusBadge status={booking.status} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              <span>{TimeUtils.formatTime(booking.startTime)} - {TimeUtils.formatTime(booking.endTime)}</span>
              <span className="text-slate-400">({booking.duration} min)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <LocationIcon className="w-4 h-4" />
              <span className="truncate">{booking.location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <TypeBadge type={booking.type} />
            <PriorityIndicator priority={booking.priority} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// CALENDAR VIEW COMPONENTS
// ============================================

// Day View
const DayView = ({ 
  bookings, 
  onBookingClick, 
  currentDate, 
  onDateChange,
  isLoading 
}: { 
  bookings: Booking[]; 
  onBookingClick: (booking: Booking) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  isLoading: boolean;
}) => {
  const timeSlots = TimeUtils.getTimeSlots();
  const todayBookings = bookings.filter(booking => booking.date === DateUtils.formatDate(currentDate));
  
  const navigateDay = useCallback((direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'prev' ? -1 : 1));
    onDateChange(newDate);
  }, [currentDate, onDateChange]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <LoadingSpinner message="Loading day view..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      {/* Day Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </h2>
            <p className="text-blue-100">
              {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateDay('prev')}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              aria-label="Previous day"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDateChange(new Date())}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigateDay('next')}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              aria-label="Next day"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Day Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{todayBookings.length}</div>
            <div className="text-sm text-blue-100">Total Bookings</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {todayBookings.filter(b => b.status === 'confirmed').length}
            </div>
            <div className="text-sm text-blue-100">Confirmed</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {todayBookings.filter(b => b.priority === 'high').length}
            </div>
            <div className="text-sm text-blue-100">High Priority</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {todayBookings.reduce((acc, b) => acc + (b.attendees || 1), 0)}
            </div>
            <div className="text-sm text-blue-100">Attendees</div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex h-[600px]">
        {/* Time Labels */}
        <div className="w-20 border-r border-slate-200 bg-slate-50">
          {timeSlots.filter((_, i) => i % 2 === 0).map((time, index) => (
            <div
              key={time}
              className="h-12 flex items-center justify-center text-xs text-slate-500 font-medium border-b border-slate-100"
            >
              {TimeUtils.formatTime(time)}
            </div>
          ))}
        </div>

        {/* Bookings Timeline */}
        <div className="flex-1 relative bg-slate-50/50">
          {/* Time Grid Lines */}
          {timeSlots.filter((_, i) => i % 2 === 0).map((_, index) => (
            <div
              key={index}
              className="absolute w-full border-b border-slate-100"
              style={{ top: `${index * 50}px` }}
            />
          ))}

          {/* Current Time Indicator */}
          {DateUtils.isToday(currentDate) && (
            <div
              className="absolute w-full h-0.5 bg-red-500 z-10"
              style={{
                top: `${TimeUtils.getTimePosition(
                  `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`
                )}%`
              }}
            >
              <div className="absolute -left-2 -top-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
          )}

          {/* Bookings */}
          {todayBookings.map((booking) => {
            const top = TimeUtils.getTimePosition(booking.startTime);
            const height = TimeUtils.getDurationHeight(booking.startTime, booking.endTime);
            const typeConfig = BookingUtils.getTypeConfig(booking.type);
            
            return (
              <div
                key={booking.id}
                className="absolute left-2 right-2 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-lg bg-blue-600 text-white"
                style={{
                  top: `${top}%`,
                  height: `${height}%`,
                  minHeight: '40px'
                }}
                onClick={() => onBookingClick(booking)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onBookingClick(booking);
                  }
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <typeConfig.icon className="w-4 h-4" />
                  <span className="font-semibold text-sm truncate">{booking.title}</span>
                </div>
                <div className="flex items-center justify-between text-xs opacity-90">
                  <span>{booking.customer.name}</span>
                  <span>{booking.startTime} - {booking.endTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Week View
const WeekView = ({ 
  bookings, 
  onBookingClick, 
  currentDate, 
  onDateChange,
  isLoading 
}: { 
  bookings: Booking[]; 
  onBookingClick: (booking: Booking) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  isLoading: boolean;
}) => {
  const weekDates = DateUtils.getWeekDates(currentDate);
  const timeSlots = TimeUtils.getTimeSlots().filter((_, i) => i % 2 === 0);
  
  const navigateWeek = useCallback((direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'prev' ? -7 : 7));
    onDateChange(newDate);
  }, [currentDate, onDateChange]);

  const getBookingsForDayAndTime = useCallback((date: Date, time: string) => {
    const dateStr = DateUtils.formatDate(date);
    return bookings.filter(booking => {
      if (booking.date !== dateStr) return false;
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      return bookingStart <= time && bookingEnd > time;
    });
  }, [bookings]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <LoadingSpinner message="Loading week view..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      {/* Week Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Week View</h2>
            <p className="text-blue-100">
              {weekDates[0].toLocaleDateString()} - {weekDates[6].toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDateChange(new Date())}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              aria-label="Next week"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-8 gap-2">
          <div className="text-center text-sm font-medium text-blue-100">Time</div>
          {weekDates.map((date, index) => {
            const isToday = DateUtils.isToday(date);
            const dayBookings = bookings.filter(b => b.date === DateUtils.formatDate(date));
            
            return (
              <div
                key={index}
                className={`text-center p-3 rounded-lg ${
                  isToday ? 'bg-white/20' : 'bg-white/10'
                }`}
              >
                <div className="text-sm font-medium mb-1">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-xl font-bold ${isToday ? 'text-white' : 'text-blue-100'}`}>
                  {date.getDate()}
                </div>
                <div className="text-xs text-blue-200 mt-1">
                  {dayBookings.length} booking{dayBookings.length !== 1 ? 's' : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Week Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-8">
            {/* Time Column */}
            <div className="border-r border-slate-200 bg-slate-50">
              {timeSlots.map((time, index) => (
                <div
                  key={time}
                  className="h-16 flex items-center justify-center text-xs text-slate-500 font-medium border-b border-slate-100"
                >
                  {TimeUtils.formatTime(time)}
                </div>
              ))}
            </div>

            {/* Day Columns */}
            {weekDates.map((date, dayIndex) => {
              const isToday = DateUtils.isToday(date);
              
              return (
                <div key={dayIndex} className={`border-r border-slate-200 last:border-r-0 ${isToday ? 'bg-blue-50/30' : ''}`}>
                  {timeSlots.map((time, timeIndex) => {
                    const slotBookings = getBookingsForDayAndTime(date, time);
                    
                    return (
                      <div
                        key={timeIndex}
                        className="h-16 border-b border-slate-100 p-1 relative"
                      >
                        {slotBookings.map((booking) => {
                          const typeConfig = BookingUtils.getTypeConfig(booking.type);
                          
                          return (
                            <div
                              key={booking.id}
                              className="absolute inset-x-1 top-1 bottom-1 rounded-lg p-2 cursor-pointer transition-all duration-200 hover:shadow-md bg-blue-600 text-white"
                              onClick={() => onBookingClick(booking)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  onBookingClick(booking);
                                }
                              }}
                            >
                              <div className="flex items-center gap-2 text-xs">
                                <typeConfig.icon className="w-3 h-3" />
                                <span className="font-semibold truncate">{booking.title}</span>
                              </div>
                              <div className="text-xs opacity-90 truncate">{booking.customer.name}</div>
                            </div>
                          );
                        })}
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

// Month View
const MonthView = ({ 
  bookings, 
  onBookingClick, 
  currentDate, 
  onDateChange,
  isLoading 
}: { 
  bookings: Booking[]; 
  onBookingClick: (booking: Booking) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  isLoading: boolean;
}) => {
  const { year, month, daysInMonth, startingDayOfWeek } = DateUtils.getMonthData(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
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
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return bookings.filter(booking => booking.date === dateStr);
  }, [bookings, year, month]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <LoadingSpinner message="Loading month view..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      {/* Month Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-1">{monthName}</h2>
            <p className="text-blue-100">
              {bookings.length} total booking{bookings.length !== 1 ? 's' : ''} this month
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDateChange(new Date())}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Month Stats */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length },
            { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length },
            { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length },
            { label: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length },
            { label: 'High Priority', value: bookings.filter(b => b.priority === 'high').length },
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-slate-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayBookings = getBookingsForDay(day);
            const isToday = DateUtils.isToday(new Date(year, month, day));
            const hasHighPriority = dayBookings.some(b => b.priority === 'high');
            
            return (
              <div
                key={day}
                className={`aspect-square border rounded-lg p-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isToday 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
                onClick={() => onDateChange(new Date(year, month, day))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onDateChange(new Date(year, month, day));
                  }
                }}
              >
                <div className="flex flex-col h-full">
                  <div className={`text-sm font-bold mb-1 ${
                    isToday ? 'text-blue-600' : 'text-slate-900'
                  }`}>
                    {day}
                    {hasHighPriority && (
                      <div className="w-2 h-2 bg-red-500 rounded-full inline-block ml-1"></div>
                    )}
                  </div>
                  
                  {dayBookings.length > 0 && (
                    <div className="flex-1 space-y-1 overflow-hidden">
                      {dayBookings.slice(0, 3).map((booking, i) => {
                        const typeConfig = BookingUtils.getTypeConfig(booking.type);
                        
                        return (
                          <div
                            key={booking.id}
                            className="text-xs p-1 rounded truncate text-white bg-blue-600 flex items-center gap-1"
                          >
                            <typeConfig.icon className="w-3 h-3" />
                            <span>{booking.startTime} {booking.title}</span>
                          </div>
                        );
                      })}
                      {dayBookings.length > 3 && (
                        <div className="text-xs text-slate-500 font-medium">
                          +{dayBookings.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================
// LAYOUT COMPONENTS
// ============================================

// Header
const Header = ({ 
  currentView, 
  onViewChange,
  onNewBooking
}: { 
  currentView: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
  onNewBooking: () => void;
}) => (
  <div className="mb-8">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Booking Calendar</h1>
        <p className="text-slate-600">
          Manage your schedule with our calendar interface
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
          className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Booking
        </button>
      </div>
    </div>

    {/* View Toggle */}
    <div className="flex items-center justify-between">
      <div className="inline-flex bg-slate-100 rounded-lg p-1" role="tablist">
        {[
          { key: 'day', label: 'Day' },
          { key: 'week', label: 'Week' },
          { key: 'month', label: 'Month' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onViewChange(key as 'day' | 'week' | 'month')}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              currentView === key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            role="tab"
            aria-selected={currentView === key}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// Search and Filter
const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search bookings, customers, locations..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex gap-3">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-4 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
        
        <select
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value)}
          className="px-4 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="meeting">Meeting</option>
          <option value="appointment">Appointment</option>
          <option value="event">Event</option>
          <option value="consultation">Consultation</option>
        </select>
        
        <button className="px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>
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
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBookings(generateMockBookings(150));
      setIsLoading(false);
    };
    loadBookings();
  }, []);

  // Memoized filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchesType = typeFilter === 'all' || booking.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [bookings, searchTerm, statusFilter, typeFilter]);

  // Handlers
  const handleBookingClick = useCallback((booking: Booking) => {
    setSelectedBooking(booking);
    console.log('View booking:', booking);
  }, []);

  const handleNewBooking = useCallback(() => {
    console.log('Create new booking');
  }, []);

  // View rendering
  const renderView = useCallback(() => {
    const viewProps = {
      bookings: filteredBookings,
      onBookingClick: handleBookingClick,
      currentDate,
      onDateChange: setCurrentDate,
      isLoading,
    };

    switch (currentView) {
      case 'day':
        return <DayView {...viewProps} />;
      case 'week':
        return <WeekView {...viewProps} />;
      case 'month':
        return <MonthView {...viewProps} />;
      default:
        return null;
    }
  }, [currentView, filteredBookings, currentDate, isLoading, handleBookingClick]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onNewBooking={handleNewBooking}
        />
        
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
        />

        {/* Calendar View */}
        <div className="transition-all duration-300">
          {renderView()}
        </div>

        {/* Selected Booking Details */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-slate-900">{selectedBooking.title}</h2>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <BookingCard
                  booking={selectedBooking}
                  onView={handleBookingClick}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}