// components/Converter.tsx

"use client";
import React, { useMemo, useState, useRef } from "react";
import usePersistedState from "@/utils/usePersistedState";
import { GlobalStore, useGlobalStore } from "@/utils/useGlobalStore";
import { toast } from "react-toastify";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";

/**
 * ConverterProps Interface
 *
 * Defines the props required by the Converter component.
 */
interface ConverterProps {
  language: string;
  leftLanguageExtension?: any;
  rightLanguageExtension?: any;
  leftToRight: (input: string) => string;
  rightToLeft: (input: string) => string;
  leftSample: string;
  rightSample: string;
  leftPlaceholder: string;
  rightPlaceholder: string;
}

/**
 * Converter Component
 *
 * A bidirectional converter component that provides conversion functionalities
 * between different formats in both directions.
 */
const Converter: React.FC<ConverterProps> = ({
  language,
  leftLanguageExtension,
  rightLanguageExtension,
  leftToRight,
  rightToLeft,
  leftSample,
  leftPlaceholder,
  rightPlaceholder,
}) => {
  const isDark = useGlobalStore((state) => (state as GlobalStore).dark);

  // Persisted state for the size (width percentage) of the left panel
  const [size, setSize] = usePersistedState<number>(
    `${language.toLowerCase()}ConverterSize`,
    50
  );

  // State for the left and right code
  const [leftCode, setLeftCode] = useState<string>("");
  const [rightCode, setRightCode] = useState<string>("");

  // State to track which editor was last changed
  const lastChangedRef = useRef<"left" | "right" | null>(null);

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
   * Handles changes in the left code editor
   * @param {string} value - The entered code
   */
  const handleChangeLeft = (value: string) => {
    setLeftCode(value);
    if (lastChangedRef.current === "right") return;
    lastChangedRef.current = "left";
    try {
      const converted = leftToRight(value);
      setRightCode(converted);
    } catch (error: any) {
      setRightCode("");
      toast.error("Error during conversion: " + error.message);
    }
    lastChangedRef.current = null;
  };

  /**
   * Handles changes in the right code editor
   * @param {string} value - The entered code
   */
  const handleChangeRight = (value: string) => {
    setRightCode(value);
    if (lastChangedRef.current === "left") return;
    lastChangedRef.current = "right";
    try {
      const converted = rightToLeft(value);
      setLeftCode(converted);
    } catch (error: any) {
      setLeftCode("");
      toast.error("Error during conversion: " + error.message);
    }
    lastChangedRef.current = null;
  };

  /**
   * Handles the "Swap" button click
   */
  const handleSwap = () => {
    const temp = leftCode;
    setLeftCode(rightCode);
    setRightCode(temp);
  };

  /**
   * Handles the "Clear" button click
   */
  const handleClear = () => {
    setLeftCode("");
    setRightCode("");
  };

  /**
   * Handles the "Sample" button click
   */
  const handleSample = () => {
    handleChangeLeft(leftSample);
  };

  /**
   * Handles the "Copy Left" button click
   */
  const handleCopyLeft = async () => {
    try {
      if (leftCode) {
        await navigator.clipboard.writeText(leftCode);
        toast("Left panel content copied to clipboard.");
      } else {
        toast.warn("Nothing to copy.");
      }
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  /**
   * Handles the "Copy Right" button click
   */
  const handleCopyRight = async () => {
    try {
      if (rightCode) {
        await navigator.clipboard.writeText(rightCode);
        toast("Right panel content copied to clipboard.");
      } else {
        toast.warn("Nothing to copy.");
      }
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  /**
   * Extensions and themes for CodeMirror
   */
  const editorTheme = useMemo(() => {
    return isDark ? "dark" : "light";
  }, [isDark]);

  const leftExtensions = useMemo(() => {
    if (!leftLanguageExtension) return [EditorView.lineWrapping];
    return [leftLanguageExtension(), EditorView.lineWrapping];
  }, [leftLanguageExtension]);

  const rightExtensions = useMemo(() => {
    if (!rightLanguageExtension) return [EditorView.lineWrapping];
    return [rightLanguageExtension(), EditorView.lineWrapping];
  }, [rightLanguageExtension]);

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
          <button className="button is-small" onClick={handleSwap}>
            Swap
          </button>
          <button className="button is-small" onClick={handleClear}>
            Clear
          </button>
          <button className="button is-small" onClick={handleSample}>
            Sample
          </button>
        </div>
        <div className="level-right">
          <button className="button is-small" onClick={handleCopyLeft}>
            Copy Left
          </button>
          <button className="button is-small" onClick={handleCopyRight}>
            Copy Right
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
        {/* Left Panel */}
        <div
          style={{
            width: `${size}%`,
            display: "flex",
            flexGrow: 1,
            height: "100%",
            overflowY: "auto",
          }}
        >
          {/* CodeMirror Editor for Left Panel */}
          <CodeMirror
            value={leftCode}
            height="100%"
            width="100%"
            extensions={leftExtensions}
            onChange={handleChangeLeft}
            theme={editorTheme}
            placeholder={leftPlaceholder}
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

        {/* Right Panel */}
        <div
          style={{
            width: `${100 - size}%`,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowY: "auto",
          }}
        >
          {/* CodeMirror Editor for Right Panel */}
          <CodeMirror
            value={rightCode}
            height="100%"
            width="100%"
            extensions={rightExtensions}
            onChange={handleChangeRight}
            theme={editorTheme}
            placeholder={rightPlaceholder}
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

export default Converter;
