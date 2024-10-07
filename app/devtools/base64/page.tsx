// components/Base64ImageConverter.tsx

"use client";
import React, { useState, useRef } from "react";
import usePersistedState from "@/utils/usePersistedState";
import { GlobalStore, useGlobalStore } from "@/utils/useGlobalStore";
import { toast } from "react-toastify";
import { sample } from "./data";

/**
 * Base64ImageConverter Component
 *
 * This component provides a tool to encode images to Base64 strings and decode Base64 strings to images.
 * The layout includes two resizable panels and action buttons at the top.
 */
const Base64ImageConverter = () => {
  const isDark = useGlobalStore((state) => (state as GlobalStore).dark);

  // Persisted state for the size (width percentage) of the left panel
  const [size, setSize] = usePersistedState<number>(
    "base64ImageConverterSize",
    50
  );

  // State for the Base64 string
  const [base64String, setBase64String] = useState<string>("");

  // State for the image source (data URL)
  const [imageSrc, setImageSrc] = useState<string>("");

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
   * Handles changes in the Base64 textarea
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event
   */
  const handleBase64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBase64String(value);

    // Update the image preview
    if (value) {
      const testImageSrc = `data:image/*;base64,${value}`;
      // Test if the Base64 string is valid
      const img = new Image();
      img.onload = () => {
        setImageSrc(testImageSrc);
      };
      img.onerror = () => {
        setImageSrc("");
        toast.error("Invalid Base64 string.");
      };
      img.src = testImageSrc;
    } else {
      setImageSrc("");
    }
  };

  /**
   * Handles the image upload
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Extract Base64 string from data URL
        const base64 = result.split(",")[1];
        setBase64String(base64);
        setImageSrc(result);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handles the "Clear" button click
   */
  const handleClear = () => {
    setBase64String("");
    setImageSrc("");
  };

  /**
   * Handles the "Sample" button click
   */
  const handleSample = () => {
    // Load a sample image (data URL)
    const sampleImageUrl = `data:image/png;base64,${sample}`;
    const base64 = sampleImageUrl.split(",")[1];
    setBase64String(base64);
    setImageSrc(sampleImageUrl);
  };

  /**
   * Handles the "Copy Base64" button click
   */
  const handleCopy = async () => {
    try {
      if (base64String) {
        await navigator.clipboard.writeText(base64String);
        toast("Base64 string copied to clipboard.");
      } else {
        toast.warn("Nothing to copy.");
      }
    } catch {
      toast.error("Failed to copy Base64 string to clipboard.");
    }
  };

  /**
   * Handles the "Copy Image" button click
   */
  const handleCopyImage = async () => {
    try {
      if (!imageSrc) {
        toast.warn("No image to copy.");
        return;
      }
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const data = [new ClipboardItem({ [blob.type]: blob })];
      await navigator.clipboard.write(data);
      toast("Image copied to clipboard.");
    } catch {
      toast.error("Failed to copy image to clipboard.");
    }
  };

  /**
   * Handles the "Download Image" button click
   */
  const handleDownloadImage = () => {
    if (!imageSrc) {
      toast.warn("No image to download.");
      return;
    }

    // Extract the MIME type and base64 data
    const [prefix, base64Data] = imageSrc.split(",");
    const mimeMatch = prefix.match(/:(.*?);/);
    let mimeType = "image/png";
    if (mimeMatch && mimeMatch[1]) {
      mimeType = mimeMatch[1];
    }

    // Create a Blob from the base64 data
    const blob = b64toBlob(base64Data, mimeType);
    const url = URL.createObjectURL(blob);

    // Create a link and trigger download
    const link = document.createElement("a");
    link.href = url;
    const extension = mimeType.split("/")[1];
    link.download = `image.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  /**
   * Converts a Base64 string to a Blob
   * @param {string} b64Data - The Base64 string
   * @param {string} contentType - The MIME type
   * @returns {Blob} - The resulting Blob
   */
  const b64toBlob = (b64Data: string, contentType: string) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
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
      {/* Action Buttons */}
      <div className="level" style={{ marginTop: 5, marginBottom: 5 }}>
        <div className="level-left">
          <button className="button is-small" onClick={handleClear}>
            Clear
          </button>
          <button className="button is-small" onClick={handleSample}>
            Sample Image
          </button>
        </div>
        <div className="level-right">
          <button className="button is-small" onClick={handleCopy}>
            Copy Base64
          </button>
          <button className="button is-small" onClick={handleCopyImage}>
            Copy Image
          </button>
          <button className="button is-small" onClick={handleDownloadImage}>
            Download Image
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
        {/* Left Panel: Base64 String */}
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
            value={base64String}
            onChange={handleBase64Change}
            style={{
              flexGrow: 1,
              resize: "none",
              ...themeStyles,
              height: "100%",
              maxHeight: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflowY: "auto",
            }}
            placeholder="Paste your Base64 string here..."
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

        {/* Right Panel: Image Preview */}
        <div
          style={{
            width: `${100 - size}%`,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            ...themeStyles,
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <div
              style={{
                textAlign: "center",
                color: isDark ? "#d4d4d4" : "#000",
              }}
            >
              No image to display
            </div>
          )}
          <div style={{ marginTop: 10 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label className="button is-small" htmlFor="fileInput">
              Choose Image
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64ImageConverter;
