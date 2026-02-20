import { useState, useEffect } from 'react';
import { debounce } from '../utils/debounce';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBox({ value, onChange, placeholder = 'Search...' }: SearchBoxProps) {
  const [localValue, setLocalValue] = useState(value);

  // Debounced onChange to avoid too many updates
  useEffect(() => {
    const debouncedOnChange = debounce(onChange, 300);
    debouncedOnChange(localValue);
  }, [localValue, onChange]);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <input
      type="text"
      className="search-box"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder={placeholder}
    />
  );
}
