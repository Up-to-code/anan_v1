import { ArrowRight } from "lucide-react";
import { FormData } from "./page";

interface Step1Props {
  formData: FormData;
  handleNameChange: (value: string) => void;
  handleNext: () => void;
  canProceed: () => boolean;
}

const Step1 = ({ formData, handleNameChange, handleNext, canProceed }: Step1Props) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-slate-900 mb-2">Assistant name</h1>
        <p className="text-slate-500">Give your assistant a memorable name</p>
      </div>
      
      <div className="flex-1">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Enter assistant name"
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoFocus
        />
      </div>

      {/* Button 50px below content */}
      <div className="mt-[50px]">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Step1;