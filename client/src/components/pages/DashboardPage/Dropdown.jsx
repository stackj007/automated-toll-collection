// src/components/Dropdown.jsx
import React from 'react'

export function Dropdown({
  options,
  selectedOption,
  onOptionChange,
}) {
  return (
    <select
      value={selectedOption}
      onChange={(e) => onOptionChange(e.target.value)}
      className="form-select block w-full mt-1"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
