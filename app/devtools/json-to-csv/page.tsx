// components/JSONToCSVConverter.tsx

"use client";
import React from "react";
import Converter from "@/components/devtools/Converter";
import { json } from "@codemirror/lang-json";
import { parse as parseJSON2CSV } from "json2csv";
import Papa from "papaparse"; // For CSV to JSON
import { html } from "@codemirror/lang-html";

const JSONToCSVConverter = () => {
  const leftToRight = (input: string) => {
    try {
      const jsonData = JSON.parse(input);
      return parseJSON2CSV(jsonData);
    } catch (error: any) {
      throw new Error("Invalid JSON: " + error.message);
    }
  };

  const rightToLeft = (input: string) => {
    try {
      const result = Papa.parse(input, {
        header: true,
        skipEmptyLines: true,
      });
      return JSON.stringify(result.data, null, 2);
    } catch (error: any) {
      throw new Error("Invalid CSV: " + error.message);
    }
  };

  const leftSample = `[
    {
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30
    },
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "age": 25
    }
  ]`;

  const rightSample = `name,email,age
John Doe,john@example.com,30
Jane Smith,jane@example.com,25`;

  return (
    <Converter
      language="JSONToCSV"
      leftLanguageExtension={json}
      rightLanguageExtension={html} // Use plain text for CSV
      leftToRight={leftToRight}
      rightToLeft={rightToLeft}
      leftSample={leftSample}
      rightSample={rightSample}
      leftPlaceholder="Enter your JSON data here..."
      rightPlaceholder="Converted CSV will appear here..."
    />
  );
};

export default JSONToCSVConverter;
