// components/HTMLFormatter.tsx

"use client";
import React from "react";
import Formatter from "@/components/devtools/Formatter";
import { html } from "@codemirror/lang-html";
import beautify from "js-beautify";

// Simple minify function for HTML
const simpleMinifyHTML = (code: string) => {
  // Remove comments
  let minified = code.replace(/<!--[\s\S]*?-->/g, "");
  // Remove whitespace
  minified = minified.replace(/\s+/g, " ");
  // Remove spaces between tags
  minified = minified.replace(/>\s+</g, "><");
  return minified.trim();
};

const HTMLFormatter = () => {
  return (
    <Formatter
      language="HTML"
      languageExtension={html}
      beautifyFunction={(code) =>
        beautify.html(code, {
          indent_size: 2,
          content_unformatted: ["script", "style"],
        })
      }
      minifyFunction={simpleMinifyHTML}
      sampleCode={`<!DOCTYPE html>
<html>
<head>
  <title>Example</title>
  <style>
    body { font-family: Arial; }
  </style>
</head>
<body>
  <h1>Hello World!</h1>
  <p>This is a sample HTML code.</p>
  <script>
    console.log("Hello World!");
  </script>
</body>
</html>`}
      inputPlaceholder="Enter your HTML code here..."
    />
  );
};

export default HTMLFormatter;
