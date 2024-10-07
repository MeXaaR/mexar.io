// components/SVGToCSSConverter.tsx

"use client";
import React from "react";
import Converter from "@/components/devtools/Converter";
import { xml } from "@codemirror/lang-xml";
import { css } from "@codemirror/lang-css";

const SVGToCSSConverter = () => {
  const leftToRight = (input: string) => {
    try {
      const encoded = encodeURIComponent(input)
        .replace(/'/g, "%27")
        .replace(/"/g, "%22");
      return `background-image: url("data:image/svg+xml,${encoded}");`;
    } catch (error: any) {
      throw new Error("Error converting SVG to CSS: " + error.message);
    }
  };

  const rightToLeft = (input: string) => {
    try {
      const match = input.match(
        /url\(["']?data:image\/svg\+xml,([^"')]+)["']?\)/
      );
      if (!match || match.length < 2) {
        throw new Error("CSS does not contain a valid SVG data URL.");
      }
      const encodedSVG = match[1];
      const decodedSVG = decodeURIComponent(encodedSVG);
      return decodedSVG;
    } catch (error: any) {
      throw new Error("Error extracting SVG from CSS: " + error.message);
    }
  };

  const leftSample = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>`;

  const rightSample = `background-image: url("data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2240%22%20stroke%3D%22green%22%20stroke-width%3D%224%22%20fill%3D%22yellow%22%20/%3E%0A%3C/svg%3E");`;

  return (
    <Converter
      language="SVGToCSS"
      leftLanguageExtension={xml}
      rightLanguageExtension={css}
      leftToRight={leftToRight}
      rightToLeft={rightToLeft}
      leftSample={leftSample}
      rightSample={rightSample}
      leftPlaceholder="Enter your SVG code here..."
      rightPlaceholder="Converted CSS will appear here..."
    />
  );
};

export default SVGToCSSConverter;
