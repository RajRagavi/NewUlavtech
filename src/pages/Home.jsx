import React from 'react';
import icon from "../assets/img/icon.png";
import dollar from "../assets/img/dollar.png";
import Investments from "../assets/img/Investments.png";
import chartImage from "../assets/img/Image.png";
import Farming from "../assets/img/Farming.jpg";
import green from "../assets/img/green.jpeg";
import { PiUserCheckThin } from "react-icons/pi";
import { HiOutlineRefresh } from "react-icons/hi";
import { FaSeedling } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { HiReceiptPercent } from "react-icons/hi2";

const containerData = [
  { id: 1, img: icon, title: "Affordable Plans", description: "Effective way to put your money to work and potentially build wealth for your future with us." },
  { id: 2, img: dollar, title: "Smart Savings", description: "Maximize your earnings with our innovative referrel schemes tailored for growth." },
  { id: 3, img: Investments, title: "Secure Future", description: "Plan ahead with confidence and secure financial stability with our trusted environment." },
];

const InvestmentProcess = [
  {
    step: "Step 1",
    title: "SIGNUP & COMPLETE KYC",
    description: "Being by registering on our platform and completing the KYC process, ensuring compliance and security for your investments.",
    icon: <PiUserCheckThin />,
  },
  {
    step: "Step 2",
    title: "SELECT A PROJECT & INVEST",
    description: "Stay informed about your investment journey by tracking project progress and monitoring your portfolio regularly.",
    icon: <FaSeedling />,
  },
  {
    step: "Step 3",
    title: "TRACK YOUR INVESTMENT",
    description: "Stay informed about your investment journey by tracking project progress and monitoring your portfolio regularly.",
    icon: <HiOutlineRefresh />,
  },
  {
    step: "Step 4",
    title: "EARN TAX FREE RETURNS",
    description: "Enjoy the benefits of tax-free returns on your investment, making your earnings even more rewarding.",
    icon: <HiReceiptPercent />,
  },
];

const Home = () => {
  return (
    <div className="mt-26 md:mt-10 lg:mt-26">  

    
<div className="bg-green-200 min-h-screen rounded-b-4xl p-5 lg:px-20">
  <div className="flex flex-col md:flex-row items-center relative max-w-screen-xl mx-auto">
    
    {/* Left Content */}
    <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
        UlavTech <br /> A New Evolution to <br /> Agri Industry <br />
        <span className="text-green-700">Modernly Tradition</span>
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-700">
        The Mission of UlavTech is to distribute the natural products with utmost freshness and quality. 
        Let's join our hands together to raise the Farmers.
      </p>
     
      <button className="text-white bg-black border border-black px-6 py-3 rounded-md text-lg cursor-pointer">
        Get Started
      </button>

      {/* Image Below Button */}
      <div className="absolute lg:mt-0 flex justify-center md:justify-start hidden md:block">
        <img src={chartImage} alt="Chart" 
          className="bg-white rounded-lg h-full w-48 md:h-60 md:w-60 lg:h-72 lg:w-72" />
      </div>
    </div>

    {/* Right Image */}
    <div className="w-full md:w-1/2 flex md:justify-end mt-6 md:mt-0 relative">
    <img src={green} alt="Fruits" 
    className="absolute w-full md:w-[100%] lg:w-[100%] h-full md:h-[500px] object-cover rounded-lg lg:mt-0 md:mt-10 md:top-[-10px]" />

    </div>





  </div>
</div>


     
       {/* Features Section */}
       <div className="py-16 text-center pt-40">
        <h2 className='text-3xl font-bold text-green-700'>Why Invest in UlavTech?</h2>
        <p className='text-lg text-gray-600 max-w-4xl mx-auto mt-4'>
          Agriculture is the backbone of human civilization. We aim to modernize farming while preserving its essence.
        </p>
        <div className='grid md:grid-cols-3 gap-8 mt-12 px-6 md:px-20'>
          {containerData.map((item) => (
            <div key={item.id} className='bg-white p-6 rounded-lg shadow-lg text-center hover:scale-105 transition'>
              <img src={item.img} alt={item.title} className='w-20 mx-auto' />
              <h3 className='text-xl font-semibold mt-4'>{item.title}</h3>
              <p className='text-gray-600 mt-2'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Process */}
      <div className="bg-gray-100 py-16 text-center">
      {/* Section Heading */}
      <h2 className="text-3xl font-bold text-black">Simplified Investment Process</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-2">
        Embark on your Investment journey with our easy and secure platform today
      </p>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 px-6 md:px-20">
        {InvestmentProcess.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Circular Icon Background */}
            <div className="bg-gray-300 w-54 h-54 flex items-center justify-center rounded-full text-8xl text-black">
              {item.icon}
            </div>

            {/* Step Text */}
            <p className="text-green-700 font-semibold mt-4">{item.step}</p>

            {/* Title */}
            <h3 className="text-lg font-bold mt-2">{item.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm text-center mt-2 px-4">{item.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* AgricultureSection */}
    <section className="bg-white px-6 py-12 md:py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Images Section */}
        <div className="flex gap-4">
         
          <img
            src={Farming}
            alt="Farming 2"
            className="w-full rounded-lg "
          />
        </div>

        {/* Text Content Section */}
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ulavtech Technology Farm
          </h2>
          <p className="text-gray-700 mb-4">
            Having recognized the importance of investing in the Agricultural
            industry, Ulavtech introduced various high-tech developments to
            assist farming processes, improving efficiency and productivity.
          </p>
          <p className="text-gray-700 mb-4">
            Agriculture has always been the backbone of human civilization. Today,
            it’s more than just a necessity—it’s a lucrative investment opportunity.
          </p>
          <p className="text-gray-700 mb-6">
            Agricultural investments offer diversification in an investor’s
            portfolio, reducing risks compared to volatile markets.
          </p>
          <button className="!bg-black text-white !w-[120px] px-6 py-3 rounded-lg font-semibold">
            Get Started
          </button>
        </div>
      </div>
    </section>

    <section className="bg-gray-100 py-12 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Top Green Line */}
        <div className="w-30 h-1 bg-green-600 mx-auto mb-2"></div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold">
          STAY <span className="text-green-600">UPDATED</span>
        </h2>

        {/* Description with Links */}
        <p className="text-gray-700 mt-3 text-lg">
          Like our{" "}
          <a
            href="https://www.facebook.com/"
            className="text-green-600 font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>{" "}
          page and check out our{" "}
          <a
            href="https://www.instagram.com/"
            className="text-green-600 font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>{" "}
          feed.
        </p>
      </div>
    </section>

    </div>
  
  )
}

export default Home
