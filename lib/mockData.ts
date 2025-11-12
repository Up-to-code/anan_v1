import { Contact, CallBooking } from '@/types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    phone: '+15551234567',
    company: 'TechCorp Inc',
    position: 'CTO',
    status: 'active',
    lastContact: '2024-01-15',
    source: 'Referral',
    tags: ['VIP', 'Decision Maker'],
    avatar: '/avatars/sarah.jpg'
  },
  // ... (rest of mock contacts from original code)
];

export const mockCallBookings: CallBooking[] = [
  {
    id: '1',
    title: 'Product Demo',
    contactId: '1',
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah.j@company.com',
    contactPhone: '+15551234567',
    date: '2024-01-20',
    time: '10:00 AM',
    duration: '30 min',
    type: 'video',
    status: 'scheduled',
    notes: 'Discuss new features and pricing options',
    meetingLink: 'https://zoom.us/j/123456789',
    reminder: true,
    tags: ['Demo', 'High Priority']
  },
  // ... (rest of mock bookings from original code)
];

// Simulate API calls
export const fetchContacts = async (): Promise<Contact[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockContacts;
};

export const fetchCallBookings = async (): Promise<CallBooking[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockCallBookings;
};