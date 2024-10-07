// components/XMLFormatter.tsx

"use client";
import React from "react";
import Formatter from "@/components/devtools/Formatter";
import { xml } from "@codemirror/lang-xml";
import beautify from "js-beautify";

// Simple minify function for XML
const simpleMinifyXML = (code: string) => {
  // Remove XML comments
  let minified = code.replace(/<!--[\s\S]*?-->/g, "");
  // Remove whitespace between tags
  minified = minified.replace(/>\s+</g, "><");
  // Collapse multiple spaces into one
  minified = minified.replace(/\s{2,}/g, " ");
  // Remove leading and trailing whitespace
  minified = minified.trim();
  return minified;
};

// Beautify function for XML
const beautifyXML = (code: string) => {
  try {
    // Use js-beautify's HTML beautifier for XML
    return beautify.html(code, {
      indent_size: 2,
      content_unformatted: [], // Do not exclude any tags from formatting
      end_with_newline: true,
    });
  } catch {
    throw new Error("Invalid XML");
  }
};

const XMLFormatter = () => {
  return (
    <Formatter
      language="XML"
      languageExtension={xml}
      beautifyFunction={beautifyXML}
      minifyFunction={simpleMinifyXML}
      sampleCode={`<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>User</to>
  <from>Assistant</from>
  <heading>Reminder</heading>
  <body>Don't forget to review the XMLFormatter component!</body>
</note>`}
      inputPlaceholder="Enter your XML code here..."
    />
  );
};

export default XMLFormatter;
