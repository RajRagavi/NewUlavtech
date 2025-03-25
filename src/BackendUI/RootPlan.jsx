import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import InvestmentsList from "./InvestmentsList";

const db = getFirestore();
const auth = getAuth();

const RootPlan = () => {
  const navigate = useNavigate();
   
   // ✅ All useState hooks should be declared first
   const [role, setRole] = useState(null);
   const [loading, setLoading] = useState(true);
   const [errors, setErrors] = useState({});
   const [isModalOpen, setIsModalOpen] = useState(false);
 
   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, async (user) => {
       if (user) {
         const userRef = doc(db, "users", user.uid);
         const userSnap = await getDoc(userRef);
 
         if (userSnap.exists()) {
           setRole(userSnap.data().role);
         }
       }
       setLoading(false);
     });
 
     return () => unsubscribe();
   }, []);
 
   
 
  
  return (
    <div className="flex h-full bg-gray-200">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gradient-to-r from-green-200 to-green-50 py-10 px-6">
        {role === "admin" ? <AdminView /> : <UserView navigate={navigate} />}
      </div>
    </div>
  );
};
const AdminView = () => (
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold text-green-800 text-center mb-4">
      User Investment Details
    </h1>
    <InvestmentsList showAll={true} />
  </div>
);

const UserView = ({ navigate }) => (
    <div className="flex-1 min-h-screen bg-gradient-to-r from-green-200 to-green-50 py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-green-800 text-center mb-4">🌳 Root Plan</h1>
          <p className="text-gray-700 text-center mb-6">The Root Plan is for experienced investors looking for long-term growth in agriculture.</p>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-green-900">Minimum Investment</h3>
              <p className="text-green-700 font-bold">₹10,000</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-green-900">Maximum Investment</h3>
              <p className="text-green-700 font-bold">₹1,00,000</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-green-900">Average Return</h3>
              <p className="text-green-700 font-bold">15% per annum</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-green-900">Duration</h3>
              <p className="text-green-700 font-bold">24 months</p>
            </div>
          </motion.div>
          <div className="text-center mt-8">
          <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        onClick={() => navigate("/invest")}
      >
        Invest Now
      </button>
          </div>
        </div>
      </div>
      
  );


export default RootPlan;
