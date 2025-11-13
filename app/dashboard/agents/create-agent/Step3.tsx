import { Sparkles, Check } from "lucide-react";
import { FormData, Contact } from "./page";

interface Step3Props {
  formData: FormData;
  toggleContact: (contactId: string) => void;
  toggleAllContacts: () => void;
  handleCreate: () => void;
  canProceed: () => boolean;
  CONTACTS: Contact[];
}

const Step3 = ({ 
  formData, 
  toggleContact, 
  toggleAllContacts, 
  handleCreate, 
  canProceed,
  CONTACTS 
}: Step3Props) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-slate-900 mb-2">Connect contacts</h1>
        <p className="text-slate-500">Choose who can interact with your assistant</p>
      </div>
      
      <div className="flex-1 space-y-3 overflow-y-auto">
        {/* Select all toggle */}
        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
          <span className="text-sm text-slate-700">Select all</span>
          <button
            onClick={toggleAllContacts}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              formData.contacts.length === CONTACTS.length ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          >
            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              formData.contacts.length === CONTACTS.length ? 'translate-x-5' : ''
            }`} />
          </button>
        </div>

        {/* Contact list */}
        <div className="space-y-2">
          {CONTACTS.map((contact) => {
            const isSelected = formData.contacts.includes(contact.id);
            return (
              <button
                key={contact.id}
                onClick={() => toggleContact(contact.id)}
                className={`w-full p-4 bg-white border rounded-lg text-left transition-colors ${
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-900">{contact.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{contact.email}</div>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Button 50px below content */}
      <div className="mt-[50px] space-y-3">
        {formData.contacts.length > 0 && (
          <p className="text-center text-sm text-slate-500">
            {formData.contacts.length} contact{formData.contacts.length !== 1 ? 's' : ''} selected
          </p>
        )}
        <button
          onClick={handleCreate}
          disabled={!canProceed()}
          className="w-full py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Create Assistant
        </button>
      </div>
    </div>
  );
};

export default Step3;