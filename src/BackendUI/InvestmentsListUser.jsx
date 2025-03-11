import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const InvestmentsListUser = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user role
        const userRole = await fetchUserRole(user.uid);
        setRole(userRole);

        // Fetch investments
        fetchInvestments(user.uid, userRole);
      } else {
        setInvestments([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserRole = async (uid) => {
    try {
      const userDoc = await getDocs(query(collection(db, "users"), where("uid", "==", uid)));
      if (!userDoc.empty) {
        return userDoc.docs[0].data().role; // Returns "admin" or "investor"
      }
      return "investor"; // Default role
    } catch (error) {
      console.error("Error fetching user role:", error);
      return "investor";
    }
  };

  const fetchInvestments = async (uid, userRole) => {
    try {
      let q;
      if (userRole === "admin") {
        q = query(collection(db, "investments")); // Admin sees all investments
      } else {
        q = query(collection(db, "investments"), where("userId", "==", uid)); // Investors see only their own
      }

      const querySnapshot = await getDocs(q);
      const investmentList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInvestments(investmentList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching investments:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        {role === "admin" ? "All Investments" : "Your Investments"}
      </h2>

      {loading ? (
        <p>Loading investments...</p>
      ) : investments.length === 0 ? (
        <p>No investments found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border p-2">Plan</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Account No</th>
              <th className="border p-2">Aadhar No</th>
              <th className="border p-2">PAN No</th>
              <th className="border p-2">Timestamp</th>
              {role === "admin" && <th className="border p-2">User ID</th>}
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => (
              <tr key={investment.id} className="border">
                <td className="border p-2">{investment.plan}</td>
                <td className="border p-2">₹{investment.investmentAmount}</td>
                <td className="border p-2">{investment.accountNo}</td>
                <td className="border p-2">{investment.aadharNo}</td>
                <td className="border p-2">{investment.panNo}</td>
                <td className="border p-2">{new Date(investment.timestamp.toDate()).toLocaleString()}</td>
                {role === "admin" && <td className="border p-2">{investment.userId}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvestmentsListUser;
