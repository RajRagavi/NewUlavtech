import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, doc,getDoc,query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AOS from "aos";
import "aos/dist/aos.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Sidebar from "./Sidebar";

const Maturity = () => {
  const [date, setDate] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });

    // Get logged-in user
    const auth = getAuth();
    
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("Admin UID:", user.uid);
        user.getIdTokenResult().then(idTokenResult => {
          console.log("Admin Claims:", idTokenResult.claims);
        });
      }
    });
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      checkAdmin(user.uid);
    }
  }, []);
  

  // Check if the logged-in user is an admin
  const checkAdmin = async (uid) => {
    try {
      const userRef = doc(db, "users", uid); // Fetch directly by UID
      const userDoc = await getDoc(userRef);
    
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setIsAdmin(userData.role === "admin");
      } else {
        console.error("User document not found in Firestore!");

      }
    } catch (error) {
      console.error("Error checking admin role:", error);
    }
  };
  
  

  // Fetch Investments from Firestore
  const fetchInvestments = async () => {
    if (isAdmin === null) return; // ✅ Wait until admin status is determined
  
    try {
      const investmentsCollection = collection(db, "investments");
      let investmentsQuery;
  
      if (isAdmin) {
        console.log("Fetching all investments as Admin");
        investmentsQuery = investmentsCollection; // ✅ Admin should fetch all investments
      } else {
        console.log("Fetching user-specific investments");
        investmentsQuery = query(investmentsCollection, where("userId", "==", userId)); // ✅ User sees only their own investments
      }
  
      const querySnapshot = await getDocs(investmentsQuery);
      const investmentData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        maturityDate: moment(doc.data().timestamp.toDate()).add(3, "months").format("YYYY-MM-DD"),
      }));
  
      console.log("Fetched Investments:", investmentData); // ✅ Debugging
  
      setInvestments(investmentData);
      setFilteredInvestments(investmentData);
    } catch (error) {
      console.error("Error fetching investments:", error);
    }
  };
  
  
  useEffect(() => {
    if (userId !== null) {
      checkAdmin(userId).then(() => fetchInvestments());
    }
  }, [userId]);
  
  useEffect(() => {
    if (userId !== null && isAdmin !== null) {
      fetchInvestments();
    }
  }, [userId, isAdmin]); // Ensure investments fetch only after isAdmin is determined
  

  // Filter investments based on selected date
  useEffect(() => {
    if (!date) {
      // Default: Show all investments when no date is selected
      setFilteredInvestments(investments);
    } else {
      const selectedDateFormatted = moment(date).format("YYYY-MM-DD");
      console.log("Selected Date:", selectedDateFormatted);
  
      const filtered = investments.filter((inv) => {
        console.log("Checking:", inv.maturityDate);
        return inv.maturityDate === selectedDateFormatted;
      });
  
      console.log("Filtered Investments:", filtered);
      setFilteredInvestments(filtered);
    }
  }, [date, investments]);
  

  return (
    <div className="flex flex-col md:flex-row h-full bg-gray-200">
      <Sidebar />
      {/* Calendar Section */}
      <div className="md:w-1/4 w-full p-3" data-aos="fade-right">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Select Date</h2>
        <Calendar onChange={setDate} value={date} className="p-4 shadow-lg rounded-lg bg-white" />
      </div>

      {/* Investment Table */}
      <div className="md:w-1/2 w-full overflow-x-auto" data-aos="fade-left">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Maturing Investments</h2>

        {filteredInvestments.length === 0 ? (
          <p className="text-center text-gray-600">No records found</p>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Investment</th>
                <th className="p-3">Interest</th>
                <th className="p-3">Total</th>
                <th className="p-3">Investment Date</th>
                <th className="p-3">Maturity Date</th>
                {isAdmin && <th className="p-3">Action</th>} 
              </tr>
            </thead>
            <tbody>
              {filteredInvestments.map((inv) => (
                <tr key={inv.id} className="text-center border-b">
                  <td className="p-3">{inv.username}</td>
                  <td className="p-3">{inv.phone}</td>
                  <td className="p-3">{inv.plan}</td>
                  <td className="p-3">₹{inv.investmentAmount}</td>
                  <td className="p-3">₹{(inv.investmentAmount * 0.1).toFixed(2)}</td>
                  <td className="p-3">₹{(inv.investmentAmount * 1.1).toFixed(2)}</td>
                  <td className="p-3">{moment(inv.timestamp.toDate()).format("DD/MM/YYYY")}</td>
                  <td className="p-3">{moment(inv.maturityDate).format("DD/MM/YYYY")}</td>
                {isAdmin &&  <td className="p-3">
                    <button
                      className={`px-4 py-2 rounded transition ${
                        moment().isSameOrAfter(inv.maturityDate) ? "bg-green-500 text-white hover:bg-green-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                      }`}
                      disabled={!moment().isSameOrAfter(inv.maturityDate)}
                    >
                      Complete
                    </button>
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Maturity;
