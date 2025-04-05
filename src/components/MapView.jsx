import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom dog icon
const dogIcon = new L.Icon({
  iconUrl: "./src/images/marker.svg",
  iconSize: [45, 45],
});

const MapView = () => {
  const [location, setLocation] = useState(null);
  const [dogLocations, setDogLocations] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = [pos.coords.latitude, pos.coords.longitude];
        setLocation(userLocation);

        // Generate random nearby locations
        const generatedLocations = generateNearbyLocations(
          pos.coords.latitude,
          pos.coords.longitude,
          10, // Number of locations
          5000 // 5km radius
        );
        setDogLocations(generatedLocations);
      },
      (err) => {
        console.error("Error getting location:", err);
      }
    );
  }, []);

  // Generate random locations within radius
  const generateNearbyLocations = (lat, lon, count, radiusMeters) => {
    const locations = [];
    for (let i = 0; i < count; i++) {
      // Convert radius to degrees (approximate)
      const radius = Math.sqrt(Math.random()) * radiusMeters;
      const angle = Math.random() * 2 * Math.PI;

      // Calculate offsets
      const dLat = (radius * Math.sin(angle)) / 999000; // 111,000 meters per degree
      const dLon =
        (radius * Math.cos(angle)) / (111000 * Math.cos((lat * Math.PI) / 180));

      locations.push({
        lat: lat + dLat,
        lon: lon + dLon,
        name: `Dog spotted nearby (${Math.round(radius)}m away)`,
      });
    }
    return locations;
  };

  return (
    <div
      className="w-screen flex flex-wrap items-center pb-[50px] overflow-y-hidden
 justify-center bg-[#38B6FF] h-[98vh]">
      <h3
        className="w-screen text-center overflow-y-hidden  
 text-white text-[45px] font-bold pb-4 ">
        Find dogs near you
      </h3>
      {location ? (
        <MapContainer
          center={location}
          zoom={15}
          className="w-[90vw] h-[82vh] overflow-y-hidden
">
          <TileLayer
            // url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={location}>
            <Popup>You are here</Popup>
          </Marker>

          {dogLocations.map((dog, index) => (
            <Marker key={index} position={[dog.lat, dog.lon]} icon={dogIcon}>
              <Popup>{dog.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p
          className="text-white overflow-y-hidden
 text-center ">
          Fetching location...
        </p>
      )}
    </div>
  );
};

export default MapView;
