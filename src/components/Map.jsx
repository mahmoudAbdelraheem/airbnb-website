/* eslint-disable react/prop-types */
import { useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import MapUpdater from "./MapUpdater";

// Fix the leaflet icon issues with default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Component to handle user clicks and update marker position
function LocationMarker({ onLocationSelect, isLocationSelectable }) {
  const [position, setPosition] = useState(null);

  // Only allow click events if `isLocationSelectable` is true
  useMapEvents({
    click(e) {
      if (isLocationSelectable) {
        const latLng = e.latlng;
        setPosition(latLng);
        onLocationSelect(latLng);
      }
    },
  });

  return position === null ? null : <Marker position={position} />;
}

function Map({ center, onLocationSelect, isLocationSelectable }) {
  const defaultCenter = [51, -0.09];
  // Default center if no center provided

  return (
    <MapContainer
      center={center || defaultCenter}
      zoom={center ? 5 : 2}
      scrollWheelZoom={true}
      className="h-[500px] rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render Marker only if center is provided */}
      {center && Array.isArray(center) && center.length === 2 && (
        <Marker position={center} />
      )}

      {/* Pass the flag to LocationMarker */}
      <LocationMarker
        onLocationSelect={onLocationSelect}
        isLocationSelectable={isLocationSelectable}
      />
      <MapUpdater center={center} />
    </MapContainer>
  );
}

export default Map;
