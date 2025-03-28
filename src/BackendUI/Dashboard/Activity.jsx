import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig"; 
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import moment from "moment"; 

const Activity = () => {
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const activityQuery = query(
          collection(db, "investments"),
          orderBy("timestamp", "desc"),
          limit(5) // Fetch latest 5 activities
        );
        const activitySnapshot = await getDocs(activityQuery);
        let activities = [];

        activitySnapshot.forEach((doc) => {
          const data = doc.data();
          activities.push({
            message: `${data.username} invested ₹${data.investmentAmount.toLocaleString()}`,
            timestamp: moment(data.timestamp?.toDate()).fromNow(),
          });
        });

        setRecentActivities(activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchRecentActivities();
  }, []);

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">Recent Activity</h3>
      <ul>
        {recentActivities.length > 0 ? (
          recentActivities.map((activity, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span className="text-gray-700">{activity.message}</span>
              <span className="text-blue-600 text-sm">{activity.timestamp}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No recent activities</li>
        )}
      </ul>
    </div>
  );
};

export default Activity;
