// components/SQLFormatter.tsx

"use client";
import React from "react";
import Formatter from "@/components/devtools/Formatter";
import { sql } from "@codemirror/lang-sql";
import { format } from "sql-formatter";

/**
 * Simple minify function for SQL.
 * Removes comments and unnecessary whitespace.
 */
const simpleMinifySQL = (code: string) => {
  // Remove single-line comments
  let minified = code.replace(/--.*$/gm, "");
  // Remove multi-line comments
  minified = minified.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove extra whitespace
  minified = minified.replace(/\s+/g, " ");
  // Trim leading and trailing whitespace
  minified = minified.trim();
  return minified;
};

/**
 * SQLFormatter Component
 *
 * Provides beautify and minify functionalities for SQL code.
 */
const SQLFormatter = () => {
  return (
    <Formatter
      language="SQL"
      languageExtension={sql}
      beautifyFunction={(code) =>
        format(code, {
          language: "sql",
        })
      }
      minifyFunction={simpleMinifySQL}
      sampleCode={`SELECT user.id, user.name, orders.id, orders.total
FROM user
JOIN orders ON user.id = orders.user_id
WHERE orders.total > 100
ORDER BY orders.total DESC;`}
      inputPlaceholder="Enter your SQL code here..."
    />
  );
};

export default SQLFormatter;
