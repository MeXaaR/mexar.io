// components/JSFormatter.tsx

"use client";
import React from "react";
import Formatter from "@/components/devtools/Formatter";
import { javascript } from "@codemirror/lang-javascript";
import beautify from "js-beautify";

// Simple minify function for JavaScript
const simpleMinifyJS = (code: string) => {
  // Remove comments
  let minified = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");
  // Remove whitespace
  minified = minified.replace(/\s+/g, " ");
  // Remove spaces around operators
  minified = minified.replace(
    /\s*([\=\+\-\*\/\{\}\(\)\[\]\;\,\.\:\?\&\|\!])\s*/g,
    "$1"
  );
  return minified.trim();
};

const JSFormatter = () => {
  return (
    <Formatter
      language="JavaScript"
      languageExtension={javascript}
      beautifyFunction={(code) =>
        beautify.js(code, {
          indent_size: 2,
          space_in_empty_paren: true,
        })
      }
      minifyFunction={simpleMinifyJS}
      sampleCode={`function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");`}
      inputPlaceholder="Enter your JavaScript code here..."
    />
  );
};

export default JSFormatter;
