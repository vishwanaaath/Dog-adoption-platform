import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import "./MapView.css"; 

 
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
  iconUrl: "./images/dog6.svg",
  iconSize: [35, 35],
});

 
const MapView = () => {
  const [location, setLocation] = useState(null);
  const [dogLocations, setDogLocations] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [isContactAsked, setisContactAsked] = useState(false); 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = [pos.coords.latitude, pos.coords.longitude];
        setLocation(userLocation);
        setDogLocations(
          generateNearbyLocations(
            pos.coords.latitude,
            pos.coords.longitude,
            6,
            2000
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
 

  const handleSidebarLeave = (e) => {
    if (!e.relatedTarget?.closest(".sidebar-container, .edge-detector")) {
      setSidebarVisible(false);
    }
  };
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const dogType = [
    { name: "Brown", imageUrl: "./images/Brown.jpg" },
    { name: "Black", imageUrl: "./images/black.jpg" },
    { name: "White", imageUrl: "./images/white.jpg" },
    { name: "Brown and White", imageUrl: "./images/brown-white.jpg" },
    { name: "Black and White", imageUrl: "./images/black-white.jpg" },
    { name: "other", imageUrl: "./images/spotted-dog.jpg" },
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
          <img src="./images/left.svg" alt="" />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar-container fixed left-0 top-0 h-full w-[230px] bg-[#fff] shadow-xl transform transition-transform duration-300 z-[1001] ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        onMouseEnter={() => setSidebarVisible(true)}
        onMouseLeave={handleSidebarLeave}>
        <div className=" pt-3 pb-2 mr-8  flex justify-center items-center">
          <Link to="/profile" className="flex items-center space-x-4 group">
            <div className="flex items-center ">
              <div className="w-16 h-16 rounded-full  overflow-hidden">
                <img
                  src="./images/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex  flex-col justify-center">
              <p className="text-1xl font-bold group-hover:text-blue-500 transition">
                Your Profile
              </p>
              <p className="text-xs text-gray-500">3 dogs listed</p>
            </div>
          </Link>
        </div>

        <div className="p-6 h-full flex flex-col">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>
          <div className="space-y-6 flex-1 overflow-y-auto">
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Dog Color</h3>
              {/* Color Filter Dropdown */}
              <div className="relative">
                <button
                  className="w-full px-4 py-2 rounded-lg border border-gray-300  text-center mb-2"
                  onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}>
                  {selectedColor || "Choose Dog Type"}
                </button>

                {isColorDropdownOpen && (
                  <div className="  w-full  bg-[#F7F6F1] rounded-lg p-2">
                    <div className="flex overflow-x-scroll gap-2 pb-2">
                      {dogType.map((typeItem) => (
                        <div key={typeItem.name} className="flex-shrink-0 w-40">
                          <img
                            src={typeItem.imageUrl}
                            alt={typeItem.name}
                            title={typeItem.name}
                            className={`w-40 h-40 object-cover rounded-lg cursor-pointer border-2 ${
                              selectedColor === typeItem.name
                                ? "border-blue-400"
                                : "border-transparent"
                            } hover:border-blue-400`}
                            onClick={() => {
                              setSelectedColor(typeItem.name);
                            }}
                          />
                          <span className="block text-center mt-1 text-sm font-medium text-gray-700">
                            {typeItem.name}
                          </span>
                        </div>
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
          </div>
        </div>
      </div>

      {/* Map Container */}
      {location ? (
        <MapContainer
          onClick={() => console.log("clicked")}
          center={location}
          zoom={16}
          className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={location}>
            <Popup>You are here</Popup>
          </Marker>
          {dogLocations.map((dog, index) => (
            <Marker
              className="scaled-popup"
              key={index}
              position={[dog.lat, dog.lon]}
              icon={dogIcon}>
              <Popup>
                <img
                  className="p-1 rounded-2xl "
                  src={
                    dogType[index]?.imageUrl
                      ? dogType[index].imageUrl
                      : "./images/black.jpg"
                  }
                  alt=""
                />
                <div className="flex items-center     gap-3 p-2">
                  <span className="text-[14px] font-medium  text-blue-300 ">
                    {dog.name}
                  </span>

                  <a
                    href={`https://www.google.com/maps?q=${dog.lat},${dog.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                     
                     transition-opacity">
                    <img
                      className="w-[34px] h-[34px] pt-1.5"
                      src="./images/location.svg"
                      alt="Location"
                      title="Go to pinned Location"
                    />
                  </a>

                  <img
                    onClick={() => setisContactAsked(!isContactAsked)}
                    className="w-[25px] h-[25px] text-sm font-medium  text-blue-300    
                    transition-opacity"
                    src="./images/contact.svg"
                    alt="Contact"
                    title="Contact Lister"
                  />
                </div>

                {isContactAsked ? (
                  <div className="contact text-sm font-medium text-black-300 relative">
                    {showCopied && (
                      <div className="absolute -top-8 left-0 bg-gray-800 text-white px-2 py-1 rounded text-xs">
                        Copied!
                      </div>
                    )}
                    <div
                      className="email text-[14px] flex items-center gap-2 cursor-pointer  "
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "vishwanathgowda951@gmail.com"
                        );
                        setShowCopied(true);
                        setTimeout(() => setShowCopied(false), 2000);
                      }}>
                      vishwanathgowda951@gmail.com
                      <img
                        className="w-[15px] h-[15px] invert-50"
                        src="./images/copy.svg"
                        alt=""
                      />
                    </div>

                    <div
                      className="phone text-[14px] flex items-center gap-2 cursor-pointer  "
                      onClick={() => {
                        navigator.clipboard.writeText("7675719761");
                        setShowCopied(true);
                        setTimeout(() => setShowCopied(false), 2000);
                      }}>
                      7675719761
                      <img
                        className="w-[15px] h-[15px] invert-50"
                        src="./images/copy.svg"
                        alt=""
                      />
                    </div>
                  </div>
                ) : null}
              </Popup>
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
