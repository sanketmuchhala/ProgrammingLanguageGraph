import { useState } from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBox({ value, onChange, placeholder = 'Search...' }: SearchBoxProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue); // Direct update, no debounce
  };

  return (
    <input
      type="text"
      className="search-box"
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
