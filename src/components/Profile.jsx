import React from "react";
import { Link } from "react-router-dom";
import './Profile.css'

const Profile = () => {

  
  const dogType = [
    { name: "Brown", imageUrl: "./src/assets/Brown.jpg" },
    { name: "Black", imageUrl: "./src/assets/black.jpg" },
    { name: "other", imageUrl: "./src/assets/spotted-dog.jpg" }, 
    { name: "White", imageUrl: "./src/assets/white.jpg" },
    { name: "Brown and White", imageUrl: "./src/assets/brown-white.jpg" },
    { name: "Black and White", imageUrl: "./src/assets/black-white.jpg" }, 
    { name: "Blank", imageUrl: "./src/assets/blank.png" }, 
    
  ];
  return (
    <div className="min-h-screen bg-[#F7F6F1] p-6">
      
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center mb-6 text-blue-500 hover:text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="./images/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {" "}
                Vishwanath Gowda
              </h1>
              <p className="text-gray-600">Member since June 2023</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Dogs Listed</h3>
              <p className="text-3xl font-bold text-blue-500">3</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Contact Info</h3>
              <p className="text-gray-600">vishwanathgowda951@gmail.com</p>
              <p className="text-gray-600">7675719761</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">See all dogs on map</h3>
               
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Your Recent Listings
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {[1, 2, 3, 4, 5, 6,7].map((item, index) => (
                <div key={item} className="break-inside-avoid mb-4">
                  {/* Image container with gradient overlay */}
                  <div className="relative overflow-hidden rounded-lg group">
                    {/* Image */}
                    <img
                      src={dogType[index].imageUrl}
                      alt={`Dog ${item}`}
                      className="w-full h-auto object-cover"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>

                    {/* Text on gradient */}
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="font-bold text-lg">Dog {item}</h3>
                      <p className="text-sm">
                        {index % 2 === 0
                          ? "Found near park"
                          : "Lost in downtown"}
                      </p>
                    </div>
                  </div>

                   
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
