/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  status: 'lead' | 'prospect' | 'active' | 'churned';
  lastContact: string;
  source: string;
  tags: string[];
  value: number; // Deal value
  pipeline: 'initial' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  notes?: string;
  createdAt: string;
  assignedTo: string;
  nextFollowUp: string;
}

// ============================================
// MOCK DATA
// ============================================
const mockContacts: Contact[] = [
  {
    id: 'CT-001',
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc',
    position: 'CTO',
    status: 'active',
    lastContact: '2024-01-15',
    source: 'Website',
    tags: ['Enterprise', 'SaaS', 'High-Value'],
    value: 125000,
    pipeline: 'proposal',
    notes: 'Interested in enterprise plan, needs technical demo',
    createdAt: '2024-01-10',
    assignedTo: 'John Smith',
    nextFollowUp: '2024-01-22'
  },
  {
    id: 'CT-002',
    name: 'Michael Chen',
    email: 'michael.chen@startup.io',
    phone: '+1 (555) 987-6543',
    company: 'StartupXYZ',
    position: 'Founder',
    status: 'prospect',
    lastContact: '2024-01-18',
    source: 'Referral',
    tags: ['Startup', 'Seed Stage', 'Tech'],
    value: 45000,
    pipeline: 'qualified',
    notes: 'Warm referral from existing client',
    createdAt: '2024-01-12',
    assignedTo: 'Jane Doe',
    nextFollowUp: '2024-01-20'
  },
  {
    id: 'CT-003',
    name: 'Emily Rodriguez',
    email: 'emily.r@enterprise.com',
    phone: '+1 (555) 456-7890',
    company: 'Enterprise Solutions',
    position: 'Procurement Manager',
    status: 'lead',
    lastContact: '2024-01-19',
    source: 'LinkedIn',
    tags: ['Fortune 500', 'B2B', 'Procurement'],
    value: 250000,
    pipeline: 'initial',
    notes: 'Initial contact, exploring options',
    createdAt: '2024-01-15',
    assignedTo: 'Mike Johnson',
    nextFollowUp: '2024-01-21'
  },
  {
    id: 'CT-004',
    name: 'David Thompson',
    email: 'david.t@midsize.com',
    phone: '+1 (555) 234-5678',
    company: 'MidSize Co',
    position: 'Operations Director',
    status: 'active',
    lastContact: '2024-01-14',
    source: 'Cold Email',
    tags: ['Mid-Market', 'Operations', 'Efficiency'],
    value: 75000,
    pipeline: 'negotiation',
    notes: 'Price sensitive, looking for quick implementation',
    createdAt: '2024-01-08',
    assignedTo: 'Sarah Wilson',
    nextFollowUp: '2024-01-19'
  },
  {
    id: 'CT-005',
    name: 'Jessica Williams',
    email: 'jessica.w@retail.com',
    phone: '+1 (555) 345-6789',
    company: 'Retail Chain',
    position: 'Marketing Director',
    status: 'churned',
    lastContact: '2023-12-01',
    source: 'Trade Show',
    tags: ['Retail', 'Marketing', 'Churn Risk'],
    value: 0,
    pipeline: 'closed-lost',
    notes: 'Lost to competitor, follow up in 6 months',
    createdAt: '2023-11-15',
    assignedTo: 'Tom Brown',
    nextFollowUp: '2024-06-01'
  }
];

// ============================================
// ICONS
// ============================================
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const DollarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1a2 2 0 002 2h.01M8 16H6a2 2 0 01-2-2v-4a2 2 0 012-2h2" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const SaveIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ============================================
// UTILITIES
// ============================================
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getDaysAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

// Simulate API calls
const fetchContacts = async (): Promise<Contact[]> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return mockContacts;
};

const saveContact = async (contact: Contact): Promise<Contact> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return contact;
};

const updateContact = async (contact: Contact): Promise<Contact> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return contact;
};

const deleteContact = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
};

// ============================================
// SKELETON LOADING COMPONENTS
// ============================================

const TableSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pipeline
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Contact
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-40"></div>
                    <div className="h-3 bg-gray-200 rounded w-36"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-200 rounded-full w-28"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const FiltersSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="flex gap-3">
          <div className="h-12 bg-gray-200 rounded w-40 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SMALL COMPONENTS
// ============================================

// Status Badge Component
const StatusBadge = ({ status }: { status: Contact['status'] }) => {
  const config = {
    lead: { color: 'bg-gray-50 text-gray-700 border-gray-200', label: 'Lead' },
    prospect: { color: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Prospect' },
    active: { color: 'bg-green-50 text-green-700 border-green-200', label: 'Active' },
    churned: { color: 'bg-red-50 text-red-700 border-red-200', label: 'Churned' }
  }[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
};

// Pipeline Badge Component
const PipelineBadge = ({ pipeline }: { pipeline: Contact['pipeline'] }) => {
  const config = {
    initial: { color: 'bg-gray-50 text-gray-700 border-gray-200', label: 'Initial' },
    qualified: { color: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Qualified' },
    proposal: { color: 'bg-purple-50 text-purple-700 border-purple-200', label: 'Proposal' },
    negotiation: { color: 'bg-orange-50 text-orange-700 border-orange-200', label: 'Negotiation' },
    'closed-won': { color: 'bg-green-50 text-green-700 border-green-200', label: 'Won' },
    'closed-lost': { color: 'bg-red-50 text-red-700 border-red-200', label: 'Lost' }
  }[pipeline];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
};

// Contact Form Component
const ContactForm = ({ 
  contact, 
  onClose, 
  onSave, 
  isOpen 
}: { 
  contact: Contact | null;
  onClose: () => void;
  onSave: (contact: Contact) => void;
  isOpen: boolean;
}) => {
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
    value: contact?.value || 0,
    pipeline: contact?.pipeline || 'initial',
    notes: contact?.notes || '',
    createdAt: contact?.createdAt || new Date().toISOString().split('T')[0],
    assignedTo: contact?.assignedTo || '',
    nextFollowUp: contact?.nextFollowUp || new Date().toISOString().split('T')[0],
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Error saving contact. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
                  <XIcon />
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
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
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
                      <option value="prospect">Prospect</option>
                      <option value="active">Active</option>
                      <option value="churned">Churned</option>
                    </select>
                  </div>

                  {/* Pipeline */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Pipeline Stage
                    </label>
                    <select
                      name="pipeline"
                      value={formData.pipeline}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="initial">Initial</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal">Proposal</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="closed-won">Closed Won</option>
                      <option value="closed-lost">Closed Lost</option>
                    </select>
                  </div>

                  {/* Value */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Deal Value ($)
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={formData.value}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
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
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Cold Email">Cold Email</option>
                      <option value="Trade Show">Trade Show</option>
                    </select>
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Assigned To
                    </label>
                    <input
                      type="text"
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Next Follow-up */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Next Follow-up
                    </label>
                    <input
                      type="date"
                      name="nextFollowUp"
                      value={formData.nextFollowUp}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
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
                    rows={3}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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
                          <XIcon />
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
                    <SaveIcon />
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
};

// Drawer Backdrop Component
const DrawerBackdrop = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 bg-black/20 z-40"
    onClick={onClose}
  />
);

// Drawer Header Component
const DrawerHeader = ({ contact, onClose }: { contact: Contact; onClose: () => void }) => (
  <div className="flex items-center justify-between p-6 border-b border-gray-200">
    <div>
      <h2 className="text-xl font-semibold text-gray-900">Contact Details</h2>
      <p className="text-gray-500 text-sm">{contact.id}</p>
    </div>
    <button
      onClick={onClose}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <CloseIcon />
    </button>
  </div>
);

// Contact Info Section Component
const ContactInfoSection = ({ contact }: { contact: Contact }) => {
  const handleWhatsAppClick = () => {
    const cleanPhone = contact.phone.replace(/[^\d+]/g, '');
    const message = encodeURIComponent(`Hello ${contact.name}, this is from your CRM system. How can I help you today?`);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Following up - ${contact.company}`);
    const body = encodeURIComponent(`Hi ${contact.name},\n\nHope you're doing well. I wanted to follow up regarding our previous conversation about ${contact.tags.join(', ')}.\n\nBest regards`);
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:${contact.phone}`, '_blank');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <UserIcon />
          <div>
            <p className="font-medium text-gray-900">{contact.name}</p>
            <p className="text-sm text-gray-500">{contact.position}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <BuildingIcon />
          <div>
            <p className="font-medium text-gray-900">{contact.company}</p>
            <p className="text-sm text-gray-500">Company</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <MailIcon />
          <div className="flex-1">
            <p className="font-medium text-gray-900">{contact.email}</p>
            <p className="text-sm text-gray-500">Email</p>
          </div>
          <button
            onClick={handleEmailClick}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Send Email"
          >
            <MailIcon />
          </button>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <PhoneIcon />
          <div className="flex-1">
            <p className="font-medium text-gray-900">{contact.phone}</p>
            <p className="text-sm text-gray-500">Phone</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={handlePhoneClick}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Call"
            >
              <PhoneIcon />
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="WhatsApp"
            >
              <WhatsAppIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Deal Info Section Component
const DealInfoSection = ({ contact }: { contact: Contact }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">Deal Value</p>
        <p className="font-semibold text-gray-900 text-xl">{formatCurrency(contact.value)}</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">Pipeline Stage</p>
        <PipelineBadge pipeline={contact.pipeline} />
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">Source</p>
        <p className="font-medium text-gray-900">{contact.source}</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">Assigned To</p>
        <p className="font-medium text-gray-900">{contact.assignedTo}</p>
      </div>
    </div>
  </div>
);

// Timeline Section Component
const TimelineSection = ({ contact }: { contact: Contact }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
        <span className="text-gray-600">Created</span>
        <span className="font-medium text-gray-900">{formatDate(contact.createdAt)}</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
        <span className="text-gray-600">Last Contact</span>
        <span className="font-medium text-gray-900">{getDaysAgo(contact.lastContact)}</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
        <span className="text-blue-600 font-medium">Next Follow-up</span>
        <span className="font-medium text-blue-900">{formatDate(contact.nextFollowUp)}</span>
      </div>
    </div>
  </div>
);

// Tags Section Component
const TagsSection = ({ contact }: { contact: Contact }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
    <div className="flex flex-wrap gap-2">
      {contact.tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

// Notes Section Component
const NotesSection = ({ contact }: { contact: Contact }) => {
  if (!contact.notes) return null;
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700">{contact.notes}</p>
      </div>
    </div>
  );
};

// Status Section Component
const StatusSection = ({ contact, onUpdateStatus }: { contact: Contact; onUpdateStatus: (status: Contact['status']) => void }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Status</h3>
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <StatusBadge status={contact.status} />
        <span className="text-sm text-gray-500">Current Status</span>
      </div>
      <select
        value={contact.status}
        onChange={(e) => onUpdateStatus(e.target.value as Contact['status'])}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
      >
        <option value="lead">Lead</option>
        <option value="prospect">Prospect</option>
        <option value="active">Active</option>
        <option value="churned">Churned</option>
      </select>
    </div>
  </div>
);

// Drawer Footer Component
const DrawerFooter = ({ contact, onEdit, onDelete }: { 
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <div className="border-t border-gray-200 p-6">
    <div className="flex gap-3">
      <button 
        onClick={onEdit}
        className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        <EditIcon />
        Edit Contact
      </button>
      <button 
        onClick={onDelete}
        className="px-4 py-3 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors"
      >
        <TrashIcon />
      </button>
    </div>
  </div>
);

// Drawer Content Component
const DrawerContent = ({ contact, onUpdateStatus, onEdit, onDelete }: { 
  contact: Contact; 
  onUpdateStatus: (status: Contact['status']) => void;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <div className="flex-1 overflow-y-auto p-6">
    <div className="space-y-8">
      <ContactInfoSection contact={contact} />
      <DealInfoSection contact={contact} />
      <TimelineSection contact={contact} />
      <TagsSection contact={contact} />
      <NotesSection contact={contact} />
      <StatusSection contact={contact} onUpdateStatus={onUpdateStatus} />
    </div>
  </div>
);

// Main Drawer Component
const ContactDetailsDrawer = ({ 
  contact, 
  onClose, 
  onUpdateStatus, 
  isOpen 
}: { 
  contact: Contact | null;
  onClose: () => void;
  onUpdateStatus: (contact: Contact, newStatus: Contact['status']) => void;
  isOpen: boolean;
}) => {
  if (!contact) return null;

  const handleEdit = () => {
    // This would open an edit form in a real implementation
    alert('Edit functionality would open a form here');
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      // Handle delete
      alert('Delete functionality would be implemented here');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <DrawerBackdrop onClose={onClose} />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300
            }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white z-50 shadow-xl"
          >
            <div className="flex flex-col h-full">
              <DrawerHeader contact={contact} onClose={onClose} />
              <DrawerContent 
                contact={contact} 
                onUpdateStatus={(status) => onUpdateStatus(contact, status)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <DrawerFooter 
                contact={contact}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Table Row Component
const ContactTableRow = ({ 
  contact, 
  onView, 
  onEdit, 
  onDelete 
}: { 
  contact: Contact;
  onView: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}) => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = contact.phone.replace(/[^\d+]/g, '');
    const message = encodeURIComponent(`Hello ${contact.name}, this is from your CRM system. How can I help you today?`);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const subject = encodeURIComponent(`Following up - ${contact.company}`);
    const body = encodeURIComponent(`Hi ${contact.name},\n\nHope you're doing well. I wanted to follow up regarding our previous conversation.\n\nBest regards`);
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onView(contact)}>
      <td className="px-6 py-4">
        <div>
          <div className="font-medium text-gray-900">{contact.name}</div>
          <div className="text-sm text-gray-500">{contact.email}</div>
          <div className="text-sm text-gray-500">{contact.phone}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <div className="font-medium text-gray-900">{contact.company}</div>
          <div className="text-sm text-gray-500">{contact.position}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-semibold text-gray-900">{formatCurrency(contact.value)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <PipelineBadge pipeline={contact.pipeline} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={contact.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{getDaysAgo(contact.lastContact)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleEmailClick}
            className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Send Email"
          >
            <MailIcon />
          </button>
          <button
            onClick={handleWhatsAppClick}
            className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors"
            title="WhatsApp"
          >
            <WhatsAppIcon />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(contact);
            }}
            className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit"
          >
            <EditIcon />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(contact);
            }}
            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <TrashIcon />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-12">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <UserIcon />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No contacts found</h3>
    <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
    <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
      Add New Contact
    </button>
  </div>
);

// Filters Component
const FiltersSection = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter 
}: { 
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search contacts by name, email, company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </div>
      <div className="flex gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent min-w-[150px]"
        >
          <option value="all">All Status</option>
          <option value="lead">Lead</option>
          <option value="prospect">Prospect</option>
          <option value="active">Active</option>
          <option value="churned">Churned</option>
        </select>
        <button className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
          <FilterIcon />
          Filters
        </button>
      </div>
    </div>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function CRMTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Simulate API call on component mount
  useEffect(() => {
    const loadContacts = async () => {
      try {
        setLoading(true);
        const data = await fetchContacts();
        setContacts(data);
      } catch (error) {
        console.error('Error loading contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  // Filter and search contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = 
        contact.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [contacts, debouncedSearchTerm, statusFilter]);

  const handleViewContact = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setShowContactDetails(true);
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

  const handleSaveContact = useCallback(async (contact: Contact) => {
    try {
      if (selectedContact) {
        // Update existing contact
        const updatedContact = await updateContact(contact);
        setContacts(prev => prev.map(c => c.id === contact.id ? updatedContact : c));
      } else {
        // Add new contact
        const newContact = await saveContact(contact);
        setContacts(prev => [...prev, newContact]);
      }
      setSelectedContact(null);
      setShowContactForm(false);
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Error saving contact. Please try again.');
    }
  }, [selectedContact]);

  const handleDeleteContact = useCallback(async (contact: Contact) => {
    try {
      await deleteContact(contact.id);
      setContacts(prev => prev.filter(c => c.id !== contact.id));
      setShowContactDetails(false);
      setSelectedContact(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error deleting contact. Please try again.');
    }
  }, []);

  const handleUpdateStatus = useCallback((contact: Contact, newStatus: Contact['status']) => {
    setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, status: newStatus } : c));
  }, []);

  const closeContactDetails = useCallback(() => {
    setShowContactDetails(false);
    setSelectedContact(null);
  }, []);

  const closeContactForm = useCallback(() => {
    setShowContactForm(false);
    setSelectedContact(null);
  }, []);

  const handleExportReport = useCallback(() => {
    const dataStr = JSON.stringify(contacts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `crm_contacts_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [contacts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading ? (
          <>
            <HeaderSkeleton />
            <FiltersSkeleton />
            <TableSkeleton />
          </>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">CRM Contacts</h1>
                  <p className="text-gray-600 mt-2">Manage your sales pipeline and customer relationships</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleExportReport}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                  >
                    <DownloadIcon />
                    Export
                  </button>
                  <button 
                    onClick={handleAddContact}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center gap-2"
                  >
                    <PlusIcon />
                    Add Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <FiltersSection 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />

            {/* Contacts Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pipeline
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Contact
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContacts.map((contact) => (
                      <ContactTableRow
                        key={contact.id}
                        contact={contact}
                        onView={handleViewContact}
                        onEdit={handleEditContact}
                        onDelete={handleDeleteContact}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredContacts.length === 0 && <EmptyState />}
            </div>

            {/* Contact Details Drawer */}
            <ContactDetailsDrawer
              contact={selectedContact}
              onClose={closeContactDetails}
              onUpdateStatus={handleUpdateStatus}
              isOpen={showContactDetails}
            />

            {/* Contact Form */}
            <ContactForm
              contact={selectedContact}
              onClose={closeContactForm}
              onSave={handleSaveContact}
              isOpen={showContactForm}
            />
          </>
        )}
      </div>
    </div>
  );
}