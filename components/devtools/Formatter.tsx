// components/Formatter.tsx

"use client";
import React, { useMemo, useState, useRef } from "react";
import usePersistedState from "@/utils/usePersistedState";
import { GlobalStore, useGlobalStore } from "@/utils/useGlobalStore";
import { toast } from "react-toastify";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";

/**
 * FormatterProps Interface
 *
 * Defines the props required by the Formatter component.
 */
interface FormatterProps {
  language: string;
  languageExtension: any;
  beautifyFunction: (code: string) => string;
  minifyFunction: (code: string) => string;
  sampleCode: string;
  inputPlaceholder: string;
}

/**
 * Formatter Component
 *
 * A generic formatter component that provides beautify and minify functionalities
 * for different programming languages.
 */
const Formatter: React.FC<FormatterProps> = ({
  language,
  languageExtension,
  beautifyFunction,
  minifyFunction,
  sampleCode,
  inputPlaceholder,
}) => {
  const isDark = useGlobalStore((state) => (state as GlobalStore).dark);

  // Persisted state for the size (width percentage) of the left panel
  const [size, setSize] = usePersistedState<number>(
    `${language.toLowerCase()}FormatterSize`,
    50
  );

  // State for the input code
  const [inputCode, setInputCode] = useState<string>("");

  // State for the formatted or minified code
  const [outputCode, setOutputCode] = useState<string>("");

  // Reference to the container for resizing
  const containerRef = useRef<HTMLDivElement>(null);

  // Reference to track if resizing is in progress
  const isResizing = useRef<boolean>(false);

  /**
   * Handles the mouse down event on the resizer to start resizing
   */
  const handleMouseDown = () => {
    isResizing.current = true;
    if (typeof document === "undefined") return;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  /**
   * Handles the mouse up event to stop resizing
   */
  const handleMouseUp = () => {
    isResizing.current = false;
    if (typeof document === "undefined") return;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  /**
   * Handles the mouse move event to resize the panels
   * @param {MouseEvent} e - The mouse event
   */
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !containerRef.current) return;

    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const offsetX =
      e.clientX - containerRef.current.getBoundingClientRect().left;
    const newSize = (offsetX / containerWidth) * 100;

    if (newSize >= 10 && newSize <= 90) {
      setSize(newSize);
    }
  };

  /**
   * Handles changes in the input code editor
   * @param {string} value - The entered code
   */
  const handleChangeInput = (value: string) => {
    setInputCode(value);
  };

  /**
   * Handles the "Beautify" button click
   */
  const handleBeautify = () => {
    try {
      const formatted = beautifyFunction(inputCode);
      setOutputCode(formatted);
    } catch (error: any) {
      toast.error("Error beautifying code: " + error.message);
    }
  };

  /**
   * Handles the "Minify" button click
   */
  const handleMinify = () => {
    try {
      const minified = minifyFunction(inputCode);
      setOutputCode(minified);
    } catch (error: any) {
      toast.error("Error minifying code: " + error.message);
    }
  };

  /**
   * Handles the "Clear" button click
   */
  const handleClear = () => {
    setInputCode("");
    setOutputCode("");
  };

  /**
   * Handles the "Sample" button click
   */
  const handleSample = () => {
    setInputCode(sampleCode);
    setOutputCode("");
  };

  /**
   * Handles the "Copy" button click
   */
  const handleCopy = async () => {
    try {
      if (outputCode) {
        await navigator.clipboard.writeText(outputCode);
        toast("Code copied to clipboard.");
      } else {
        toast.warn("Nothing to copy.");
      }
    } catch {
      toast.error("Failed to copy code to clipboard.");
    }
  };

  /**
   * Extensions and themes for CodeMirror
   */
  const editorTheme = useMemo(() => {
    return isDark ? "dark" : "light";
  }, [isDark]);

  const editorExtensions = useMemo(() => {
    return [languageExtension(), EditorView.lineWrapping];
  }, [languageExtension]);

  return (
    <div
      style={{
        height: "calc(100vh - 66px)", // Adjust '66px' according to your navbar height
        maxHeight: "calc(100vh - 66px)",
        display: "flex",
        flexDirection: "column",
        marginRight: 12,
        overflowY: "hidden",
      }}
    >
      {/* Action Buttons */}
      <div className="level" style={{ marginTop: 5, marginBottom: 5 }}>
        <div className="level-left">
          <button className="button is-small" onClick={handleBeautify}>
            Beautify
          </button>
          <button className="button is-small" onClick={handleMinify}>
            Minify
          </button>
          <button className="button is-small" onClick={handleClear}>
            Clear
          </button>
          <button className="button is-small" onClick={handleSample}>
            Sample
          </button>
        </div>
        <div className="level-right">
          <button className="button is-small" onClick={handleCopy}>
            Copy
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexGrow: 1,
          position: "relative",
          height: "calc(100vh - 75px)",
          maxHeight: "calc(100vh - 75px)",
          overflowY: "hidden",
        }}
      >
        {/* Left Panel: Input */}
        <div
          style={{
            width: `${size}%`,
            display: "flex",
            flexGrow: 1,
            height: "100%",
            overflowY: "auto",
          }}
        >
          {/* CodeMirror Editor for Input */}
          <CodeMirror
            value={inputCode}
            height="100%"
            width="100%"
            extensions={editorExtensions}
            onChange={handleChangeInput}
            theme={editorTheme}
            placeholder={inputPlaceholder}
            style={{
              flexGrow: 1,
              minWidth: "100%",
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          />
        </div>

        {/* Resizable Divider */}
        <div
          style={{
            width: 3,
            cursor: "col-resize",
            backgroundColor: "#ccc",
            marginLeft: 3,
            marginRight: 3,
            zIndex: 1,
          }}
          onMouseDown={handleMouseDown}
        >
          {" "}
        </div>

        {/* Right Panel: Output */}
        <div
          style={{
            width: `${100 - size}%`,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* CodeMirror Editor for Output */}
          <CodeMirror
            value={outputCode}
            height="100%"
            width="100%"
            extensions={editorExtensions}
            theme={editorTheme}
            editable={false}
            style={{
              flexGrow: 1,
              minWidth: "100%",
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Formatter;
