import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig"; 
import { collection, getDocs } from "firebase/firestore";

const UserData = () => {
  const [planCounts, setPlanCounts] = useState({
    seed: 0,
    sprout: 0,
    root: 0,
  });

  useEffect(() => {
    const fetchPlanCounts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "investments"));
        let seedCount = 0,
          sproutCount = 0,
          rootCount = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.plan === "Seed Plan") seedCount++;
          else if (data.plan === "Sprout Plan") sproutCount++;
          else if (data.plan === "Root Plan") rootCount++;
        });

        setPlanCounts({
          seed: seedCount,
          sprout: sproutCount,
          root: rootCount,
        });
      } catch (error) {
        console.error("Error fetching plan counts:", error);
      }
    };

    fetchPlanCounts();
  }, []);

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg hover:scale-95 transition">
      <h3 className="text-xl font-semibold mb-4">User Data</h3>
      <p>Active Plans: {planCounts.seed + planCounts.sprout + planCounts.root}</p>
      <p>Users by Plan: Seed Plan - {planCounts.seed}, Sprout Plan - {planCounts.sprout}, Root Plan - {planCounts.root}</p>
    </div>
  );
};

export default UserData;
