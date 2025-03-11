import { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig"; 
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(""); // Store user's name
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Check if displayName is available in Firebase Authentication
        if (currentUser.displayName) {
          setUserName(currentUser.displayName);
        } else {
          // Fetch user data from Firestore (if stored there)
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data().name || "User"); // Default name
          }
        }
      } else {
        setUser(null);
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-[1000] bg-green-200 shadow-md h-30">
      <div className="flex justify-between items-center px-5 md:px-12 h-full">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="UlavTech Logo" className="w-30 h-30 mr-2" />
          <span className="text-2xl md:text-3xl font-bold text-green-700">UlavTech</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About Us</a>
          <a href="/investment" className="nav-link">Investment</a>
          <a href="/contactus" className="nav-link">Contact Us</a>
        </nav>

        {/* User Menu / Authentication */}
        <div className="hidden lg:flex gap-4 text-white">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 bg-gray-800 text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition"
              >
                <span>{userName}</span> {/* Display User's Name */}
                <IoIosArrowDown />
              </button>

              {/* User Dropdown */}
              {dropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-black rounded-lg shadow-lg py-2">
                  <a href="/profile" className="block px-4 py-2 hover:bg-green-500">Profile</a>
                  <a href="/dashboard" className="block px-4 py-2 hover:bg-green-500">Dashboard</a>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-green-500">Logout</button>
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

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          {menuOpen ? (
            <AiOutlineClose size={25} onClick={() => setMenuOpen(false)} className="cursor-pointer" />
          ) : (
            <AiOutlineMenu size={25} onClick={() => setMenuOpen(true)} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-md py-5 flex flex-col items-center space-y-4">
          <a href="/" className="text-lg font-semibold">Home</a>
          <a href="/about" className="text-lg font-semibold">About Us</a>
          <a href="/investment" className="text-lg font-semibold">Investment</a>
          <a href="/contactus" className="text-lg font-semibold">Contact Us</a>

          {/* Authentication for Mobile */}
          {user ? (
            <>
              <a href="/profile" className="text-lg font-semibold">Profile</a>
              <a href="/dashboard" className="text-lg font-semibold">Dashboard</a>
              <button onClick={handleLogout} className="text-lg font-semibold text-red-600">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/signin")} className="w-40 p-3 bg-black text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition">
                Sign In
              </button>
              <button onClick={() => navigate("/register")} className="w-40 p-3 bg-black text-white rounded-lg font-semibold cursor-pointer hover:bg-green-800 transition">
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
