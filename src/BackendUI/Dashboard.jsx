import React, { useEffect, useState } from "react";
import { FaBell, FaUser, FaChartBar, FaDollarSign, FaClock } from "react-icons/fa";
import Sidebar from "./Sidebar";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; 
import { fetchTotalUsers,fetchTotalInvestment,fetchRecentActivities  } from "./utils/fetchData";

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const Dashboard = () => {
  const [role, setUserRole] = useState("");
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); 
  const [totalUsers, setTotalUsers] = useState(0);
  
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchTotalUsers();
      const investment = await fetchTotalInvestment();
      setTotalUsers(users);
      setTotalInvestment(investment);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activities = await fetchRecentActivities();
        setRecentActivities(activities);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    fetchData();
  }, []);
  
  // useEffect(() => {
  //   if (role === "admin") {
  //     fetchTotalUsers().then(setTotalUsers);
  //   }
  // }, [role]);


  useEffect(() => {
    AOS.init({ duration: 800 });

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user role from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserRole(userSnap.data().role); // Get role from Firestore
        } else {
          setUserRole("investor"); // Default role if not found
        }
      } else {
        // If no user is logged in, redirect to login page
        navigate("/login");
      }
      setLoading(false); // Set loading to false after fetching
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  // Show loading screen while fetching data
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
          { title: "Total Investment", value:`₹${totalInvestment.toLocaleString()}`, icon: <FaDollarSign className="text-3xl text-green-500" /> },
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

             
        {/* Recent Activity Section */}
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg hover:scale-95 transition">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <ul>
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span>{activity.message}</span>
                <span className="text-gray-500">{activity.timestamp.toLocaleString()}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No recent activities</li>
          )}
        </ul>
      </div>

     
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg hover:scale-95 transition">
          <h3 className="text-xl font-semibold mb-4">Plan Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold">Seed Plan</h4>
              <p>200 Users</p>
              <p className="text-gray-500">Average Return: 8%</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold">Sprout Plan</h4>
              <p>150 Users</p>
              <p className="text-gray-500">Average Return: 12%</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold">Root Plan</h4>
              <p>100 Users</p>
              <p className="text-gray-500">Average Return: 15%</p>
            </div>
          </div>
        </div>

      
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg hover:scale-95 transition">
          <h3 className="text-xl font-semibold mb-4">User Data</h3>
          <p>Total Active Users: 400</p>
          <p>Total Inactive Users: 100</p>
          <p>Users by Plan: Seed Plan - 200, Sprout Plan - 150, Root Plan - 100</p>
        </div>

      
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg hover:scale-95 transition">
          <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
          <p>Active Plans: 3</p>
          <p>Total Investment: ₹10,00,000</p>
          <p>Pending Withdrawals: ₹2,00,000</p>
        </div>
          </>
        ) : (
          <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "My Investment", value: "₹1,50,000", icon: <FaDollarSign className="text-3xl text-green-500" /> },
                { title: "Total Returns", value: "₹40,000", icon: <FaChartBar className="text-3xl text-yellow-500" /> },
                { title: "Pending Withdrawals", value: "₹5,000", icon: <FaBell className="text-3xl text-red-500" /> },
                { title: "Investment Status", value: "Active", icon: <FaClock className="text-3xl text-blue-500" /> },
                { title: "Next Payout Date", value: "15th March 2025", icon: <FaClock className="text-3xl text-purple-500" /> },
                { title: "Total Profit Earned", value: "₹25,000", icon: <FaDollarSign className="text-3xl text-orange-500" /> }
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

         
            <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Investment Plans Subscribed</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Seed Plan - ₹50,000 (8% Return)</li>
                <li>Sprout Plan - ₹1,00,000 (12% Return)</li>
              </ul>
            </div>

           
            <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
              <ul>
                <li className="flex justify-between border-b py-2">
                  <span>Invested ₹50,000 in Seed Plan</span>
                  <span className="text-gray-500">Feb 20, 2025</span>
                </li>
                <li className="flex justify-between border-b py-2">
                  <span>Invested ₹1,00,000 in Sprout Plan</span>
                  <span className="text-gray-500">Feb 22, 2025</span>
                </li>
                <li className="flex justify-between border-b py-2">
                  <span>Withdrawal of ₹10,000 Approved</span>
                  <span className="text-gray-500">Feb 25, 2025</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
