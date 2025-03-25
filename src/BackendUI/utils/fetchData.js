import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Firebase config import

export const fetchTotalUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.size; // Total Users Count
  } catch (error) {
    console.error("Error fetching total users:", error);
    return 0;
  }
};

export const fetchTotalInvestment = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "investments"));
      let totalInvestment = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.investmentAmount) {  // Ensure field exists
          totalInvestment += Number(data.investmentAmount); // Convert to number
        }
      });
      return totalInvestment;
    } catch (error) {
      console.error("Error fetching total investment:", error);
      return 0;
    }
  };

  // Fetch Recent User Activities
  export const fetchRecentActivities = async () => {
    try {
      const usersQuery = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(3));
      const investmentsQuery = query(collection(db, "investments"), orderBy("timestamp", "desc"), limit(3));
  
      const [usersSnapshot, investmentsSnapshot] = await Promise.all([
        getDocs(usersQuery),
        getDocs(investmentsQuery)
      ]);
  
      let activities = [];
  
      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("User Data:", data);  // 🔥 Debugging Log
        if (data.createdAt) {
          activities.push({
            message: `${data.name || "A user"} signed up`,
            timestamp: data.createdAt.toDate(),
          });
        }
      });
  
      investmentsSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Investment Data:", data); // 🔥 Debugging Log
        if (data.timestamp) {
          activities.push({
            message: `₹${data.investmentAmount?.toLocaleString()} invested by ${data.accountNo || "User"}`,
            timestamp: data.timestamp.toDate(),
          });
        }
      });
  
      // Sort Activities by timestamp (Latest First)
      activities.sort((a, b) => b.timestamp - a.timestamp);
  
      console.log("Final Activities:", activities); // 🔥 Debugging Log
      return activities;
    } catch (error) {
      console.error("Error fetching recent activities:", error);
      return [];
    }
  };
  