// components/JSONFormatter.tsx

"use client";
import React from "react";
import Formatter from "@/components/devtools/Formatter";
import { json } from "@codemirror/lang-json";
import { sample } from "./data";

// Minify function for JSON
const minifyJSON = (code: string) => {
  try {
    const parsed = JSON.parse(code);
    return JSON.stringify(parsed);
  } catch {
    throw new Error("Invalid JSON");
  }
};

// Beautify function for JSON
const beautifyJSON = (code: string) => {
  try {
    const parsed = JSON.parse(code);
    return JSON.stringify(parsed, null, 2);
  } catch {
    throw new Error("Invalid JSON");
  }
};

const JSONFormatter = () => {
  return (
    <Formatter
      language="JSON"
      languageExtension={json}
      beautifyFunction={beautifyJSON}
      minifyFunction={minifyJSON}
      sampleCode={JSON.stringify(sample)}
      inputPlaceholder="Enter your JSON code here..."
    />
  );
};

export default JSONFormatter;
