import React, { useEffect } from "react";
import anise_seeds from "../assets/img/anise_seeds.jpg";
import pistachios from "../assets/img/pistachios.jpg";
import seed_pumpkin from "../assets/img/seed_pumpkin.jpg";
import green_seeding from "../assets/img/green_seeding.jpg";
import young_botanical from "../assets/img/young_botanical.jpg";
import healthy_natural from "../assets/img/healthy_natural.jpg";
import roots_generative from "../assets/img/roots_generative.jpg";
import roots_ground from "../assets/img/roots_ground.jpg";
import root from "../assets/img/root.jpg";

import AOS from "aos";
import "aos/dist/aos.css";

const SeedSection = () => {

    useEffect(() => {
        AOS.init({ duration: 1000, easing: "ease-in-out" });
    }, []);

    return (
        <div className="relative w-full  mt-16 bg-white rounded-lg shadow-md p-8">
            {/* Title */}
            <h1 className="text-4xl font-bold text-green-700 mb-6" data-aos="fade-up">Seed</h1>

            {/* Main Flex Container */}
            <div className="relative flex ml-[20%] flex-col lg:flex-row items-start lg:items-center gap-6">

                {/* Left - Seed Images */}
                <div className="relative flex flex-col gap-4" data-aos="fade-right">
                    <img
                        src={seed_pumpkin}
                        alt="Seeds 1"
                        className="w-44 h-52 object-cover rounded-md"
                    />
                    <img
                        src={pistachios}
                        alt="Seeds 2"
                        className="w-44 h-40 object-cover rounded-md"
                    />
                </div>

                {/* Middle - Anise Seeds Image (Larger & Centered) */}
                <div className="relative">
                    <img
                        src={anise_seeds}
                        alt="Seeds 3"
                        className="w-76 h-96 object-cover rounded-md"
                        data-aos="zoom-in"
                    />

                    {/* Overlapping Text Box (Positioned Above Image) */}
                    <div 
  className="relative lg:absolute lg:top-50 lg:left-70 transform lg:-translate-x-1/4 lg:-translate-y-1/3 p-10 rounded-md shadow-lg bg-white w-full sm:w-96 md:w-[28rem]" 
  data-aos="fade-left"
>
  <p className="text-lg font-bold">
    <strong>Package Duration:</strong> 3 Months
  </p>
  <p className="text-lg font-bold">
    <strong>Minimum Deposit:</strong> 1000
  </p>
  <p className="text-lg font-bold">
    <strong>Maximum Deposit:</strong> 10000
  </p>
  <p className="text-lg font-bold">
    <strong>Fixed Rewards:</strong> 6% of your deposit per annum
  </p>
  <p className="text-lg font-bold">
    <strong>Variable Rewards:</strong> Instant Referral Bonus up to 5%, Activity Rewards
  </p>
  <button 
    className="bg-black text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-800 transition"  
    data-aos="flip-up"
  >
    Get Started
  </button>
</div>

                </div>
            </div>

{/* Sprout Section */}
<h1 className="text-4xl font-bold text-green-700 mb-6 mt-20" data-aos="fade-up">Sprout</h1>

<div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mt-16 px-4 lg:px-20">
  {/* Left - Text Content */}
  <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left" data-aos="fade-left">
    <p className="text-lg font-bold"><strong>Package Duration:</strong> 6 Months</p>
    <p className="text-lg font-bold"><strong>Minimum Deposit:</strong> 20000</p>
    <p className="text-lg font-bold"><strong>Maximum Deposit:</strong> 40000</p>
    <p className="text-lg font-bold"><strong>Fixed Rewards:</strong> 8% of your deposit per annum</p>
    <p className="text-lg font-bold"><strong>Variable Rewards:</strong> Instant Referral Bonus up to 5%, Activity Rewards</p>
  </div>

  {/* Right - Images */}
  <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-4 justify-center">
    {/* Left Column - Two Stacked Images */}
    <div className="flex flex-col gap-4 " data-aos="fade-right">
      <img src={young_botanical} alt="Sprout 1" className="w-full sm:w-48 h-48 object-cover rounded-md" />
      <img src={green_seeding} alt="Sprout 2" className="w-full sm:w-48 h-48 object-cover rounded-md" />
    </div>

    {/* Right Column - One Large Image */}
    <div>
      <img src={healthy_natural} alt="Sprout 3" className="w-full sm:w-48 h-[400px] object-cover rounded-md"  data-aos="zoom-in"  />
    </div>
  </div>
</div>


<h1 className="text-4xl font-bold text-green-700 mb-6" data-aos="fade-up">Seed</h1>

{/* Main Flex Container */}
<div className="relative flex ml-[20%] flex-col lg:flex-row items-start lg:items-center gap-6">

    {/* Left - Seed Images */}
    <div className="relative flex flex-col gap-4" data-aos="fade-right">
        <img
            src={roots_generative}
            alt="Seeds 1"
            className="w-44 h-52 object-cover rounded-md"
        />
        <img
            src={root}
            alt="Seeds 2"
            className="w-44 h-40 object-cover rounded-md"
        />
    </div>

    {/* Middle - Anise Seeds Image (Larger & Centered) */}
    <div className="relative">
        <img
            src={roots_ground}
            alt="Seeds 3"
            className="w-76 h-96 object-cover rounded-md"
            data-aos="zoom-in"
        />

        {/* Overlapping Text Box (Positioned Above Image) */}
        <div 
className="relative lg:absolute lg:top-50 lg:left-70 transform lg:-translate-x-1/4 lg:-translate-y-1/3 p-10 rounded-md shadow-lg bg-white w-full sm:w-96 md:w-[28rem]" 
data-aos="fade-left"
>
<p className="text-lg font-bold">
<strong>Package Duration:</strong> 12 Months
</p>
<p className="text-lg font-bold">
<strong>Minimum Deposit:</strong> 50000
</p>

<p className="text-lg font-bold">
<strong>Fixed Rewards:</strong> 10% of your deposit per annum
</p>
<p className="text-lg font-bold">
<strong>Variable Rewards:</strong> Instant Referral Bonus up to 5%, Activity Rewards
</p>
<button 
className="bg-black text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-800 transition"  
data-aos="flip-up"
>
Get Started
</button>
</div>

    </div>
</div>
        </div>
    );
};

export default SeedSection;
