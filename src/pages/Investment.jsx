import React, { useEffect, useRef } from "react";
import plant_grow from "../assets/img/plant_grow.jpg";
import SeedSection from "./SeedSection";

import AOS from "aos";
import "aos/dist/aos.css";

const Investment = () => {
  const seedRef = useRef(null); // Reference for SeedSection

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  // Function to scroll to SeedSection
  const scrollToSeedSection = () => {
    if (seedRef.current) {
      seedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full sm:w-[100%] mt-26 md:mt-20 lg:mt-26 items-center">
      <div className="bg-green-200 min-h-screen rounded-b-4xl p-5">
        <div className="flex flex-col md:flex-row items-center relative">
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
              Your Investment <br /> Will Grow up to
              <span className="text-green-700"> Modernly Tradition</span>
            </h1>
            <h2 className="text-3xl font-bold text-green-900">
              15% of deposit per <br /> Annum
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              The mission of UlavTech is to distribute natural products with utmost freshness and quality.
              Let’s join our hands together to support farmers.
            </p>

            {/* Know More Button */}
            <button 
              className="text-white bg-black border border-black px-4 w-[120px] py-2 rounded-md text-sm cursor-pointer"
              onClick={scrollToSeedSection} // Scroll Function
            >
              Know More
            </button>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex md:justify-end mt-6 md:mt-0 relative">
            <img 
              src={plant_grow} 
              alt="Fruits" 
              className="absolute w-full md:w-full h-full md:h-[800px] object-cover rounded-lg lg:mt-50 md:mt-10 md:top-[-160px]" 
              data-aos="fade-down" 
            />
          </div>
        </div>
      </div>

      {/* Seed Section with Ref */}
      <div ref={seedRef}>
        <SeedSection />
      </div>
    </div>
  );
};

export default Investment;
