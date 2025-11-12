export interface Customer {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    address?: string;
    notes?: string;
    avatar?: string;
    loyaltyTier?: 'bronze' | 'silver' | 'gold' | 'platinum';
    totalBookings?: number;
    totalSpent?: number;
    lastVisit?: Date;
    preferences?: string[];
  }
  
  export interface Note {
    id: string;
    bookingId: string;
    customerId: string;
    content: string;
    createdAt: Date;
    createdBy: string;
    isInternal: boolean;
    priority: 'low' | 'medium' | 'high';
    tags?: string[];
  }
  
  export interface Booking {
    id: string;
    customerId: string;
    customer: Customer;
    date: Date;
    startTime: string;
    endTime: string;
    duration: number;
    people: number;
    serviceType: string;
    occasion?: string;
    specialRequests?: string;
    location?: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
    priority: 'normal' | 'high' | 'urgent';
    createdAt: Date;
    updatedAt: Date;
    price?: number;
    deposit?: number;
    staffAssigned?: string;
    notes?: string;
    notesCount?: number;
    rating?: number;
    feedback?: string;
    source?: 'website' | 'phone' | 'walk-in' | 'referral' | 'social';
    tags?: string[];
  }
  
  export interface BookingFormData {
    customer: {
      fullName: string;
      email: string;
      phone: string;
      company: string;
      address: string;
      notes: string;
    };
    booking: {
      date: Date;
      startTime: string;
      duration: number;
      people: number;
      serviceType: string;
      occasion: string;
      specialRequests: string;
      location: string;
      status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
      priority: 'normal' | 'high' | 'urgent';
      price: number;
      deposit: number;
      staffAssigned: string;
      notes: string;
      source: 'website' | 'phone' | 'walk-in' | 'referral' | 'social';
      tags: string[];
    };
  }
  
  export type CalendarView = 'month' | 'week' | 'day';
  export type MainView = 'table' | 'calendar';
  export type SortField = 'date' | 'customer' | 'status' | 'service' | 'priority';
  export type SortDirection = 'asc' | 'desc';