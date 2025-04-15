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

const dogIcon = new L.Icon({
  iconUrl: "/src/assets/marker.svg",
  iconSize: [55, 55],
});

const MapView = () => {
  const [location, setLocation] = useState(null);
  const [dogLocations, setDogLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = [pos.coords.latitude, pos.coords.longitude];
        setLocation(userLocation);
        setDogLocations(
          generateNearbyLocations(
            pos.coords.latitude,
            pos.coords.longitude,
            10,
            5000
          )
        );
      },
      (err) => console.error("Error getting location:", err)
    );
  }, []);

  const generateNearbyLocations = (lat, lon, count, radiusMeters) => {
    const locations = [];
    for (let i = 0; i < count; i++) {
      const radius = Math.sqrt(Math.random()) * radiusMeters;
      const angle = Math.random() * 2 * Math.PI;
      const dLat = (radius * Math.sin(angle)) / 999000;
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

  // const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleSidebarLeave = (e) => {
    if (!e.relatedTarget?.closest(".sidebar-container, .edge-detector")) {
      setSidebarVisible(false);
    }
  };
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const dogColors = [
    { name: "Brown", imageUrl: "./src/assets/Brown.jpg" },
    { name: "Black", imageUrl: "./src/assets/black.jpg" },
    { name: "White", imageUrl: "./src/assets/white.jpg" },
    { name: "Brown and White", imageUrl: "./src/assets/brown-white.jpg" },
    { name: "Black and White", imageUrl: "./src/assets/black-white.jpg" },
    { name: "other", imageUrl: "/path/to/spotted-dog.jpg" }, 
  ];

  return (
    <div className="relative w-screen h-screen  bg-[#F7F6F1]">
      {/* Left edge detection zone with indicator */}
      <div
        className="edge-detector fixed left-0 top-0 h-full w-4 z-[1000] transition-all duration-200"
        onMouseEnter={() => setSidebarVisible(true)}
        onMouseLeave={handleSidebarLeave}>
        <div
          className={`absolute top-1/2 -translate-y-1/2 left-1 w-8 h-8 invert-50 rounded-lg   flex items-center justify-center cursor-pointer  transition-all duration-300 ${
            sidebarVisible
              ? "opacity-0 -translate-x-8"
              : "opacity-100 translate-x-2 hover:translate-x-3"
          }`}>
          <img src=".\src\assets\left.svg" alt="" />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar-container fixed left-0 top-0 h-full w-[230px] bg-[#F7F6F1] shadow-xl transform transition-transform duration-300 z-[1001] ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        onMouseEnter={() => setSidebarVisible(true)}
        onMouseLeave={handleSidebarLeave}>
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>
          <div className="space-y-6 flex-1 overflow-y-auto">
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Dog Color</h3>
              {/* Color Filter Dropdown */}
              <div className="relative">
                <button
                  className="w-full px-4 py-2 rounded-lg border border-gray-300  text-center mb-2"
                  onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}>
                  {selectedColor || "Choose Dog Color"}
                </button>

                {isColorDropdownOpen && (
                  <div className="  w-full  bg-[#F7F6F1] rounded-lg p-2">
                    {/* Replace these divs with actual img tags */}
                    <div className="flex overflow-x-scroll gap-2 pb-2">
                      {dogColors.map((color) => (
                        <img
                          key={color.name}
                          src={color.imageUrl}
                          alt={color.name}
                          title={color.name}
                          className={`flex-shrink-0 w-40 h-40 object-cover rounded-lg cursor-pointer border-2 ${
                            selectedColor === color.name
                              ? "border-blue-400"
                              : "border-transparent"
                          } hover:border-blue-400`}
                          onClick={() => setSelectedColor(color.name)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Distance</h3>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2  ">
                <option>Within 1km</option>
                <option>Within 5km</option>
                <option>Within 10km</option>
                <option>No Limit</option>
              </select>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Last Seen</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Last 24 hours
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Last week
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {/* <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1002] w-full max-w-xl px-4  ">
        <input
          type="text"
          placeholder="Search area or dog breed..."
          className="w-full px-6 py-3 rounded-full shadow-xl border-2  border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div> */}

      {/* Map Container */}
      {location ? (
        <MapContainer center={location} zoom={15} className="w-full h-full">
          <TileLayer
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
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-xl text-gray-600">Fetching location...</p>
        </div>
      )}
    </div>
  );
};

export default MapView;
