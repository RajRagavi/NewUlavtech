import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaTachometerAlt, FaUser, FaSeedling, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { signOut, onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebaseConfig"; 

const Sidebar = () => {

  const navigate = useNavigate();

  const [openPlans, setOpenPlans] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role") || "user"; // Default role if not set
    setUserRole(role);
  }, []);


  const handleLogout = async () => {
  try {
    await signOut(auth); // Firebase logout
    localStorage.removeItem("role"); 
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
    navigate("/"); // Sign-in page redirect
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};

  return (
    <>

      <button
        className="lg:hidden fixed top-4 right-4 z-1000 bg-green-600 text-white p-2 rounded-md shadow-lg"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars size={24} />
      </button>

     
      <div
        className={`fixed top-0 left-0 w-64 min-h-screen bg-white shadow-lg transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative z-50`}
      >
     
        <button
          className="lg:hidden absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full z-50"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes size={20} />
        </button>

   
        <div className="flex flex-col items-center mt-12">
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="w-20 h-20 rounded-full border"
          />
          <h2 className="mt-2 font-bold text-lg">User Name</h2>
          <p className="text-gray-600 text-sm">username@gmail.com</p>
          <p className="text-gray-500 text-sm">+91 98765 43210</p>
        </div>

       
        <nav className="mt-5 space-y-2">
          <Link to="/dashboard" className="flex items-center w-full p-2 rounded-lg hover:bg-green-100">
            <FaTachometerAlt className="mr-3 text-green-600" /> Dashboard
          </Link>

         
          {userRole === "admin" && (
            <Link to="/user-data" className="flex items-center w-full p-2 rounded-lg hover:bg-green-100">
              <FaUser className="mr-3 text-green-600" /> User Data
            </Link>
          )}

         
          <div>
            <button
              className="flex items-center w-full p-2 rounded-lg hover:bg-green-100 justify-between"
              onClick={() => setOpenPlans(!openPlans)}
            >
              <span className="flex items-center">
                <FaSeedling className="mr-3 text-green-600" /> Plans
              </span>
              {openPlans ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
            </button>
            {openPlans && (
              <div className="ml-6 space-y-2">
                <Link to="/plans/seed" className="block w-full p-2 text-left hover:bg-green-100">Seed Plan</Link>
                <Link to="/plans/sprout" className="block w-full p-2 text-left hover:bg-green-100">Sprout Plan</Link>
                <Link to="/plans/root" className="block w-full p-2 text-left hover:bg-green-100">Root Plan</Link>
              </div>
            )}
          </div>

          <Link to="/maturity" className="flex items-center w-full p-2 rounded-lg hover:bg-green-100">
            <BsBell className="mr-3 text-green-600" /> Maturity
          </Link>

          <button
  onClick={handleLogout}
  className="flex items-center w-full p-2 rounded-lg hover:bg-red-100 text-red-600 mt-5"
>
  <FaSignOutAlt className="mr-3" /> Logout
</button>
</nav>
      </div>

 
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
