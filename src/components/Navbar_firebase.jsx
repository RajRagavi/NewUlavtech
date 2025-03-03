import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Listen for authentication state changes
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-green-200 shadow-md h-20">
      <div className="flex justify-between items-center p-2 md:px-12">
        {/* Logo Section */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="UlavTech Logo" className="w-12 h-12 mr-2" />
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

        {/* Sign In & Sign Up OR Profile Dropdown */}
        <div className="hidden lg:flex gap-4 text-white">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 bg-gray-800 text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition"
              >
                <img src={user.photoURL || "/default-user.png"} alt="User" className="w-8 h-8 rounded-full" />
                <span>{user.displayName || "User"}</span>
                <IoIosArrowDown />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2">
                  <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                  <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => navigate("/signin")} className="p-3 bg-black text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition">
                Sign In
              </button>
              <button onClick={() => navigate("/register")} className="p-3 bg-black text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition">
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden mr-5">
          {menuOpen ? (
            <AiOutlineClose size={25} onClick={() => setMenuOpen(false)} />
          ) : (
            <AiOutlineMenu size={25} onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 bg-green-100 text-black transition-transform duration-300 p-5">
          <div className="absolute top-5 right-5">
            <AiOutlineClose size={25} onClick={() => setMenuOpen(false)} />
          </div>
          <div className="flex flex-col items-center space-y-6 pt-16 text-xl font-semibold">
            <a href="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>About Us</a>
            <a href="/investment" className="mobile-link" onClick={() => setMenuOpen(false)}>Investment</a>
            <a href="/project" className="mobile-link" onClick={() => setMenuOpen(false)}>Project</a>
            <a href="/gallery" className="mobile-link" onClick={() => setMenuOpen(false)}>Gallery</a>
            <a href="/contactus" className="mobile-link" onClick={() => setMenuOpen(false)}>Contact Us</a>

            {/* Mobile Sign In & Sign Up OR Profile Dropdown */}
            {user ? (
              <div className="text-center">
                <img src={user.photoURL || "/default-user.png"} alt="User" className="w-12 h-12 rounded-full mx-auto mb-2" />
                <p className="text-lg font-semibold">{user.displayName || "User"}</p>
                <a href="/profile" className="block mt-2 text-blue-600 hover:underline">Profile</a>
                <a href="/dashboard" className="block mt-2 text-blue-600 hover:underline">Dashboard</a>
                <button onClick={handleLogout} className="mt-2 text-red-600 hover:underline">Logout</button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <button onClick={() => navigate("/signin")} className="p-3 bg-black text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition">
                  Sign In
                </button>
                <button onClick={() => navigate("/register")} className="p-3 bg-black text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
