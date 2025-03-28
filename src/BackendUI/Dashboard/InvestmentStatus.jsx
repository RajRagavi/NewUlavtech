import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig"; 
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaDollarSign, FaChartBar, FaBell, FaClock } from "react-icons/fa";

const InvestmentStatus = ({ userId }) => {
  const [investmentData, setInvestmentData] = useState({
    myInvestment: 0,
    totalReturns: 0,
    pendingWithdrawals: 0,
    investmentStatus: "Inactive",
    nextPayoutDate: "N/A",
    totalProfitEarned: 0,
  });

  useEffect(() => {
    const fetchInvestmentData = async () => {
      try {
        // Query only investments that belong to the logged-in user
        const investmentsQuery = query(
          collection(db, "investments"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(investmentsQuery);
        let totalInvestment = 0;
        let totalReturns = 0;
        let pendingWithdrawals = 0;
        let investmentStatus = "Inactive";
        let nextPayoutDate = "N/A";
        let totalProfitEarned = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          totalInvestment += data.investmentAmount || 0;
          totalReturns += data.totalReturns || 0;
          pendingWithdrawals += data.pendingWithdrawals || 0;
          // You can update status and payout date based on your logic
          investmentStatus = data.status || "Active";
          nextPayoutDate = data.nextPayout || "N/A";
          totalProfitEarned += data.profitEarned || 0;
        });

        setInvestmentData({
          myInvestment: totalInvestment,
          totalReturns,
          pendingWithdrawals,
          investmentStatus,
          nextPayoutDate,
          totalProfitEarned,
        });
      } catch (error) {
        console.error("Error fetching investment data:", error);
      }
    };

    if (userId) {
      fetchInvestmentData();
    }
  }, [userId]);

  const stats = [
    { title: "My Investment", value: `₹${investmentData.myInvestment.toLocaleString()}`, icon: <FaDollarSign className="text-3xl text-green-500" /> },
    { title: "Total Returns", value: `₹${investmentData.totalReturns.toLocaleString()}`, icon: <FaChartBar className="text-3xl text-yellow-500" /> },
    { title: "Pending Withdrawals", value: `₹${investmentData.pendingWithdrawals.toLocaleString()}`, icon: <FaBell className="text-3xl text-red-500" /> },
    { title: "Investment Status", value: investmentData.investmentStatus, icon: <FaClock className="text-3xl text-blue-500" /> },
    { title: "Next Payout Date", value: investmentData.nextPayoutDate, icon: <FaClock className="text-3xl text-purple-500" /> },
    { title: "Total Profit Earned", value: `₹${investmentData.totalProfitEarned.toLocaleString()}`, icon: <FaDollarSign className="text-3xl text-orange-500" /> },
  ];

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg hover:scale-95 transition">
      <h3 className="text-xl font-semibold mb-4">Quick Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div key={index} className="p-6 bg-white shadow-lg rounded-lg flex items-center justify-between hover:scale-105 transition duration-300">
            <div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-500">{item.value}</p>
            </div>
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentStatus;
