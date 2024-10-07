// components/CSSFormatter.tsx

"use client";
import React from "react";
import Formatter from "@/components/devtools/Formatter";
import { css } from "@codemirror/lang-css";
import beautify from "js-beautify";

// Simple minify function for CSS
const simpleMinifyCSS = (code: string) => {
  // Remove comments
  let minified = code.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove whitespace
  minified = minified.replace(/\s+/g, " ");
  // Remove spaces around symbols
  minified = minified.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
  // Remove unnecessary semicolons
  minified = minified.replace(/;}/g, "}");
  return minified.trim();
};

const CSSFormatter = () => {
  return (
    <Formatter
      language="CSS"
      languageExtension={css}
      beautifyFunction={(code) =>
        beautify.css(code, {
          indent_size: 2,
        })
      }
      minifyFunction={simpleMinifyCSS}
      sampleCode={`body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
}

p {
  font-size: 16px;
  line-height: 1.5;
}`}
      inputPlaceholder="Enter your CSS code here..."
    />
  );
};

export default CSSFormatter;
