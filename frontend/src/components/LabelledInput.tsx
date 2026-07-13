import type { ChangeEvent } from "react";

interface LabelledInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function LabelledInput({
  label,
  placeholder,
  type = "text",
  error,
  onChange,
}: LabelledInputProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-800">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-400 rounded-md px-3 py-2 outline-none focus:border-black transition-colors"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
