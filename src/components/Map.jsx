/* eslint-disable react/prop-types */
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
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

function Map({ center }) {
  const defaultCenter = [51, -0.09]; // Default center if no center provided

  return (
    <MapContainer
      center={center || defaultCenter}
      zoom={center ? 5 : 2}
      scrollWheelZoom={false}
      className="h-[500px] rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render Marker only if center is provided and valid */}
      {center && Array.isArray(center) && center.length === 2 && (
        <Marker position={center} interactive className="bg-red-500" />
      )}
      <MapUpdater center={center} />
    </MapContainer>
  );
}

export default Map;
