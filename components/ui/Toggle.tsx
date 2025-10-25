// components/ui/Toggle.tsx
interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  name?: string; // Add name prop
  disabled?: boolean;
}

export function Toggle({ enabled, onChange, name, disabled = false }: ToggleProps) {
  return (
    <>
      {name && <input type="hidden" name={name} value={enabled ? 'on' : 'off'} />}
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? 'bg-blue-500' : 'bg-gray-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </>
  );
}