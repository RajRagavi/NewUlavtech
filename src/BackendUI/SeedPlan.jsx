import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import InvestmentsList from "./InvestmentsList";

const db = getFirestore();
const auth = getAuth();

const SeedPlan = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-gray-200">
      <Sidebar />
      
      <div className="flex-1 min-h-screen bg-gradient-to-r from-green-200 to-green-50 py-10 px-6">
        {role === "admin" ? (
          <AdminView />
        ) : (
          <UserView navigate={navigate} />
        )}
      </div>
    </div>
  );
};

// Separate components for cleaner code
const AdminView = () => (
  <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold text-green-800 text-center mb-4">User Investment Details</h1>
    <InvestmentsList showAll={true} />
  </div>
);

const UserView = ({ navigate }) => (
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold text-green-800 text-center mb-4">🌱 Seed Plan</h1>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {[
        { label: "Minimum Investment", value: "₹5000" },
        { label: "Maximum Investment", value: "₹50000" },
        { label: "Average Return", value: "12% per annum" },
        { label: "Duration", value: "12 months" },
      ].map((item, index) => (
        <div key={index} className="bg-green-100 p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-green-900">{item.label}</h3>
          <p className="text-green-700 font-bold">{item.value}</p>
        </div>
      ))}
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
);

export default SeedPlan;
