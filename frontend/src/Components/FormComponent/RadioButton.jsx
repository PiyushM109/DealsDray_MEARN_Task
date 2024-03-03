import React, { useState } from 'react';

const RadioButton = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
