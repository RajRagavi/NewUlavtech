import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { doc, getDoc, getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const SproutPlan = () => {
  const navigate = useNavigate();
  
  const [role, setRole] = useState(null);
  const [investments, setInvestments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userRole = userSnap.data().role;
          setRole(userRole);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (role && userId) {
      fetchInvestments(role, userId);
    }
  }, [role, userId]);  // ✅ Auto reload investments when role/userId updates

  const fetchInvestments = async (userRole, userId) => {
    try {
        let investmentsQuery;
        if (userRole === "admin") {
            investmentsQuery = collection(db, "investments"); 
        } else {
            investmentsQuery = query(collection(db, "investments"), where("userId", "==", userId));
        }

        const querySnapshot = await getDocs(investmentsQuery);
        const investmentData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log("Fetched Investments:", investmentData);  // ✅ Debugging Log
        setInvestments(investmentData);

    } catch (error) {
        console.error("Error fetching investments:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-green-700 text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="flex h-full bg-gray-200">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gradient-to-r from-green-200 to-green-50 py-10 px-6">
        {role === "admin" ? <AdminView investments={investments} /> : <UserView navigate={navigate} />}
      </div>
    </div>
  );
};

// ✅ Admin View (Table UI)
const AdminView = ({ investments }) => (
  <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold text-green-800 text-center mb-4">Root Plan Investors</h1>
    {investments.length === 0 ? (
      <p className="text-center text-gray-600">No investments found</p>
    ) : (
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="p-3">Name</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Plan</th>
            <th className="p-3">Investment</th>
          </tr>
        </thead>
        <tbody>
          {investments
            .filter((inv) => inv.plan === "Sprout Plan") // ✅ Root Plan Investors Only
            .map((inv) => (
              <tr key={inv.id} className="text-center border-b">
                <td className="p-3">{inv.username || "N/A"}</td>
                <td className="p-3">{inv.phone || "N/A"}</td>
                <td className="p-3">{inv.plan || "N/A"}</td>
                <td className="p-3">₹{inv.investmentAmount || 0}</td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </div>
);

// ✅ User View (Investment Plan Details)
const UserView = ({ navigate }) => (
  <InvestmentPlan
    title="🌱 Sprout Plan"
    description="The Sprout Plan is for beginners looking to start their journey in agricultural investments."
    minInvestment="₹5,000"
    maxInvestment="₹50,000"
    returnRate="12% per annum"
    duration="18 months"
    navigate={navigate}
  />
);

// ✅ Investment Plan Details UI
const InvestmentPlan = ({ title, description, minInvestment, maxInvestment, returnRate, duration, navigate }) => (
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold text-green-800 text-center mb-4">{title}</h1>
    <p className="text-gray-700 text-center mb-6">{description}</p>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <InvestmentDetail label="Minimum Investment" value={minInvestment} />
      <InvestmentDetail label="Maximum Investment" value={maxInvestment} />
      <InvestmentDetail label="Average Return" value={returnRate} />
      <InvestmentDetail label="Duration" value={duration} />
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

// ✅ Investment Plan Details UI Component
const InvestmentDetail = ({ label, value }) => (
  <div className="bg-green-100 p-4 rounded-lg shadow text-center">
    <h3 className="text-lg font-semibold text-green-900">{label}</h3>
    <p className="text-green-700 font-bold">{value}</p>
  </div>
);

export default SproutPlan;
