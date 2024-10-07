// components/JWTDebugger.tsx

"use client";
import React, { useState, useRef } from "react";
import usePersistedState from "@/utils/usePersistedState";
import { GlobalStore, useGlobalStore } from "@/utils/useGlobalStore";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";

/**
 * JWTDebugger Component
 *
 * This component provides a tool to decode and verify JWT tokens.
 * The layout includes two resizable panels and sections for header, payload, and signature.
 */
const JWTDebugger = () => {
  const isDark = useGlobalStore((state) => (state as GlobalStore).dark);

  // Persisted state for the size (width percentage) of the left panel
  const [size, setSize] = usePersistedState<number>("jwtDebuggerSize", 50);

  // State variables
  const [jwtToken, setJwtToken] = useState<string>("");
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [signature, setSignature] = useState<string>("");
  const [algorithm, setAlgorithm] = useState<string>("HS256");
  const [secretOrKey, setSecretOrKey] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<string>("");

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
   * Handles changes in the JWT token input
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event
   */
  const handleJWTChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const token = e.target.value;
    setJwtToken(token);

    if (token) {
      try {
        const decodedHeader = jwtDecode(token, { header: true });
        const decodedPayload = jwtDecode(token);

        setHeader(decodedHeader);
        setPayload(decodedPayload);

        const parts = token.split(".");
        setSignature(parts[2] || "");
      } catch {
        setHeader(null);
        setPayload(null);
        setSignature("");
        toast.error("Invalid JWT token.");
      }
    } else {
      setHeader(null);
      setPayload(null);
      setSignature("");
    }
    setVerificationResult("");
  };

  /**
   * Handles the algorithm change
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event
   */
  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value);
    setVerificationResult("");
  };

  /**
   * Handles the secret or key input change
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleSecretOrKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecretOrKey(e.target.value);
    setVerificationResult("");
  };

  /**
   * Handles copying text to the clipboard
   * @param {string} text - The text to copy
   */
  const handleCopy = async (text: string) => {
    try {
      if (text) {
        await navigator.clipboard.writeText(text);
        toast("Copied to clipboard.");
      } else {
        toast.warn("Nothing to copy.");
      }
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  /**
   * Handles verifying the JWT signature
   */
  const handleVerifySignature = () => {
    if (!jwtToken) {
      toast.warn("Please enter a JWT token.");
      return;
    }
    if (!secretOrKey) {
      toast.warn("Please enter the secret or key.");
      return;
    }

    try {
      jwt.verify(jwtToken, secretOrKey, { algorithms: [algorithm] });
      setVerificationResult("Signature is valid.");
    } catch (error) {
      setVerificationResult("Signature is invalid.");
    }
  };

  /**
   * Theming styles based on the dark mode
   */
  const themeStyles = {
    backgroundColor: isDark ? "#1e1e1e" : "#fff",
    color: isDark ? "#d4d4d4" : "#000",
  };

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
        {/* Left Panel: JWT Input */}
        <div
          style={{
            width: `${size}%`,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <textarea
            className="textarea"
            value={jwtToken}
            onChange={handleJWTChange}
            style={{
              flexGrow: 1,
              resize: "none",
              ...themeStyles,
              height: "100%",
              maxHeight: "100%",
              overflowY: "auto",
            }}
            placeholder="Paste your JWT token here..."
          ></textarea>
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
        ></div>

        {/* Right Panel: Decoded Sections */}
        <div
          style={{
            width: `${100 - size}%`,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowY: "auto",
            padding: 10,
            ...themeStyles,
          }}
        >
          {/* Header Section */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2 className="subtitle">Header</h2>
              <button
                className="button is-small"
                style={{ marginLeft: "auto" }}
                onClick={() => handleCopy(JSON.stringify(header, null, 2))}
              >
                Copy
              </button>
            </div>
            <textarea
              className="textarea"
              value={header ? JSON.stringify(header, null, 2) : ""}
              readOnly
              style={{
                ...themeStyles,
                resize: "none",
                height: "100px",
              }}
            ></textarea>
            <div style={{ marginTop: 10 }}>
              <label className="label">Algorithm</label>
              <div className="select is-fullwidth">
                <select value={algorithm} onChange={handleAlgorithmChange}>
                  <option value="HS256">HS256</option>
                  <option value="HS384">HS384</option>
                  <option value="HS512">HS512</option>
                  <option value="RS256">RS256</option>
                  <option value="RS384">RS384</option>
                  <option value="RS512">RS512</option>
                  {/* Add more algorithms as needed */}
                </select>
              </div>
            </div>
          </div>

          {/* Payload Section */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2 className="subtitle">Payload</h2>
              <button
                className="button is-small"
                style={{ marginLeft: "auto" }}
                onClick={() => handleCopy(JSON.stringify(payload, null, 2))}
              >
                Copy
              </button>
            </div>
            <textarea
              className="textarea"
              value={payload ? JSON.stringify(payload, null, 2) : ""}
              readOnly
              style={{
                ...themeStyles,
                resize: "none",
                height: "150px",
              }}
            ></textarea>
          </div>

          {/* Signature Section */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2 className="subtitle">Signature</h2>
              <button
                className="button is-small"
                style={{ marginLeft: "auto" }}
                onClick={() => handleCopy(signature)}
              >
                Copy
              </button>
            </div>
            <input
              className="input"
              type="text"
              value={signature}
              readOnly
              style={{
                ...themeStyles,
              }}
            />
            <div style={{ marginTop: 10 }}>
              <label className="label">Secret or Key</label>
              <input
                className="input"
                type="text"
                value={secretOrKey}
                onChange={handleSecretOrKeyChange}
                placeholder="Enter the secret or key for verification"
                style={{
                  ...themeStyles,
                }}
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <button
                className="button is-small"
                onClick={handleVerifySignature}
              >
                Verify Signature
              </button>
              {verificationResult && (
                <span
                  style={{
                    marginLeft: 10,
                    color: verificationResult.includes("valid")
                      ? "green"
                      : "red",
                  }}
                >
                  {verificationResult}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JWTDebugger;
