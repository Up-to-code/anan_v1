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

interface ContactDetailsProps {
  contact: Contact | null;
  onClose: () => void;
  onChat: (contact: Contact) => void;
  isOpen: boolean;
}

interface ChatWindowProps {
  contact: Contact | null;
  onClose: () => void;
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
    phone: '+1 (555) 123-4567',
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
    phone: '+1 (555) 987-6543',
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
    phone: '+1 (555) 456-7890',
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
    phone: '+1 (555) 234-5678',
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
    phone: '+1 (555) 345-6789',
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
    phone: '+1 (555) 567-8901',
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
    phone: '+1 (555) 678-9012',
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
    phone: '+1 (555) 789-0123',
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
    phone: '+1 (555) 890-1234',
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
    phone: '+1 (555) 901-2345',
    company: 'Cloud Systems',
    position: 'IT Manager',
    status: 'lead',
    lastContact: '2024-01-06',
    source: 'Website',
    tags: ['Technical'],
  },
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

// ============================================
// MEMOIZED COMPONENTS
// ============================================

// Contact Details Drawer Component
const ContactDetails = memo(({ contact, onClose, onChat, isOpen }: ContactDetailsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'lead': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
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

              {/* Footer */}
              <div className="border-t border-slate-200/50 p-6 flex-shrink-0 backdrop-blur-sm bg-white/80">
                <div className="flex gap-3">
                  <button
                    onClick={() => contact && onChat(contact)}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Start Chat
                  </button>
                  <button className="px-4 py-3 border border-slate-300/50 text-slate-700 rounded-lg font-medium hover:bg-slate-50/50 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-3 border border-slate-300/50 text-slate-700 rounded-lg font-medium hover:bg-slate-50/50 transition-colors">
                    <Mail className="w-4 h-4" />
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

// Table Row Component
const TableRow = memo(({ 
  contact, 
  onView, 
  onChat 
}: {
  contact: Contact;
  onView: (contact: Contact) => void;
  onChat: (contact: Contact) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'lead': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
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
            onClick={() => onView(contact)}
            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChat(contact)}
            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
            title="Start Chat"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button 
            className="text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-50 transition-colors"
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button 
            className="text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-50 transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </button>
          <button 
            className="text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-50 transition-colors"
            title="More Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
});

// ============================================
// MAIN COMPONENT
// ============================================
export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const contactsPerPage = 10;

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
      const aValue = a[sortField as keyof Contact];
      const bValue = b[sortField as keyof Contact];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
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

  // Memoize totalPages
  const totalPages = useMemo(() => {
    return Math.ceil(sortedContacts.length / contactsPerPage);
  }, [sortedContacts.length, contactsPerPage]);

  // Memoize event handlers
  const handleViewContact = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setShowContactDetails(true);
  }, []);

  const handleChat = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setShowChat(true);
  }, []);

  const handleSort = useCallback((field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField, sortDirection]);

  const closeModals = useCallback(() => {
    setShowContactDetails(false);
    setShowChat(false);
    setSelectedContact(null);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
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
            <button className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Contacts Table */}
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
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 mr-2 inline" />
                Add New Contact
              </button>
            </div>
          )}
        </div>

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

        {/* Drawers */}
        <ContactDetails
          contact={selectedContact}
          onClose={closeModals}
          onChat={handleChat}
          isOpen={showContactDetails}
        />

        <ChatWindow
          contact={selectedContact}
          onClose={closeModals}
          isOpen={showChat}
        />
      </div>
    </div>
  );
}