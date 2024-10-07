"use client";
import { TOOLTIP_ID } from "@/data/constants";
import React from "react";
import { PlacesType, Tooltip } from "react-tooltip";

function SingleTooltip({
  children,
  place = "bottom",
  text,
  id,
}: {
  children: React.ReactNode;
  place: PlacesType;
  text: string;
  id: string;
}) {
  return (
    <>
      {children}
      <Tooltip place={place} id={id}>
        <span>{text}</span>
      </Tooltip>
    </>
  );
}

export default SingleTooltip;
