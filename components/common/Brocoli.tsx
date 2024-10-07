"use client";
import React from "react";
import SingleTooltip from "./SingleTooltip";

function Brocoli() {
  return (
    <SingleTooltip
      place="bottom-start"
      id="brocoli"
      text="Love this tools? Buy me a brocoli to thank me!"
    >
      <a
        href="https://buymeacoffee.com/mexar"
        target="_blank"
        data-tooltip-id="brocoli"
        className="button"
      >
        🥦
      </a>
    </SingleTooltip>
  );
}

export default Brocoli;
