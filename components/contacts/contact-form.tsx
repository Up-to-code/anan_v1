import React, { useState } from 'react';
import { Drawer } from '@/components/ui2/drawer';
import { Button } from '@/components/ui2/button';
import { Input } from '@/components/ui2/input';
import { Select } from '@/components/ui2/select';
import { ContactFormProps } from '@/types';
import { Save, X, Plus } from 'lucide-react';

export const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  onClose,
  onSave,
  isOpen
}) => {
  const generateId = React.useCallback(() => Date.now().toString(), []);
  const [formData, setFormData] = useState(() => ({
    id: contact?.id || generateId(),
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
  })) ;

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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

  const statusOptions = [
    { value: 'lead', label: 'Lead' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const sourceOptions = [
    { value: 'Manual', label: 'Manual' },
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Conference', label: 'Conference' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Trade Show', label: 'Trade Show' }
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={contact ? 'Edit Contact' : 'Add New Contact'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Name *"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <Input
            label="Email *"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <Input
            label="Phone (WhatsApp)"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+15551234567"
          />

          <Input
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />

          <Input
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
          />

          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={statusOptions}
          />

          <Select
            label="Source"
            name="source"
            value={formData.source}
            onChange={handleInputChange}
            options={sourceOptions}
          />

          <Input
            label="Last Contact"
            type="date"
            name="lastContact"
            value={formData.lastContact}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-3">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add a tag..."
              className="flex-1"
            />
            <Button
              type="button"
              onClick={addTag}
              icon={<Plus className="w-4 h-4" />}
            >
              Add
            </Button>
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

      <div className="border-t border-slate-200/50 p-6 flex-shrink-0 backdrop-blur-sm bg-white/80">
        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            icon={<Save className="w-4 h-4" />}
            className="flex-1"
          >
            {contact ? 'Update Contact' : 'Save Contact'}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Drawer>
  );
};