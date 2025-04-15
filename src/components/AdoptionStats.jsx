import React from "react";
import { Link } from "react-router-dom"; 

const AdoptionStats = () => {
  let dogsAdopted = 250;
  let dogsListed = 800;

  return (
    <div
      className="flex flex-col items-start justify-center min-h-screen text-white p-6 mobile-bg"
      style={{
        backgroundImage: "url('/src/assets/bg-image.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="w-full max-w-4xl text-center">
        <h2 className="text-5xl font-semibold mb-8">
          Helping you adopt indies around you
        </h2>
        <div className="flex justify-center space-x-16 mb-12">
          <div>
            <p className="text-4xl font-bold">{dogsAdopted}</p>
            <p className="text-3xl">dogs adopted</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{dogsListed}</p>
            <p className="text-3xl">dogs listed</p>
          </div>
        </div>
        <div className="flex flex-col space-y-6 w-full max-w-md mx-auto">
          <Link
            to="/map"
            className="border border-white text-white backdrop-blur-sm text-2xl py-4 px-8 rounded-lg transition-colors duration-200">
            Find Dogs to Adopt
          </Link>
          <Link
            to="/list-dog"
            className="border border-white backdrop-blur-sm text-white text-2xl py-4 px-8 rounded-lg transition-colors duration-200">
            List a Dog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdoptionStats;
