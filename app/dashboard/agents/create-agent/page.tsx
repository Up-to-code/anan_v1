"use client";
import React, { useState } from "react";
import StepIndicator from "./StepIndicator";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export interface AIModel {
  id: string;
  name: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
}

export interface FormData {
  name: string;
  modelId: string;
  contacts: string[];
}

const AI_MODELS: AIModel[] = [
  { id: "gpt4", name: "GPT-4" },
  { id: "claude", name: "Claude 3" },
  { id: "gemini", name: "Gemini Pro" },
];

const CONTACTS: Contact[] = [
  { id: "1", name: "Sarah Chen", email: "sarah@techcorp.com" },
  { id: "2", name: "Mike Rodriguez", email: "mike@startup.io" },
  { id: "3", name: "Emily Watson", email: "emily@innovate.co" },
  { id: "4", name: "Alex Kumar", email: "alex@business.com" },
  { id: "5", name: "Jessica Brown", email: "jessica@enterprise.org" },
];

export default function CreateAssistant() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    modelId: "gpt4",
    contacts: CONTACTS.map(c => c.id),
  });
  
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

  const handleNext = (): void => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = (): void => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleNameChange = (value: string): void => {
    setFormData(prev => ({ ...prev, name: value }));
  };

  const handleModelChange = (modelId: string): void => {
    setFormData(prev => ({ ...prev, modelId }));
    setIsModelOpen(false);
  };

  const toggleContact = (contactId: string): void => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.includes(contactId)
        ? prev.contacts.filter(id => id !== contactId)
        : [...prev.contacts, contactId]
    }));
  };

  const toggleAllContacts = (): void => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.length === CONTACTS.length ? [] : CONTACTS.map(c => c.id)
    }));
  };

  const canProceed = (): boolean => {
    if (currentStep === 1) return formData.name.trim().length > 0;
    if (currentStep === 2) return !!formData.modelId;
    if (currentStep === 3) return formData.contacts.length > 0;
    return false;
  };

  const handleCreate = (): void => {
    console.log("Creating assistant:", formData);
    // Here you would typically make an API call to create the assistant
    alert(`Assistant "${formData.name}" created successfully!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" dir="ltr">
      <div className="max-w-4xl w-full mx-auto px-6 py-8 flex-1 flex">
        {/* Step Indicator - Vertical on Left Side */}
        <StepIndicator 
          currentStep={currentStep} 
          handleBack={handleBack} 
        />

        {/* Content Area - Right Side */}
        <div className="flex-1 pl-8 flex flex-col">
          {currentStep === 1 && (
            <Step1
              formData={formData}
              handleNameChange={handleNameChange}
              handleNext={handleNext}
              canProceed={canProceed}
            />
          )}

          {currentStep === 2 && (
            <Step2
              formData={formData}
              isModelOpen={isModelOpen}
              setIsModelOpen={setIsModelOpen}
              handleModelChange={handleModelChange}
              handleNext={handleNext}
              canProceed={canProceed}
              AI_MODELS={AI_MODELS}
            />
          )}

          {currentStep === 3 && (
            <Step3
              formData={formData}
              toggleContact={toggleContact}
              toggleAllContacts={toggleAllContacts}
              handleCreate={handleCreate}
              canProceed={canProceed}
              CONTACTS={CONTACTS}
            />
          )}
        </div>
      </div>
    </div>
  );
}