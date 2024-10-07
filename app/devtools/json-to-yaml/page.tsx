// components/JSONToYAMLConverter.tsx

"use client";
import React from "react";
import Converter from "@/components/devtools/Converter";
import { json } from "@codemirror/lang-json";
import yaml from "js-yaml";

/**
 * JSONToYAMLConverter Component
 *
 * Provides functionalities to convert JSON to YAML and YAML to JSON.
 */
const JSONToYAMLConverter = () => {
  /**
   * Converts JSON to YAML.
   * @param {string} input - JSON string.
   * @returns {string} - YAML string.
   */
  const leftToRight = (input: string) => {
    try {
      const jsonData = JSON.parse(input);
      const yamlData = yaml.dump(jsonData);
      return yamlData;
    } catch (error: any) {
      throw new Error("Invalid JSON: " + error.message);
    }
  };

  /**
   * Converts YAML to JSON.
   * @param {string} input - YAML string.
   * @returns {string} - JSON string.
   */
  const rightToLeft = (input: string) => {
    try {
      const yamlData = yaml.load(input);
      const jsonData = JSON.stringify(yamlData, null, 2);
      return jsonData;
    } catch (error: any) {
      throw new Error("Invalid YAML: " + error.message);
    }
  };

  /**
   * Sample JSON input.
   */
  const leftSample = `{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zip": "12345"
  },
  "hobbies": ["reading", "gaming", "hiking"]
}`;

  /**
   * Sample YAML input.
   */
  const rightSample = `name: Jane Smith
email: jane@example.com
age: 25
address:
  street: 456 Elm St
  city: Othertown
  zip: 67890
hobbies:
  - painting
  - cycling
  - swimming`;

  return (
    <Converter
      language="JSONToYAML"
      leftLanguageExtension={json}
      leftToRight={leftToRight}
      rightToLeft={rightToLeft}
      leftSample={leftSample}
      rightSample={rightSample}
      leftPlaceholder="Enter your JSON data here..."
      rightPlaceholder="Converted YAML will appear here..."
    />
  );
};

export default JSONToYAMLConverter;
