/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import  { useState, useEffect, useCallback, Suspense } from 'react';
import { Header } from './components/Header';
import { ViewToggle } from './components/ViewToggle';
import { Filters } from './components/Filters';
import { BookingTable } from './components/BookingTable';
import { CalendarViewComponent } from './components/CalendarView';
import { DayBookingsDrawer } from './components/DayBookingsDrawer';
import { BookingDetailsDrawer } from './components/BookingDetailsDrawer';
import { BookingFormDrawer } from './components/BookingFormDrawer';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { PageLoader, HeaderSkeleton, ViewToggleSkeleton, FilterSkeleton, TableRowSkeleton } from './components/skeletons';
import { Booking, Customer, BookingFormData, MainView, CalendarView, SortField, SortDirection } from './types';
import { generateMinimalBookings, mockCustomers } from './mockData';
import { calculateEndTime } from './utils';

function BookingCRMContent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [isFormDrawerOpen, setIsFormDrawerOpen] = useState(false);
  const [isDayDrawerOpen, setIsDayDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDayBookings, setSelectedDayBookings] = useState<Booking[]>([]);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [calendarView, setCalendarView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mainView, setMainView] = useState<MainView>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const itemsPerPage = 10;

  // Fix for unnecessary re-render when getFilteredBookings dependency changes due to re-creation
  const getFilteredBookings = useCallback(() => {
    let filtered = bookings.filter(booking => {
      const matchesSearch =
        booking.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customer.phone.includes(searchTerm);

      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchesService = serviceFilter === 'all' || booking.serviceType === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });

    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'date':
          aValue = a.date.getTime();
          bValue = b.date.getTime();
          break;
        case 'customer':
          aValue = a.customer.fullName.toLowerCase();
          bValue = b.customer.fullName.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'service':
          aValue = a.serviceType.toLowerCase();
          bValue = b.serviceType.toLowerCase();
          break;
        case 'priority':
          {
            const priorityOrder = { 'urgent': 3, 'high': 2, 'normal': 1 };
            aValue = priorityOrder[a.priority] || 0;
            bValue = priorityOrder[b.priority] || 0;
          }
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [bookings, searchTerm, statusFilter, serviceFilter, sortField, sortDirection]);

  // Track the result of getFilteredBookings to avoid stale data for calculating totalPages
  useEffect(() => {
    setTotalPages(Math.ceil(getFilteredBookings().length / itemsPerPage) || 1);
    // If current page becomes out of range after the bookings/filters change, set it to the last valid page
    setCurrentPage(page => {
      const pageCount = Math.ceil(getFilteredBookings().length / itemsPerPage) || 1;
      return Math.min(page, pageCount);
    });
  }, [bookings, searchTerm, statusFilter, serviceFilter, sortField, sortDirection, itemsPerPage, getFilteredBookings]);

  useEffect(() => {
    const generatedBookings = generateMinimalBookings();

    const timer = setTimeout(() => {
      setBookings(generatedBookings);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getPaginatedBookings = useCallback(() => {
    const filtered = getFilteredBookings();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [getFilteredBookings, currentPage, itemsPerPage]);

  const handleViewBooking = useCallback((booking: Booking) => {
    setEditingBooking(booking);
    setDrawerLoading(true);
    setIsDetailsDrawerOpen(true);

    setTimeout(() => {
      setDrawerLoading(false);
    }, 500);
  }, []);

  const handleEditBooking = useCallback((booking: Booking) => {
    setEditingBooking(booking);
    setIsDetailsDrawerOpen(false);
    setIsFormDrawerOpen(true);
  }, []);

  const handleDeleteClick = useCallback((bookingId: string) => {
    setBookingToDelete(bookingId);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (bookingToDelete) {
      setBookings(prev => prev.filter(b => b.id !== bookingToDelete));
      setIsDeleteModalOpen(false);
      setIsDetailsDrawerOpen(false);
      setIsDayDrawerOpen(false);
      setBookingToDelete(null);
    }
  }, [bookingToDelete]);

  const handleNewBooking = useCallback(() => {
    setEditingBooking(null);
    setIsFormDrawerOpen(true);
  }, []);

  const handleSaveBooking = useCallback((formData: BookingFormData) => {
    setIsSaving(true);

    setTimeout(() => {
      if (editingBooking) {
        setBookings(prev =>
          prev.map(booking =>
            booking.id === editingBooking.id
              ? {
                  ...booking,
                  customer: {
                    ...booking.customer,
                    ...formData.customer,
                  },
                  date: formData.booking.date,
                  startTime: formData.booking.startTime,
                  endTime: calculateEndTime(formData.booking.startTime, formData.booking.duration),
                  duration: formData.booking.duration,
                  people: formData.booking.people,
                  serviceType: formData.booking.serviceType,
                  occasion: formData.booking.occasion,
                  specialRequests: formData.booking.specialRequests,
                  location: formData.booking.location,
                  status: formData.booking.status,
                  priority: formData.booking.priority,
                  price: formData.booking.price,
                  deposit: formData.booking.deposit,
                  staffAssigned: formData.booking.staffAssigned,
                  notes: formData.booking.notes,
                  source: formData.booking.source,
                  tags: formData.booking.tags,
                  updatedAt: new Date(),
                }
              : booking
          )
        );
      } else {
        const newCustomer: Customer = {
          id: `customer-${Date.now()}`,
          ...formData.customer,
        };

        const newBooking: Booking = {
          id: `booking-${Date.now()}`,
          customerId: newCustomer.id,
          customer: newCustomer,
          date: formData.booking.date,
          startTime: formData.booking.startTime,
          endTime: calculateEndTime(formData.booking.startTime, formData.booking.duration),
          duration: formData.booking.duration,
          people: formData.booking.people,
          serviceType: formData.booking.serviceType,
          occasion: formData.booking.occasion || '',
          specialRequests: formData.booking.specialRequests || '',
          location: formData.booking.location || '',
          status: formData.booking.status,
          priority: formData.booking.priority,
          price: formData.booking.price || 0,
          deposit: formData.booking.deposit || 0,
          staffAssigned: formData.booking.staffAssigned || '',
          notes: formData.booking.notes || '',
          source: formData.booking.source || 'website',
          tags: formData.booking.tags || [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setCustomers(prev => [...prev, newCustomer]);
        setBookings(prev => [...prev, newBooking]);
      }

      setIsSaving(false);
      setIsFormDrawerOpen(false);
      setEditingBooking(null);
    }, 1000);
  }, [editingBooking]);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      const newBookings = generateMinimalBookings();
      setBookings(newBookings);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSortChange = useCallback(
    (field: SortField, direction: SortDirection) => {
      setSortField(field);
      setSortDirection(direction);
      setCurrentPage(1);
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleDayClick = useCallback((date: Date, dayBookings: Booking[]) => {
    setSelectedDate(date);
    setSelectedDayBookings(dayBookings);
    setDrawerLoading(true);
    setIsDayDrawerOpen(true);

    setTimeout(() => {
      setDrawerLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <HeaderSkeleton />
          <ViewToggleSkeleton />
          <FilterSkeleton />
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Header
          onNewBooking={handleNewBooking}
          isLoading={isLoading}
          onRefresh={handleRefresh}
        />

        <ViewToggle mainView={mainView} setMainView={setMainView} />

        <div className="flex-1 overflow-y-auto">
          {mainView === 'table' ? (
            <>
              <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                serviceFilter={serviceFilter}
                setServiceFilter={setServiceFilter}
                sortField={sortField}
                sortDirection={sortDirection}
                onSortChange={handleSortChange}
              />
              <BookingTable
                bookings={getPaginatedBookings()}
                onView={handleViewBooking}
                onDelete={handleDeleteClick}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </>
          ) : (
            <CalendarViewComponent
              bookings={getFilteredBookings()}
              onBookingClick={handleViewBooking}
              onDayClick={handleDayClick}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              view={calendarView}
              onViewChange={setCalendarView}
              isLoading={isLoading}
            />
          )}
        </div>

        <DayBookingsDrawer
          isOpen={isDayDrawerOpen}
          onClose={() => setIsDayDrawerOpen(false)}
          date={selectedDate}
          bookings={selectedDayBookings}
          onBookingClick={handleViewBooking}
          onDelete={handleDeleteClick}
          isLoading={drawerLoading}
        />

        <BookingDetailsDrawer
          isOpen={isDetailsDrawerOpen}
          onClose={() => setIsDetailsDrawerOpen(false)}
          onEdit={handleEditBooking}
          onDelete={handleDeleteClick}
          booking={editingBooking || undefined}
          isLoading={drawerLoading}
        />

        <BookingFormDrawer
          isOpen={isFormDrawerOpen}
          onClose={() => setIsFormDrawerOpen(false)}
          onSave={handleSaveBooking}
          isLoading={isSaving}
          booking={editingBooking || undefined}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setBookingToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          booking={bookings.find(b => b.id === bookingToDelete)}
        />
      </div>
    </div>
  );
}

export default function UniversalBookingCRM() {
  return (
    <Suspense fallback={<PageLoader />}>
      <BookingCRMContent />
    </Suspense>
  );
}