// components/SASSFormatter.tsx

"use client";
import React from "react";
import Formatter from "@/components/devtools/Formatter";
import { css } from "@codemirror/lang-css"; // Using CSS mode as a fallback
import beautify from "js-beautify";

// Simple minify function for SASS
const simpleMinifySASS = (code: string) => {
  // Remove multiline comments
  let minified = code.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove single-line comments
  minified = minified.replace(/\/\/.*$/gm, "");
  // Remove whitespace
  minified = minified.replace(/\s+/g, " ");
  // Remove spaces around symbols
  minified = minified.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
  // Remove unnecessary semicolons
  minified = minified.replace(/;}/g, "}");
  // Trim leading/trailing whitespace
  minified = minified.trim();
  return minified;
};

// Beautify function for SASS
const beautifySASS = (code: string) => {
  // Use js-beautify's CSS beautifier as a fallback
  return beautify.css(code, {
    indent_size: 2,
  });
};

const SASSFormatter = () => {
  return (
    <Formatter
      language="SASS"
      languageExtension={css} // Using CSS extension as a fallback
      beautifyFunction={beautifySASS}
      minifyFunction={simpleMinifySASS}
      sampleCode={`$primary-color: #333;

body {
  font-family: Arial, sans-serif;
  color: $primary-color;

  h1 {
    font-size: 2em;
    margin: 0;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
  }
}`}
      inputPlaceholder="Enter your SASS code here..."
    />
  );
};

export default SASSFormatter;
