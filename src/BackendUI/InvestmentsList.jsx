import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import moment from "moment"; 

const InvestmentsList = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const adminStatus = await checkAdminRole(user.uid);
        setIsAdmin(adminStatus);
        fetchInvestments(user.uid, adminStatus);
      } else {
        setInvestments([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to check if the user is an admin
  const checkAdminRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data().role === "admin";
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
    }
    return false;
  };

  // Fetch Investments along with User Details
  const fetchInvestments = async (uid, isAdmin) => {
    try {
      setLoading(true);
      let q;

      if (isAdmin) {
        q = query(collection(db, "investments"));
      } else {
        q = query(collection(db, "investments"), where("userId", "==", uid));
      }

      const querySnapshot = await getDocs(q);
      const investmentList = [];

      for (const investmentDoc of querySnapshot.docs) {
        const investment = investmentDoc.data();
        const userId = investment.userId;

        // Fetch user details from "users" collection
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        let userData = {};
        if (userSnap.exists()) {
          userData = userSnap.data();
        }

        // Calculate maturity date (Add 3 months)
        const investmentDate = investment.timestamp?.toDate() || new Date();
        const maturityDate = moment(investmentDate).add(3, "months").format("YYYY-MM-DD");

        investmentList.push({
          id: investmentDoc.id,
          ...investment,
          name: userData.name || "N/A",
          phone: userData.phone || "N/A",
          email: userData.email || "N/A",
          maturity: maturityDate,
        });
      }

      setInvestments(investmentList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching investments:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading investments...</p>
      ) : investments.length === 0 ? (
        <p>No investments found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email ID</th>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Account No</th>
              <th className="border p-2">Aadhar No</th>
              <th className="border p-2">PAN No</th>
              <th className="border p-2">Timestamp</th>
              <th className="border p-2">Maturity</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => (
              <tr key={investment.id} className="border">
                <td className="border p-2">{investment.name}</td>
                <td className="border p-2">{investment.phone}</td>
                <td className="border p-2">{investment.email}</td>
                <td className="border p-2">{investment.plan}</td>
                <td className="border p-2">₹{investment.investmentAmount}</td>
                <td className="border p-2">{investment.accountNo}</td>
                <td className="border p-2">{investment.aadharNo}</td>
                <td className="border p-2 capitalize">{investment.panNo}</td>
                <td className="border p-2">
                  {investment.timestamp
                    ? new Date(investment.timestamp.toDate()).toLocaleString()
                    : "N/A"}
                </td>
                <td className="border p-2">{investment.maturity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvestmentsList;
