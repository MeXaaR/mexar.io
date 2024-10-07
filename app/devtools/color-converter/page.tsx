// components/ColorConverter.tsx

"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Color from "color";

/**
 * ColorConverter Component
 *
 * Provides a tool to convert color values between various formats, including opacity.
 */
const ColorConverter = () => {
  // State to hold the input color value
  const [inputColor, setInputColor] = useState<string>("#FF0000");

  // State to hold the color object
  const [color, setColor] = useState<Color | null>(Color("#FF0000"));

  /**
   * Handles changes in the color input field
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputColor(value);

    try {
      const parsedColor = Color(value);
      setColor(parsedColor);
    } catch {
      setColor(null);
      // toast.error("Invalid color value.");
    }
  };

  /**
   * Handles copying color values to the clipboard
   * @param {string} value - The color value to copy
   */
  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast("Color value copied to clipboard.");
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  // Generates the converted color formats, including opacity
  const getColorFormats = () => {
    if (!color)
      return [
        "Hex",
        "Hex8",
        "RGB",
        "RGBA",
        "HSL",
        "HSV",
        "HSVA",
        "HWB",
        "CMYK",
        "Keyword",
        "Luminance",
        "Alpha",
      ].map((format) => ({ label: format, value: "N/A" }));

    // Get alpha value and round to two decimal places
    const alpha = parseFloat(color.alpha().toFixed(2));

    const formats = [
      {
        label: "Hex",
        value: alpha < 1 ? "N/A (Alpha < 1)" : color.hex().toUpperCase(),
      },
      {
        label: "Hex8",
        value: color.hexa().toUpperCase(),
      },
      {
        label: "RGB",
        value:
          alpha < 1
            ? `rgb(${color.red()}, ${color.green()}, ${color.blue()})`
            : color.rgb().string(),
      },
      {
        label: "RGBA",
        value: color.rgb().string(),
      },
      {
        label: "HSL",
        value:
          alpha < 1
            ? `hsl(${Math.round(color.hsl().hue())}, ${Math.round(
                color.hsl().saturationl()
              )}%, ${Math.round(color.hsl().lightness())}%)`
            : color.hsl().string(),
      },
      // {
      //   label: "HSLA",
      //   value: color.hsla().string(),
      // },
      {
        label: "HSV",
        value:
          alpha < 1
            ? `hsv(${Math.round(color.hsv().hue())}, ${Math.round(
                color.hsv().saturationl()
              )}%, ${Math.round(color.hsv().value())}%)`
            : `hsva(${Math.round(color.hsv().hue())}, ${Math.round(
                color.hsv().saturationl()
              )}%, ${Math.round(color.hsv().value())}%, ${alpha})`,
      },
      {
        label: "HSVA",
        value: `hsva(${Math.round(color.hsv().hue())}, ${Math.round(
          color.hsv().saturationl()
        )}%, ${Math.round(color.hsv().value())}%, ${alpha})`,
      },
      {
        label: "HWB",
        value:
          alpha < 1
            ? `hwb(${Math.round(color.hwb().hue())}, ${Math.round(
                color.hwb().white()
              )}%, ${Math.round(color.hwb().black())}%)`
            : `hwb(${Math.round(color.hwb().hue())}, ${Math.round(
                color.hwb().white()
              )}%, ${Math.round(color.hwb().black())}%, ${alpha})`,
      },
      {
        label: "CMYK",
        value: `cmyk(${color
          .cmyk()
          .array()
          .map((v) => Math.round(v))
          .join(", ")})`,
      },
      {
        label: "Keyword",
        value: color.alpha() < 1 ? "N/A (Alpha < 1)" : color.keyword() || "N/A",
      },
      {
        label: "Luminance",
        value: color.luminosity().toFixed(3),
      },
      {
        label: "Alpha",
        value: alpha.toString(),
      },
    ];

    return formats;
  };

  return (
    <div className="container" style={{ padding: 20 }}>
      {/* Color Input Section */}
      <div className="columns is-multiline">
        <div className="column is-12" style={{ display: "flex" }}>
          <input
            className="input"
            type="text"
            value={inputColor}
            onChange={handleInputChange}
            placeholder="Enter color value (e.g., #FF0000, rgba(255,0,0,0.5), red)"
          />
          <button
            className="button"
            style={{
              backgroundColor: color ? color.rgb().string() : "#fff",
              color: color && color.isLight() ? "#000" : "#fff",
            }}
          >
            Preview
          </button>
        </div>

        {/* Converted Color Formats */}
        {getColorFormats().map((format, index) => (
          <div className="column is-6" key={index}>
            <div className="field">
              <label className="label">{format.label}</label>
              <div style={{ display: "flex" }}>
                <input
                  className="input"
                  type="text"
                  value={format.value}
                  readOnly
                />
                <button
                  className="button is-right"
                  onClick={() => handleCopy(format.value)}
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

export default ColorConverter;
