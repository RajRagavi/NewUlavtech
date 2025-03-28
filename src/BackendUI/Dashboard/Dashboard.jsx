import React, { useEffect, useState } from "react";
import { FaBell, FaUser, FaChartBar, FaDollarSign, FaClock } from "react-icons/fa";
import Sidebar from "../Sidebar";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; 
import { fetchTotalUsers, fetchTotalInvestment } from "../utils/fetchData";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import InvestmentPlans from "./InvestmentPlans";
import UserData from "./UserData";
import QuickStatus from "./QuickStatus";
import Activity from "./Activity";
import InvestmentStatus from "./InvestmentStatus";
import { useAuth } from "../../hooks/useAuth"; 
import UserInvestmentDetails from "./UserInvestmentDetails";
import TransactionHistory from "./TransactionHistory";

const Dashboard = () => {
  const [role, setUserRole] = useState("");
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const { user, userloading } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 800 });

    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserRole(userSnap.data().role);
        } else {
          setUserRole("investor");
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchTotalUsers();
      const investment = await fetchTotalInvestment();
      setTotalUsers(users);
      setTotalInvestment(investment);
    };

    fetchData();
  }, []);

  if (userloading) return <p>Loading...</p>;
  if (!user) return <p>Please login to view your dashboard.</p>;
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="flex h-full bg-gray-200">
      <Sidebar />
      <div className="flex-1 p-6" data-aos="fade-right">
        <h1 className="text-2xl font-bold mb-4">
          {role === "admin" ? "Admin Dashboard" : "Investor Dashboard"}
        </h1>

        {role === "admin" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Users", value: `${totalUsers} Active Users`, icon: <FaUser className="text-3xl text-blue-500" /> },
                { title: "Total Investment", value: `₹${totalInvestment.toLocaleString()}`, icon: <FaDollarSign className="text-3xl text-green-500" /> },
                { title: "Total Returns", value: "₹2,50,000", icon: <FaChartBar className="text-3xl text-yellow-500" /> },
                { title: "Pending Requests", value: "5 Requests", icon: <FaBell className="text-3xl text-red-500" /> }
              ].map((item, index) => (
                <div key={index} className="p-6 bg-white shadow-lg rounded-lg flex items-center justify-between hover:scale-105 transition duration-300">
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-500">{item.value}</p>
                  </div>
                  {item.icon}
                </div>
              ))}
            </div>

            <Activity />
            <InvestmentPlans />
            <UserData />
            <QuickStatus />
          </>
        ) : (
          <>
            <InvestmentStatus userId={user.uid} />
<UserInvestmentDetails />
<TransactionHistory />
            

          
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
