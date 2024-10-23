// components/GenericConverter.tsx

"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

export interface Unit {
  name: string;
  symbol: string;
  ratio: number;
  offset?: number;
}

/**
 * GenericConverter Component
 *
 * A generic component to convert units based on given ratios and optional offsets.
 * It takes a list of units and their conversion ratios and offsets relative to the reference unit.
 */
const GenericConverter: React.FC<{ units: Unit[] }> = ({ units }) => {
  // State to hold the value for each unit
  const [values, setValues] = useState<{ [key: string]: number | null }>(() => {
    const initialState: { [key: string]: number | null } = {};
    units.forEach((unit) => {
      initialState[unit.name] = null;
    });
    return initialState;
  });

  /**
   * Handles changes in any of the input fields
   * @param {string} unitName - The name of the unit being changed
   * @param {number} value - The new value
   */
  const handleInputChange = (unitName: string, value: number) => {
    const referenceUnit = units.find((u) => u.name === unitName)!;
    let referenceValue = value;

    // If the unit has an offset, subtract it to get the reference value
    if (referenceUnit.offset) {
      referenceValue = (value - referenceUnit.offset) / referenceUnit.ratio;
    } else {
      referenceValue = value / referenceUnit.ratio;
    }

    const updatedValues: { [key: string]: number } = {};
    units.forEach((unit) => {
      if (unit.offset) {
        updatedValues[unit.name] = referenceValue * unit.ratio + unit.offset;
      } else {
        updatedValues[unit.name] = referenceValue * unit.ratio;
      }
    });

    setValues(updatedValues);
  };

  return (
    <div className="container" style={{ padding: 20 }}>
      {/* Conversion Input Section */}
      <div className="columns is-multiline">
        {units.map((unit, index) => (
          <div className="column is-6" key={index}>
            <div className="field">
              <label className="label">{`${unit.name} (${unit.symbol})`}</label>
              <div style={{ display: "flex" }}>
                <input
                  className="input"
                  type="number"
                  value={values[unit.name] || ""}
                  onChange={(e) =>
                    handleInputChange(unit.name, parseFloat(e.target.value))
                  }
                  placeholder={`Enter value in ${unit.name}`}
                />
                <button
                  className="button is-right"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      values[unit.name]?.toString() || ""
                    );
                    toast(`Value in ${unit.name} copied to clipboard.`);
                  }}
                >
                  <span className="icon is-right">
                    <i className="fas fa-copy"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenericConverter;
