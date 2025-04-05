import React from "react";

const AdoptionStats = () => {
  let dogsAdaopted = 250;
  let dogsListed = 800;
  return (
    <div
      className="flex items-center justify-start min-h-screen text-white p-6 "
      style={{
        backgroundImage: "url('/images/bg-image.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className=" min-w-[40%] color-[white] p-8 rounded-lg text-center">
        <h2 className="text-[50px] font-semibold">
          Helping you adopt indies around you
        </h2>
        <div className="flex justify-center space-x-10 mt-6">
          <div>
            <p className="text-[38px] font-bold">{dogsAdaopted}</p>
            <p className="text-[38px]">dogs adopted</p>
          </div>
          <div>
            <p className="text-[38px] font-bold">{dogsListed}</p>
            <p className="text-[38px]">dogs listed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionStats;
