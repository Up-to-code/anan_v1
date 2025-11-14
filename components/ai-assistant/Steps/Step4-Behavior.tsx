// components/ai-assistant/Steps/Step4-Behavior.tsx
import { Sparkles, Wand2 } from "lucide-react";
import { StepProps } from "../Types";
import { StepHeader } from "../Shared/StepHeader";
import { Button } from "../Shared/Button";
import { TEMPLATES, CAPABILITIES } from "../Constants";

export const Step4Behavior = ({ data, onChange, onCreate, loading }: StepProps) => {
  const canProceed = data.prompt.trim().length > 0;

  const generatePrompt = () => {
    const capabilities = CAPABILITIES.filter(c => data.capabilities.includes(c.id)).map(c => c.name);
    
    onChange({
      prompt: `You are "${data.name}", a professional AI customer service assistant.

AVAILABLE TOOLS: ${capabilities.join(', ')}

CORE IDENTITY:
- Personality: Friendly, professional, and solution-oriented
- Communication: Clear, empathetic, and patient
- Goal: Resolve issues efficiently while building customer trust
- Style: Adapt tone to match customer's mood and needs

KEY BEHAVIORS:
- Always acknowledge concerns before providing solutions
- Use customer's name when available
- Be proactive in suggesting relevant products/services
- Follow up to ensure complete satisfaction
- Escalate complex issues appropriately

Remember: You represent our brand and your success is measured by customer satisfaction.`
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && canProceed && onCreate) {
      onCreate();
    }
  };

  return (
    <div className="flex flex-col">
      <StepHeader 
        title="Custom Identity & Behavior" 
        description="Define your assistant's personality, communication style, and behavior rules" 
      />
      
      <div className="mb-8 space-y-6">
        <div className="space-y-4">
          <div className="text-lg font-semibold text-gray-900">Quick Personality Templates</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => onChange({ prompt: template.prompt || "" })}
                className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-center border-2 border-blue-200 hover:border-blue-300 group"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 bg-white rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                    {template.icon}
                  </div>
                  <span className="font-semibold text-blue-900 text-sm">{template.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-2 border-gray-300 rounded-xl overflow-hidden bg-white">
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-gray-900">Behavior Configuration</span>
            </div>
          </div>
          <textarea
            value={data.prompt}
            onChange={(e) => onChange({ prompt: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder={`Define how ${data.name || "your assistant"} should behave:

• Communication style and tone
• How to handle difficult customers  
• When to escalate to human agents
• Product knowledge level
• Sales approach (if applicable)
• Response time expectations
• Brand voice guidelines
• Success metrics to focus on...`}
            className="w-full h-64 px-6 py-4 resize-none focus:outline-none text-base leading-relaxed"
            autoFocus
          />
          <div className="border-t border-gray-200 px-6 py-3 flex justify-between items-center bg-gray-50">
            <button 
              onClick={generatePrompt}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50 font-medium"
            >
              <Wand2 className="w-4 h-4" />Auto-Generate Identity
            </button>
            <div className="text-sm text-gray-500 font-medium">
              {data.prompt.length} characters
            </div>
          </div>
        </div>
      </div>

      <Button onClick={onCreate} disabled={!canProceed} loading={loading}>
        <Sparkles className="w-5 h-5" />Create {data.name || "Assistant"}
      </Button>
      <p className="text-center text-sm text-gray-500 mt-3 font-medium">
        Press Ctrl+Enter to create instantly
      </p>
    </div>
  );
};