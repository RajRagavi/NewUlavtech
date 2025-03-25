import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { doc, getDoc, getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const RootPlan = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setRole(userData.role);
          fetchInvestments(userData.role, user.uid);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fetch Investments based on role
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

// ✅ Admin View: Displays investment details
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
            .filter((inv) => inv.plan === "Root Plan") // ✅ Only Root Plan Investors
            .map((inv) => (
              <tr key={inv.id} className="text-center border-b">
                <td className="p-3">{inv.username}</td>
                <td className="p-3">{inv.phone}</td>
                <td className="p-3">{inv.plan}</td>
                <td className="p-3">₹{inv.investmentAmount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </div>
);

// ✅ User View: Displays Root Plan details
const UserView = ({ navigate }) => (
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold text-green-800 text-center mb-4">🌳 Root Plan</h1>
    <p className="text-gray-700 text-center mb-6">
      The Root Plan is for experienced investors looking for long-term growth in agriculture.
    </p>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {[
        { label: "Minimum Investment", value: "₹10,000" },
        { label: "Maximum Investment", value: "₹1,00,000" },
        { label: "Average Return", value: "15% per annum" },
        { label: "Duration", value: "24 months" },
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

export default RootPlan;
