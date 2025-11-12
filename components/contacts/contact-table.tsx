/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Table } from '@/components/ui2/table';
import { Contact } from '@/types';
import { User, Mail, Phone, MessageCircle } from 'lucide-react';

interface ContactTableProps {
  contacts: Contact[];
  sortField: keyof Contact;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Contact) => void;
  onView: (contact: Contact) => void;
  onChat: (contact: Contact) => void;
  onEmail: (contact: Contact) => void;
}

export const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  sortField,
  sortDirection,
  onSort,
  onView,
  onChat,
  onEmail
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'lead': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent, contact: Contact) => {
    e.stopPropagation();
    if (contact.phone) {
      const cleanPhone = contact.phone.replace(/[^\d+]/g, '');
      const message = encodeURIComponent('Hello! I\'m reaching out from your contact management system.');
      window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    }
  };

  const columns = [
    {
      key: 'name' as keyof Contact,
      label: 'Contact',
      sortable: true,
      render: (value: any, contact: Contact) => (
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
      )
    },
    {
      key: 'company' as keyof Contact,
      label: 'Company',
      sortable: true,
      render: (value: any) => (
        <div className="text-sm text-slate-900">{value}</div>
      )
    },
    {
      key: 'position' as keyof Contact,
      label: 'Position',
      sortable: true,
      render: (value: any) => (
        <div className="text-sm text-slate-900">{value}</div>
      )
    },
    {
      key: 'status' as keyof Contact,
      label: 'Status',
      sortable: true,
      render: (value: any) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(value)}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'lastContact' as keyof Contact,
      label: 'Last Contact',
      sortable: true,
      render: (value: any) => (
        <div className="text-sm text-slate-500">
          {new Date(value).toLocaleDateString()}
        </div>
      )
    },
    {
      key: 'tags' as keyof Contact,
      label: 'Tags',
      sortable: false,
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
              {tag}
            </span>
          ))}
          {value.length > 2 && (
            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
              +{value.length - 2}
            </span>
          )}
        </div>
      )
    },
    {
      key: 'actions' as any,
      label: 'Actions',
      sortable: false,
      render: (value: any, contact: Contact) => (
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
            onClick={(e) => handleWhatsAppClick(e, contact)}
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
      )
    }
  ];

  return (
    <Table
      columns={columns}
      data={contacts}
      sortField={sortField}
      sortDirection={sortDirection}
      onSort={onSort}
      onRowClick={onView}
      emptyMessage="Try adjusting your search or filters"
      emptyIcon={<User className="w-12 h-12 text-slate-400" />}
    />
  );
};