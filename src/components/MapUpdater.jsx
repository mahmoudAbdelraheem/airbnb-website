import React from "react";
import { useMap } from "react-leaflet";

export default function MapUpdater({ center }) {
  const map = useMap();

  if (center) {
    map.flyTo(center, 5, {
      duration: 1.5,
    });
  }

  return null;
}
