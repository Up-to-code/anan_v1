export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    status: 'active' | 'inactive' | 'lead';
    lastContact: string;
    source: string;
    tags: string[];
    avatar?: string;
  }
  
  export interface CallBooking {
    id: string;
    title: string;
    contactId: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    date: string;
    time: string;
    duration: string;
    type: 'phone' | 'video' | 'in-person';
    status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
    notes: string;
    location?: string;
    meetingLink?: string;
    reminder: boolean;
    tags: string[];
  }
  
  export interface ContactDetailsProps {
    contact: Contact | null;
    onClose: () => void;
    onChat: (contact: Contact) => void;
    onEdit: (contact: Contact) => void;
    onDelete: (contact: Contact) => void;
    isOpen: boolean;
  }
  
  export interface ChatWindowProps {
    contact: Contact | null;
    onClose: () => void;
    isOpen: boolean;
  }
  
  export interface ContactFormProps {
    contact: Contact | null;
    onClose: () => void;
    onSave: (contact: Contact) => void;
    isOpen: boolean;
  }
  
  export interface CallBookingDetailsProps {
    booking: CallBooking | null;
    onClose: () => void;
    onEdit: (booking: CallBooking) => void;
    onDelete: (booking: CallBooking) => void;
    onReschedule: (booking: CallBooking) => void;
    onComplete: (booking: CallBooking) => void;
    onCancel: (booking: CallBooking) => void;
    isOpen: boolean;
  }
  
  export interface CallBookingFormProps {
    booking: CallBooking | null;
    contacts: Contact[];
    onClose: () => void;
    onSave: (booking: CallBooking) => void;
    isOpen: boolean;
  }