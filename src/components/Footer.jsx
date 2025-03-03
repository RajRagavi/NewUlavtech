import React from 'react';
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "../assets/img/logo.png";

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Top Tamil Quote Section */}
      <div className="flex items-center justify-center min-h-32 bg-gradient-to-r from-green-800 to-gray-900">
        <div className="text-white text-xl font-bold p-6 text-center">
          <p>உழுதுண்டு வாழ்வாரே வாழ்வார்மற் றெல்லாம் <br /> தொழுதுண்டு பின்செல் பவர்</p>
        </div>
      </div>

      {/* Footer Main Content */}
      <div className="bg-gray-300 text-black py-8 w-full">
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 ">
        
        {/* Logo Section */}
        <div className="flex items-center   ml-[-60px] "> 
  <img src={logo} alt="UlavTech Logo" className="w-[200px] h-[200px] object-contain  mr-[-50px] " />
  <span className="text-4xl font-bold text-green-700">UlavTech</span>
</div>



        {/* Links Section */}
        <div className="p-6 ml-5 text-center sm:text-left">
          <h3 className="text-lg font-bold mb-2">Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-green-700">About</a></li>
            <li><a href="#" className="hover:text-green-700">Careers</a></li>
            <li><a href="#" className="hover:text-green-700">Why us?</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="p-6 text-center sm:text-left">
          <h3 className="text-lg font-bold mb-2">Support</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-green-700">Help/FAQ</a></li>
            <li><a href="#" className="hover:text-green-700">Press</a></li>
            <li><a href="#" className="hover:text-green-700">Contact us</a></li>
          </ul>
        </div>

        {/* Connect Section */}
        <div className="p-6 text-center sm:text-left">
          <h3 className="text-lg font-bold mb-2">Connect</h3>
          <p>
            6/683/7/3, CHOLAN STREET, <br />
            LAKSHMINAGAR, VIRUDHUNAGAR - 626001
          </p>
        </div>

        {/* Follow Section */}
        <div className="p-6 text-center sm:text-left">
          <h3 className="text-lg font-bold mb-2">Follow</h3>
          <div className="flex justify-center sm:justify-start space-x-4 text-green-700">
            <a href="#" className="hover:text-green-900"><FaWhatsapp size={20} /></a>
            <a href="#" className="hover:text-green-900"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-green-900"><FaInstagram size={20} /></a>
          </div>
        </div>

      </div>
    </div>
    </footer>
  );
};

export default Footer;
