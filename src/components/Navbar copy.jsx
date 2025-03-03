import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-green-200 shadow-md h-30">
      <div className="flex justify-between items-center p-2 md:px-12">
        {/* Logo Section */}
        <a href="/" className="flex items-center ">
  <img src={logo} alt="UlavTech Logo" className="w-30 h-30 mr-[-30px]" />
  <span className="text-3xl font-bold text-green-700">UlavTech</span>
</a>


        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About Us</a>
          <a href="/investment" className="nav-link">Investment</a>
          <a href="/project" className="nav-link">Project</a>
          <a href="/gallery" className="nav-link">Gallery</a>
          <a href="/contactus" className="nav-link">Contact Us</a>
        </nav>

        {/* Sign In & Sign Up Buttons */}
        <div className="hidden lg:flex gap-4 text-white ">
          <button 
            onClick={() => navigate("/signin")} 
            className="w-30 p-3 bg-black text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition">
            Sign In
          </button>
          <button 
            onClick={() => navigate("/register")} 
            className="w-30 p-3 bg-black text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden mr-20">
          {menuOpen ? (
            <AiOutlineClose size={25} onClick={toggleMenu} />
          ) : (
            <AiOutlineMenu size={25} onClick={toggleMenu} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden fixed inset-0 bg-green-100 text-black transition-transform duration-300`}
      >
         <div className="absolute top-5 right-5">
    <AiOutlineClose size={25} onClick={toggleMenu} />
  </div>
        <div className="flex flex-col items-center space-y-6 pt-16 text-xl font-semibold">
          <a href="/" className="mobile-link" onClick={closeMenu}>Home</a>
          <a href="/about" className="mobile-link" onClick={closeMenu}>About Us</a>
          <a href="/investment" className="mobile-link" onClick={closeMenu}>Investment</a>
          <a href="/project" className="mobile-link" onClick={closeMenu}>Project</a>
          <a href="/gallery" className="mobile-link" onClick={closeMenu}>Gallery</a>
          <a href="/contactus" className="mobile-link" onClick={closeMenu}>Contact Us</a>

          {/* Sign In & Sign Up Buttons (Mobile) */}
          <div className="flex gap-4"> 
  <button 
    onClick={() => {
      navigate("/signin");
      closeMenu();
    }} 
    className="w-30 p-3 bg-black text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition">
    Sign In
  </button>
  <button 
    onClick={() => {
      navigate("/register");
      closeMenu();
    }} 
    className="w-30 p-3 bg-black text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition">
    Sign Up
  </button>
</div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
