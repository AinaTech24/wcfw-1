import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const SliderInput = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  prefix = "",
  suffix = "",
  unit = "",
}) => {
  const displayPrefix = unit || prefix;

  const [inputValue, setInputValue] = React.useState(value.toString());

  React.useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(val);

    if (val !== "" && !val.endsWith(".")) {
      const numVal = Number(val);
      if (numVal > max) onChange(max);
      else if (numVal < min) {
        onChange(numVal);
      } else {
        onChange(numVal);
      }
    }
  };

  const handleBlur = () => {
    let numVal = Number(inputValue);
    if (isNaN(numVal)) numVal = min;
    numVal = Math.max(min, Math.min(max, numVal));
    onChange(numVal);
    setInputValue(numVal.toString());
  };

  const increment = () => {
    const newVal = Math.min(max, value + step);
    onChange(newVal);
  };

  const decrement = () => {
    const newVal = Math.max(min, value - step);
    onChange(newVal);
  };

  const [isDragging, setIsDragging] = React.useState(false);

  // Calculate fill percentage
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="p-4 space-y-4 transition-all border border-transparent group bg-slate-50/50 rounded-2xl hover:border-orange-100">
      <div className="flex items-center justify-between">
        <span className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
          {label}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={decrement}
            className="flex items-center justify-center w-8 h-8 transition-all bg-white border rounded-lg shadow-sm outline-none border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-200 active:scale-95 sm:hidden"
          >
            <FaMinus size={10} />
          </button>
          <button
            onClick={increment}
            className="flex items-center justify-center w-8 h-8 transition-all bg-white border rounded-lg shadow-sm outline-none border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-200 active:scale-95 sm:hidden"
          >
            <FaPlus size={10} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-white border shadow-sm rounded-xl border-slate-100">
        <div className="flex items-center flex-1">
          <span className="mr-1 text-lg font-black text-slate-400">
            {displayPrefix}
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-full p-0 text-xl font-black bg-transparent border-none outline-none text-slate-900 focus:ring-0"
          />
          <span className="ml-1 text-lg font-black text-slate-400">
            {suffix}
          </span>
        </div>

        <div className="items-center hidden pl-4 ml-4 space-x-1 border-l sm:flex border-slate-100 text-slate-400">
          <button
            onClick={decrement}
            className="p-1 transition-colors outline-none hover:text-orange-500"
          >
            <FaMinus size={12} />
          </button>
          <div className="w-px h-4 mx-1 bg-slate-200"></div>
          <button
            onClick={increment}
            className="p-1 transition-colors outline-none hover:text-orange-500"
          >
            <FaPlus size={12} />
          </button>
        </div>
      </div>

      {/* Custom Slider */}
      <div className="relative pt-2 pb-1">
        {/* Track + Fill — full width of parent */}
        <div className="relative w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full bg-orange-500 rounded-full pointer-events-none ${
              isDragging ? "" : "transition-all duration-150"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Native Range Input — same full width, sits on top */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="custom-slider absolute top-2 left-0 w-full h-1.5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SliderInput;
