import React from 'react';
import { Drawer } from '@/components/ui2/drawer';
import { Button } from '@/components/ui2/button';
import { ContactDetailsProps } from '@/types';
import { User, Mail, Phone, Building, Calendar, MessageCircle, Edit, Trash2 } from 'lucide-react';

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  contact,
  onClose,
  onChat,
  onEdit,
  onDelete,
  isOpen
}) => {
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

  if (!contact) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Contact Details"
      size="lg"
    >
      <div className="flex-1 overflow-y-auto p-6 backdrop-blur-sm">
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
      </div>

      <div className="border-t border-slate-200/50 p-6 flex-shrink-0 backdrop-blur-sm bg-white/80">
        <div className="space-y-3">
          <div className="flex gap-3">
            <Button
              onClick={() => onChat(contact)}
              icon={<MessageCircle className="w-4 h-4" />}
              className="flex-1"
            >
              Start Chat
            </Button>
            <Button
              variant="outline"
              onClick={handleWhatsAppClick}
              className="px-4"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(`mailto:${contact.email}`, '_blank')}
              className="px-4"
            >
              <Mail className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onEdit(contact)}
              icon={<Edit className="w-4 h-4" />}
              className="flex-1"
            >
              Edit Contact
            </Button>
            <Button
              variant="danger"
              onClick={() => onDelete(contact)}
              icon={<Trash2 className="w-4 h-4" />}
              className="flex-1"
            >
              Delete Contact
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};