/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Building,
  Calendar,
  User,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Save,
  Clock,
  Video,
  Check,
  XCircle,
} from 'lucide-react';

// ============================================
// TYPES
// ============================================
interface Contact {
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

interface CallBooking {
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

interface ContactDetailsProps {
  contact: Contact | null;
  onClose: () => void;
  onChat: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  isOpen: boolean;
}

interface ChatWindowProps {
  contact: Contact | null;
  onClose: () => void;
  isOpen: boolean;
}

interface ContactFormProps {
  contact: Contact | null;
  onClose: () => void;
  onSave: (contact: Contact) => void;
  isOpen: boolean;
}

interface CallBookingDetailsProps {
  booking: CallBooking | null;
  onClose: () => void;
  onEdit: (booking: CallBooking) => void;
  onDelete: (booking: CallBooking) => void;
  onReschedule: (booking: CallBooking) => void;
  onComplete: (booking: CallBooking) => void;
  onCancel: (booking: CallBooking) => void;
  isOpen: boolean;
}

interface CallBookingFormProps {
  booking: CallBooking | null;
  contacts: Contact[];
  onClose: () => void;
  onSave: (booking: CallBooking) => void;
  isOpen: boolean;
}

// ============================================
// MOCK DATA
// ============================================
const mockContacts: Contact[] = [
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
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@startup.io',
    phone: '+15559876543',
    company: 'StartupXYZ',
    position: 'Product Manager',
    status: 'lead',
    lastContact: '2024-01-14',
    source: 'Website',
    tags: ['Hot Lead'],
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@enterprise.com',
    phone: '+15554567890',
    company: 'Enterprise Solutions',
    position: 'Director of Sales',
    status: 'active',
    lastContact: '2024-01-13',
    source: 'Conference',
    tags: ['Key Account', 'Decision Maker'],
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    email: 'alex.r@techfirm.com',
    phone: '+15552345678',
    company: 'TechFirm LLC',
    position: 'CEO',
    status: 'inactive',
    lastContact: '2024-01-10',
    source: 'Referral',
    tags: ['Follow Up'],
  },
  {
    id: '5',
    name: 'Jessica Williams',
    email: 'j.williams@innovate.co',
    phone: '+15553456789',
    company: 'InnovateCo',
    position: 'Marketing Director',
    status: 'active',
    lastContact: '2024-01-12',
    source: 'LinkedIn',
    tags: ['Influencer'],
  },
  {
    id: '6',
    name: 'David Kim',
    email: 'david.kim@digital.com',
    phone: '+15555678901',
    company: 'Digital Ventures',
    position: 'Head of Engineering',
    status: 'lead',
    lastContact: '2024-01-11',
    source: 'Website',
    tags: ['Technical Lead'],
  },
  {
    id: '7',
    name: 'Lisa Thompson',
    email: 'lisa.t@globalcorp.com',
    phone: '+15556789012',
    company: 'GlobalCorp',
    position: 'VP of Operations',
    status: 'active',
    lastContact: '2024-01-09',
    source: 'Trade Show',
    tags: ['Strategic Partner'],
  },
  {
    id: '8',
    name: 'Robert Brown',
    email: 'robert.b@futuretech.com',
    phone: '+15557890123',
    company: 'FutureTech',
    position: 'Business Development',
    status: 'inactive',
    lastContact: '2024-01-08',
    source: 'Referral',
    tags: ['Cold Lead'],
  },
  {
    id: '9',
    name: 'Maria Garcia',
    email: 'maria.g@techstart.com',
    phone: '+15558901234',
    company: 'TechStart',
    position: 'Product Director',
    status: 'active',
    lastContact: '2024-01-07',
    source: 'Conference',
    tags: ['Early Adopter'],
  },
  {
    id: '10',
    name: 'James Wilson',
    email: 'james.w@cloudsys.com',
    phone: '+15559012345',
    company: 'Cloud Systems',
    position: 'IT Manager',
    status: 'lead',
    lastContact: '2024-01-06',
    source: 'Website',
    tags: ['Technical'],
  },
];

const mockCallBookings: CallBooking[] = [
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
  {
    id: '2',
    title: 'Follow-up Call',
    contactId: '2',
    contactName: 'Michael Chen',
    contactEmail: 'michael.chen@startup.io',
    contactPhone: '+15559876543',
    date: '2024-01-21',
    time: '2:00 PM',
    duration: '45 min',
    type: 'phone',
    status: 'scheduled',
    notes: 'Review implementation progress',
    reminder: true,
    tags: ['Follow-up']
  },
  {
    id: '3',
    title: 'Contract Discussion',
    contactId: '3',
    contactName: 'Emily Davis',
    contactEmail: 'emily.davis@enterprise.com',
    contactPhone: '+15554567890',
    date: '2024-01-18',
    time: '11:30 AM',
    duration: '1 hour',
    type: 'in-person',
    status: 'completed',
    notes: 'Finalize contract terms',
    location: 'Enterprise Solutions HQ',
    reminder: false,
    tags: ['Contract', 'Important']
  },
  {
    id: '4',
    title: 'Technical Support',
    contactId: '4',
    contactName: 'Alex Rodriguez',
    contactEmail: 'alex.r@techfirm.com',
    contactPhone: '+15552345678',
    date: '2024-01-19',
    time: '3:00 PM',
    duration: '30 min',
    type: 'video',
    status: 'cancelled',
    notes: 'Cancelled by client, reschedule needed',
    reminder: false,
    tags: ['Support']
  },
  {
    id: '5',
    title: 'Sales Presentation',
    contactId: '5',
    contactName: 'Jessica Williams',
    contactEmail: 'j.williams@innovate.co',
    contactPhone: '+15553456789',
    date: '2024-01-22',
    time: '9:00 AM',
    duration: '1 hour',
    type: 'video',
    status: 'scheduled',
    notes: 'Present product capabilities to decision makers',
    meetingLink: 'https://zoom.us/j/987654321',
    reminder: true,
    tags: ['Sales', 'Presentation']
  }
];

// ============================================
// UTILITIES
// ============================================
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Simulate API calls
const fetchContacts = async (): Promise<Contact[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockContacts;
};

const fetchCallBookings = async (): Promise<CallBooking[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockCallBookings;
};

// ============================================
// SKELETON LOADING COMPONENTS
// ============================================

const TableSkeleton = memo(() => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Last Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {[...Array(10)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                    <div className="ml-4 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-32"></div>
                      <div className="h-3 bg-slate-200 rounded w-48"></div>
                      <div className="h-3 bg-slate-200 rounded w-40"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-slate-200 rounded w-32"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-slate-200 rounded w-36"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <div className="h-5 bg-slate-200 rounded w-16"></div>
                    <div className="h-5 bg-slate-200 rounded w-20"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
TableSkeleton.displayName = 'TableSkeleton';

const CallBookingTableSkeleton = memo(() => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Booking
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-32"></div>
                    <div className="h-3 bg-slate-200 rounded w-24"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    <div className="ml-3 space-y-1">
                      <div className="h-4 bg-slate-200 rounded w-28"></div>
                      <div className="h-3 bg-slate-200 rounded w-32"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="h-4 bg-slate-200 rounded w-20"></div>
                    <div className="h-3 bg-slate-200 rounded w-16"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <div className="h-5 bg-slate-200 rounded w-16"></div>
                    <div className="h-5 bg-slate-200 rounded w-20"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                    <div className="h-8 w-8 bg-slate-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
CallBookingTableSkeleton.displayName = 'CallBookingTableSkeleton';

// ============================================
// CONTACT COMPONENTS
// ============================================

// Contact Form Component
const ContactForm = memo(({ contact, onClose, onSave, isOpen }: ContactFormProps) => {
  const [formData, setFormData] = useState<Contact>({
    id: contact?.id || Date.now().toString(),
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    company: contact?.company || '',
    position: contact?.position || '',
    status: contact?.status || 'lead',
    lastContact: contact?.lastContact || new Date().toISOString().split('T')[0],
    source: contact?.source || 'Manual',
    tags: contact?.tags || [],
    avatar: contact?.avatar || '',
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200/50 flex-shrink-0 backdrop-blur-sm bg-white/80">
                <h2 className="text-2xl font-bold text-slate-900">
                  {contact ? 'Edit Contact' : 'Add New Contact'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100/50 rounded-lg transition-colors backdrop-blur-sm"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+15551234567"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="lead">Lead</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Source */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Source
                    </label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Manual">Manual</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Conference">Conference</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Trade Show">Trade Show</option>
                    </select>
                  </div>

                  {/* Last Contact */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Contact
                    </label>
                    <input
                      type="date"
                      name="lastContact"
                      value={formData.lastContact}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag..."
                      className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </form>

              {/* Footer */}
              <div className="border-t border-slate-200/50 p-6 flex-shrink-0 backdrop-blur-sm bg-white/80">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {contact ? 'Update Contact' : 'Save Contact'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
ContactForm.displayName = 'ContactForm';

// Contact Details Drawer Component
const ContactDetails = memo(({ contact, onClose, onChat, onEdit, onDelete, isOpen }: ContactDetailsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'lead': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleWhatsAppClick = () => {
    if (contact?.phone) {
      const cleanPhone = contact.phone.replace(/[^\d+]/g, '');
      const message = encodeURIComponent('Hello! I\'m reaching out from your contact management system.');
      window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div 
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white/95 backdrop-blur-xl shadow-2xl z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200/50 flex-shrink-0 backdrop-blur-sm bg-white/80">
                <h2 className="text-2xl font-bold text-slate-900">Contact Details</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100/50 rounded-lg transition-colors backdrop-blur-sm"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 backdrop-blur-sm">
                {contact && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-100/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{contact.name}</h3>
                        <p className="text-slate-600">{contact.position} at {contact.company}</p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Contact Information</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                              <Mail className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-700">{contact.email}</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                              <Phone className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-700">{contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                              <Building className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-700">{contact.company}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Source</h4>
                          <p className="text-slate-700 inline-block px-3 py-1 bg-slate-100 rounded-lg">
                            {contact.source}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Last Contact</h4>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-700">
                              {new Date(contact.lastContact).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {contact.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="px-3 py-1 bg-blue-100/80 text-blue-800 rounded-full text-sm backdrop-blur-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with Actions */}
              <div className="border-t border-slate-200/50 p-6 flex-shrink-0 backdrop-blur-sm bg-white/80">
                <div className="space-y-3">
                  {/* Primary Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => contact && onChat(contact)}
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Start Chat
                    </button>
                    <button 
                      onClick={handleWhatsAppClick}
                      className="px-4 py-3 border border-green-300 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors"
                      title="Chat on WhatsApp"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => contact && window.open(`mailto:${contact.email}`, '_blank')}
                      className="px-4 py-3 border border-slate-300/50 text-slate-700 rounded-lg font-medium hover:bg-slate-50/50 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Secondary Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => contact && onEdit(contact)}
                      className="flex-1 px-4 py-3 border border-amber-300 text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Contact
                    </button>
                    <button
                      onClick={() => contact && onDelete(contact)}
                      className="flex-1 px-4 py-3 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
ContactDetails.displayName = 'ContactDetails';

// Chat Window Component
const ChatWindow = memo(({ contact, onClose, isOpen }: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: 'user' | 'contact'; time: Date }>>([
    {
      id: '1',
      text: 'Hello! Thanks for reaching out. How can I help you today?',
      sender: 'contact',
      time: new Date(Date.now() - 300000)
    }
  ]);

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      time: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message. I'll get back to you shortly with more information.",
        sender: 'contact',
        time: new Date()
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  }, [message]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white/95 backdrop-blur-xl shadow-2xl z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-slate-200/50 flex items-center justify-between flex-shrink-0 backdrop-blur-sm bg-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{contact?.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm text-slate-500">Online</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100/50 rounded-lg transition-colors backdrop-blur-sm"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 backdrop-blur-sm">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-blue-200' : 'text-slate-500'
                      }`}>
                        {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200/50 flex-shrink-0 backdrop-blur-sm bg-white/80">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-slate-300/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
ChatWindow.displayName = 'ChatWindow';

// Table Row Component
const TableRow = memo(({ 
  contact, 
  onView, 
  onChat, 
  onEmail 
}: {
  contact: Contact;
  onView: (contact: Contact) => void;
  onChat: (contact: Contact) => void;
  onEmail: (contact: Contact) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'lead': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (contact.phone) {
      const cleanPhone = contact.phone.replace(/[^\d+]/g, '');
      const message = encodeURIComponent('Hello! I\'m reaching out from your contact management system.');
      window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    }
  };

  return (
    <tr 
      className="border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
      onClick={() => onView(contact)}
    >
      {/* Contact Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-slate-900">{contact.name}</div>
            <div className="text-sm text-slate-500">{contact.email}</div>
            <div className="text-sm text-slate-500">{contact.phone}</div>
          </div>
        </div>
      </td>

      {/* Company Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-slate-900">{contact.company}</div>
      </td>

      {/* Position Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-slate-900">{contact.position}</div>
      </td>

      {/* Status Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contact.status)}`}>
          {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
        </span>
      </td>

      {/* Last Contact Column */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
        {new Date(contact.lastContact).toLocaleDateString()}
      </td>

      {/* Tags Column */}
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {contact.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
              {tag}
            </span>
          ))}
          {contact.tags.length > 2 && (
            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
              +{contact.tags.length - 2}
            </span>
          )}
        </div>
      </td>

      {/* Actions Column */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChat(contact);
            }}
            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
            title="Start Chat"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button 
            onClick={handleWhatsAppClick}
            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
            title="Chat on WhatsApp"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEmail(contact);
            }}
            className="text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-50 transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
});
TableRow.displayName = 'TableRow';

// ============================================
// CALL BOOKING COMPONENTS
// ============================================

// Call Booking Form Component
const CallBookingForm = memo(({ booking, contacts, onClose, onSave, isOpen }: CallBookingFormProps) => {
  const [formData, setFormData] = useState<CallBooking>({
    id: booking?.id || Date.now().toString(),
    title: booking?.title || '',
    contactId: booking?.contactId || '',
    contactName: booking?.contactName || '',
    contactEmail: booking?.contactEmail || '',
    contactPhone: booking?.contactPhone || '',
    date: booking?.date || new Date().toISOString().split('T')[0],
    time: booking?.time || '10:00 AM',
    duration: booking?.duration || '30 min',
    type: booking?.type || 'phone',
    status: booking?.status || 'scheduled',
    notes: booking?.notes || '',
    location: booking?.location || '',
    meetingLink: booking?.meetingLink || '',
    reminder: booking?.reminder || true,
    tags: booking?.tags || [],
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const contactId = e.target.value;
    const contact = contacts.find(c => c.id === contactId);
    
    if (contact) {
      setFormData(prev => ({
        ...prev,
        contactId,
        contactName: contact.name,
        contactEmail: contact.email,
        contactPhone: contact.phone
      }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200/50 flex-shrink-0 backdrop-blur-sm bg-white/80">
                <h2 className="text-2xl font-bold text-slate-900">
                  {booking ? 'Edit Booking' : 'Schedule New Booking'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100/50 rounded-lg transition-colors backdrop-blur-sm"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Contact */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Contact *
                    </label>
                    <select
                      name="contactId"
                      value={formData.contactId}
                      onChange={handleContactChange}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a contact</option>
                      {contacts.map((contact) => (
                        <option key={contact.id} value={contact.id}>
                          {contact.name} - {contact.company}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Time *
                    </label>
                    <input
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      placeholder="10:00 AM"
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Duration *
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="15 min">15 min</option>
                      <option value="30 min">30 min</option>
                      <option value="45 min">45 min</option>
                      <option value="1 hour">1 hour</option>
                      <option value="1.5 hours">1.5 hours</option>
                      <option value="2 hours">2 hours</option>
                    </select>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="phone">Phone Call</option>
                      <option value="video">Video Call</option>
                      <option value="in-person">In-Person Meeting</option>
                    </select>
                  </div>

                  {/* Meeting Link (conditional) */}
                  {formData.type === 'video' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Meeting Link
                      </label>
                      <input
                        type="text"
                        name="meetingLink"
                        value={formData.meetingLink}
                        onChange={handleInputChange}
                        placeholder="https://zoom.us/j/123456789"
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* Location (conditional) */}
                  {formData.type === 'in-person' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Office address, coffee shop, etc."
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="rescheduled">Rescheduled</option>
                    </select>
                  </div>

                  {/* Reminder */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="reminder"
                      name="reminder"
                      checked={formData.reminder}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <label htmlFor="reminder" className="ml-2 block text-sm text-slate-700">
                      Set reminder
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag..."
                      className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </form>

              {/* Footer */}
              <div className="border-t border-slate-200/50 p-6 flex-shrink-0 backdrop-blur-sm bg-white/80">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {booking ? 'Update Booking' : 'Schedule Booking'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
CallBookingForm.displayName = 'CallBookingForm';

// Call Booking Details Drawer Component
const CallBookingDetails = memo(({ 
  booking, 
  onClose, 
  onEdit, 
  onDelete, 
  onReschedule, 
  onComplete, 
  onCancel, 
  isOpen 
}: CallBookingDetailsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      default: return <Phone className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'phone': return 'Phone Call';
      case 'video': return 'Video Call';
      case 'in-person': return 'In-Person Meeting';
      default: return 'Call';
    }
  };

  const handleJoinCall = () => {
    if (booking?.meetingLink) {
      window.open(booking.meetingLink, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div 
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white/95 backdrop-blur-xl shadow-2xl z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200/50 flex-shrink-0 backdrop-blur-sm bg-white/80">
                <h2 className="text-2xl font-bold text-slate-900">Booking Details</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100/50 rounded-lg transition-colors backdrop-blur-sm"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 backdrop-blur-sm">
                {booking && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{booking.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <div className="flex items-center gap-1 text-slate-600">
                          {getTypeIcon(booking.type)}
                          <span className="text-sm">{getTypeLabel(booking.type)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Contact Information</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                              <User className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-700">{booking.contactName}</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                              <Mail className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-700">{booking.contactEmail}</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                              <Phone className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-700">{booking.contactPhone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Schedule</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                              <Calendar className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-700">
                                {new Date(booking.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                              <Clock className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-700">{booking.time} ({booking.duration})</span>
                            </div>
                            {booking.type === 'video' && booking.meetingLink && (
                              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                <Video className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-700 truncate">{booking.meetingLink}</span>
                              </div>
                            )}
                            {booking.type === 'in-person' && booking.location && (
                              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                <MapPin className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-700">{booking.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Notes</h4>
                        <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">{booking.notes}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {booking.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-blue-100/80 text-blue-800 rounded-full text-sm backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with Actions */}
              <div className="border-t border-slate-200/50 p-6 flex-shrink-0 backdrop-blur-sm bg-white/80">
                <div className="space-y-3">
                  {/* Primary Actions */}
                  {booking?.status === 'scheduled' && (
                    <div className="flex gap-3">
                      {booking.type === 'video' && booking.meetingLink && (
                        <button
                          onClick={handleJoinCall}
                          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <Video className="w-4 h-4" />
                          Join Call
                        </button>
                      )}
                      <button
                        onClick={() => booking && onComplete(booking)}
                        className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Mark Complete
                      </button>
                      <button
                        onClick={() => booking && onReschedule(booking)}
                        className="flex-1 px-4 py-3 border border-amber-300 text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Reschedule
                      </button>
                    </div>
                  )}
                  
                  {/* Secondary Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => booking && onEdit(booking)}
                      className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Booking
                    </button>
                    {booking?.status === 'scheduled' && (
                      <button
                        onClick={() => booking && onCancel(booking)}
                        className="flex-1 px-4 py-3 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => booking && onDelete(booking)}
                      className="flex-1 px-4 py-3 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
CallBookingDetails.displayName = 'CallBookingDetails';

// Call Booking Table Row Component
const CallBookingTableRow = memo(({ 
  booking, 
  onView, 
  onJoinCall 
}: {
  booking: CallBooking;
  onView: (booking: CallBooking) => void;
  onJoinCall: (booking: CallBooking) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      default: return <Phone className="w-4 h-4" />;
    }
  };

  const handleJoinCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoinCall(booking);
  };

  return (
    <tr 
      className="border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
      onClick={() => onView(booking)}
    >
      {/* Booking Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-slate-900">{booking.title}</div>
        <div className="text-sm text-slate-500">{booking.duration}</div>
      </td>

      {/* Contact Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-slate-900">{booking.contactName}</div>
            <div className="text-sm text-slate-500">{booking.contactEmail}</div>
          </div>
        </div>
      </td>

      {/* Date & Time Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-slate-900">{new Date(booking.date).toLocaleDateString()}</div>
        <div className="text-sm text-slate-500">{booking.time}</div>
      </td>

      {/* Type Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {getTypeIcon(booking.type)}
          <span className="text-sm text-slate-900">
            {booking.type === 'phone' ? 'Phone' : booking.type === 'video' ? 'Video' : 'In-Person'}
          </span>
        </div>
      </td>

      {/* Status Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </td>

      {/* Tags Column */}
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {booking.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
              {tag}
            </span>
          ))}
          {booking.tags.length > 2 && (
            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
              +{booking.tags.length - 2}
            </span>
          )}
        </div>
      </td>

      {/* Actions Column */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2">
          {booking.status === 'scheduled' && booking.type === 'video' && booking.meetingLink && (
            <button
              onClick={handleJoinCall}
              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
              title="Join Call"
            >
              <Video className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(booking);
            }}
            className="text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-50 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
});
CallBookingTableRow.displayName = 'CallBookingTableRow';

// ============================================
// MAIN COMPONENT
// ============================================
function ContactsPage() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'bookings'>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [bookings, setBookings] = useState<CallBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  
  // Contacts state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [sortField, setSortField] = useState<keyof Contact>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Bookings state
  const [bookingSearchTerm, setBookingSearchTerm] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('all');
  const [bookingTypeFilter, setBookingTypeFilter] = useState('all');
  const [bookingCurrentPage, setBookingCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<CallBooking | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSortField, setBookingSortField] = useState<keyof CallBooking>('date');
  const [bookingSortDirection, setBookingSortDirection] = useState<'asc' | 'desc'>('asc');

  const contactsPerPage = 10;
  const bookingsPerPage = 10;

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setLoadingBookings(true);
        
        const [contactsData, bookingsData] = await Promise.all([
          fetchContacts(),
          fetchCallBookings()
        ]);
        
        setContacts(contactsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
        setLoadingBookings(false);
      }
    };

    loadData();
  }, []);

  // Debounce search terms
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedBookingSearchTerm = useDebounce(bookingSearchTerm, 300);

  // Memoize filtered contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           contact.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           contact.company.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contacts, debouncedSearchTerm, statusFilter]);

  // Memoize sorted contacts
  const sortedContacts = useMemo(() => {
    return [...filteredContacts].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortField === 'lastContact') {
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);
        return sortDirection === 'asc' 
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }
      
      const aStr = String(aValue || '').toLowerCase();
      const bStr = String(bValue || '').toLowerCase();
      
      if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredContacts, sortField, sortDirection]);

  // Memoize paginated contacts
  const paginatedContacts = useMemo(() => {
    return sortedContacts.slice(
      (currentPage - 1) * contactsPerPage,
      currentPage * contactsPerPage
    );
  }, [sortedContacts, currentPage, contactsPerPage]);

  // Memoize filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = booking.title.toLowerCase().includes(debouncedBookingSearchTerm.toLowerCase()) ||
                           booking.contactName.toLowerCase().includes(debouncedBookingSearchTerm.toLowerCase()) ||
                           booking.contactEmail.toLowerCase().includes(debouncedBookingSearchTerm.toLowerCase());
      const matchesStatus = bookingStatusFilter === 'all' || booking.status === bookingStatusFilter;
      const matchesType = bookingTypeFilter === 'all' || booking.type === bookingTypeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [bookings, debouncedBookingSearchTerm, bookingStatusFilter, bookingTypeFilter]);

  // Memoize sorted bookings
  const sortedBookings = useMemo(() => {
    return [...filteredBookings].sort((a, b) => {
      const aValue = a[bookingSortField];
      const bValue = b[bookingSortField];
      
      if (bookingSortField === 'date') {
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);
        return bookingSortDirection === 'asc' 
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }
      
      const aStr = String(aValue || '').toLowerCase();
      const bStr = String(bValue || '').toLowerCase();
      
      if (aStr < bStr) return bookingSortDirection === 'asc' ? -1 : 1;
      if (aStr > bStr) return bookingSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredBookings, bookingSortField, bookingSortDirection]);

  // Memoize paginated bookings
  const paginatedBookings = useMemo(() => {
    return sortedBookings.slice(
      (bookingCurrentPage - 1) * bookingsPerPage,
      bookingCurrentPage * bookingsPerPage
    );
  }, [sortedBookings, bookingCurrentPage, bookingsPerPage]);

  // Memoize total pages
  const totalPages = useMemo(() => {
    return Math.ceil(sortedContacts.length / contactsPerPage);
  }, [sortedContacts.length, contactsPerPage]);

  const bookingTotalPages = useMemo(() => {
    return Math.ceil(sortedBookings.length / bookingsPerPage);
  }, [sortedBookings.length, bookingsPerPage]);

  // Contact event handlers
  const handleViewContact = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setShowContactDetails(true);
  }, []);

  const handleChat = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setShowChat(true);
  }, []);

  const handleEditContact = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setShowContactForm(true);
    setShowContactDetails(false);
  }, []);

  const handleAddContact = useCallback(() => {
    setSelectedContact(null);
    setShowContactForm(true);
  }, []);

  const handleSaveContact = useCallback((contact: Contact) => {
    if (selectedContact) {
      setContacts(prev => prev.map(c => c.id === contact.id ? contact : c));
    } else {
      setContacts(prev => [...prev, contact]);
    }
    setSelectedContact(null);
  }, [selectedContact]);

  const handleDeleteContact = useCallback((contact: Contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      setContacts(prev => prev.filter(c => c.id !== contact.id));
      setShowContactDetails(false);
      setSelectedContact(null);
    }
  }, []);

  const handleEmail = useCallback((contact: Contact) => {
    window.open(`mailto:${contact.email}`, '_blank');
  }, []);

  const handleSort = useCallback((field: keyof Contact) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField, sortDirection]);

  // Booking event handlers
  const handleViewBooking = useCallback((booking: CallBooking) => {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  }, []);

  const handleEditBooking = useCallback((booking: CallBooking) => {
    setSelectedBooking(booking);
    setShowBookingForm(true);
    setShowBookingDetails(false);
  }, []);

  const handleAddBooking = useCallback(() => {
    setSelectedBooking(null);
    setShowBookingForm(true);
  }, []);

  const handleSaveBooking = useCallback((booking: CallBooking) => {
    if (selectedBooking) {
      setBookings(prev => prev.map(b => b.id === booking.id ? booking : b));
    } else {
      setBookings(prev => [...prev, booking]);
    }
    setSelectedBooking(null);
  }, [selectedBooking]);

  const handleDeleteBooking = useCallback((booking: CallBooking) => {
    if (window.confirm(`Are you sure you want to delete this booking with ${booking.contactName}?`)) {
      setBookings(prev => prev.filter(b => b.id !== booking.id));
      setShowBookingDetails(false);
      setSelectedBooking(null);
    }
  }, []);

  const handleRescheduleBooking = useCallback((booking: CallBooking) => {
    setSelectedBooking(booking);
    setShowBookingForm(true);
    setShowBookingDetails(false);
  }, []);

  const handleCompleteBooking = useCallback((booking: CallBooking) => {
    setBookings(prev => prev.map(b => 
      b.id === booking.id ? { ...b, status: 'completed' as const } : b
    ));
    setShowBookingDetails(false);
  }, []);

  const handleCancelBooking = useCallback((booking: CallBooking) => {
    if (window.confirm(`Are you sure you want to cancel this booking with ${booking.contactName}?`)) {
      setBookings(prev => prev.map(b => 
        b.id === booking.id ? { ...b, status: 'cancelled' as const } : b
      ));
      setShowBookingDetails(false);
    }
  }, []);

  const handleJoinCall = useCallback((booking: CallBooking) => {
    if (booking.meetingLink) {
      window.open(booking.meetingLink, '_blank');
    }
  }, []);

  const handleBookingSort = useCallback((field: keyof CallBooking) => {
    if (bookingSortField === field) {
      setBookingSortDirection(bookingSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setBookingSortField(field);
      setBookingSortDirection('asc');
    }
  }, [bookingSortField, bookingSortDirection]);

  const closeModals = useCallback(() => {
    setShowContactDetails(false);
    setShowChat(false);
    setShowContactForm(false);
    setShowBookingDetails(false);
    setShowBookingForm(false);
    setSelectedContact(null);
    setSelectedBooking(null);
  }, []);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            if (file.name.endsWith('.json')) {
              const importedData = JSON.parse(content);
              const importedContacts = Array.isArray(importedData) 
                ? importedData 
                : importedData.contacts || [];
              
              if (Array.isArray(importedContacts)) {
                setContacts(prev => [...prev, ...importedContacts]);
                alert(`Successfully imported ${importedContacts.length} contacts!`);
              } else {
                alert('Invalid file format. Expected an array of contacts.');
              }
            } else {
              alert('CSV import not implemented yet. Please use JSON format.');
            }
          } catch (error) {
            console.error('Import error:', error);
            alert('Error importing contacts. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, []);

  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(contacts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `contacts_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [contacts]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, statusFilter]);

  useEffect(() => {
    setBookingCurrentPage(1);
  }, [debouncedBookingSearchTerm, bookingStatusFilter, bookingTypeFilter]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'contacts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'bookings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Call Bookings
          </button>
        </div>

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <>
            {/* Header */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-slate-900">Contacts</h1>
                  <p className="text-slate-600 mt-2">
                    Manage your customer relationships and communication
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleImport}
                    className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Import
                  </button>
                  <button 
                    onClick={handleExport}
                    className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button 
                    onClick={handleAddContact}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Contact
                  </button>
                </div>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="lead">Lead</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  More Filters
                </button>
              </div>
            </div>

            {/* Contacts Table */}
            {loading ? (
              <TableSkeleton />
            ) : (
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center gap-2">
                            Contact
                            {sortField === 'name' && (
                              sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => handleSort('company')}
                        >
                          <div className="flex items-center gap-2">
                            Company
                            {sortField === 'company' && (
                              sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => handleSort('position')}
                        >
                          <div className="flex items-center gap-2">
                            Position
                            {sortField === 'position' && (
                              sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center gap-2">
                            Status
                            {sortField === 'status' && (
                              sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => handleSort('lastContact')}
                        >
                          <div className="flex items-center gap-2">
                            Last Contact
                            {sortField === 'lastContact' && (
                              sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Tags
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {paginatedContacts.map((contact) => (
                        <TableRow
                          key={contact.id}
                          contact={contact}
                          onView={handleViewContact}
                          onChat={handleChat}
                          onEmail={handleEmail}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                {paginatedContacts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No contacts found</h3>
                    <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
                    <button 
                      onClick={handleAddContact}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-2 inline" />
                      Add New Contact
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-slate-600">
                Showing page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-slate-300 rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-slate-300 rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <>
            {/* Header */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-slate-900">Call Bookings</h1>
                  <p className="text-slate-600 mt-2">
                    Schedule and manage your calls and meetings
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleAddBooking}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Schedule Booking
                  </button>
                </div>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={bookingSearchTerm}
                  onChange={(e) => setBookingSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rescheduled">Rescheduled</option>
                </select>
                <select
                  value={bookingTypeFilter}
                  onChange={(e) => setBookingTypeFilter(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="phone">Phone Call</option>
                  <option value="video">Video Call</option>
                  <option value="in-person">In-Person</option>
                </select>
                <button className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  More Filters
                </button>
              </div>
            </div>

            {/* Bookings Table */}
            {loadingBookings ? (
              <CallBookingTableSkeleton />
            ) : (
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => handleBookingSort('title')}
                        >
                          <div className="flex items-center gap-2">
                            Booking
                            {bookingSortField === 'title' && (
                              bookingSortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => handleBookingSort('contactName')}
                        >
                          <div className="flex items-center gap-2">
                            Contact
                            {bookingSortField === 'contactName' && (
                              bookingSortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => handleBookingSort('date')}
                        >
                          <div className="flex items-center gap-2">
                            Date & Time
                            {bookingSortField === 'date' && (
                              bookingSortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => handleBookingSort('type')}
                        >
                          <div className="flex items-center gap-2">
                            Type
                            {bookingSortField === 'type' && (
                              bookingSortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => handleBookingSort('status')}
                        >
                          <div className="flex items-center gap-2">
                            Status
                            {bookingSortField === 'status' && (
                              bookingSortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Tags
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {paginatedBookings.map((booking) => (
                        <CallBookingTableRow
                          key={booking.id}
                          booking={booking}
                          onView={handleViewBooking}
                          onJoinCall={handleJoinCall}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                {paginatedBookings.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-12 h-12 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No bookings found</h3>
                    <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
                    <button 
                      onClick={handleAddBooking}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-2 inline" />
                      Schedule New Booking
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-slate-600">
                Showing page {bookingCurrentPage} of {bookingTotalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setBookingCurrentPage(bookingCurrentPage - 1)}
                  disabled={bookingCurrentPage === 1}
                  className="p-2 border border-slate-300 rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(bookingTotalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setBookingCurrentPage(index + 1)}
                    className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      bookingCurrentPage === index + 1
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setBookingCurrentPage(bookingCurrentPage + 1)}
                  disabled={bookingCurrentPage === bookingTotalPages}
                  className="p-2 border border-slate-300 rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Drawers */}
        <ContactDetails
          contact={selectedContact}
          onClose={closeModals}
          onChat={handleChat}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          isOpen={showContactDetails}
        />

        <ContactForm
          contact={selectedContact}
          onClose={closeModals}
          onSave={handleSaveContact}
          isOpen={showContactForm}
        />

        <ChatWindow
          contact={selectedContact}
          onClose={closeModals}
          isOpen={showChat}
        />

        <CallBookingDetails
          booking={selectedBooking}
          onClose={closeModals}
          onEdit={handleEditBooking}
          onDelete={handleDeleteBooking}
          onReschedule={handleRescheduleBooking}
          onComplete={handleCompleteBooking}
          onCancel={handleCancelBooking}
          isOpen={showBookingDetails}
        />

        <CallBookingForm
          booking={selectedBooking}
          contacts={contacts}
          onClose={closeModals}
          onSave={handleSaveBooking}
          isOpen={showBookingForm}
        />
      </div>
    </div>
  );
}

ContactsPage.displayName = 'ContactsPage';

export default ContactsPage;