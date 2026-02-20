import { clamp } from '../utils/clamp';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export function Slider({ label, value, min, max, step, onChange }: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = clamp(parseFloat(e.target.value), min, max);
    onChange(newValue);
  };

  return (
    <div className="slider-control">
      <label className="slider-label">
        {label}: <span className="slider-value">{value.toFixed(2)}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="slider"
      />
    </div>
  );
}
