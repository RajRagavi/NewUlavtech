import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const InvestmentPlans = () => {
  const [counts, setCounts] = useState({
    "Seed Plan": 0,
    "Sprout Plan": 0,
    "Root Plan": 0,
  });

  useEffect(() => {
    const fetchData = async () => {
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

        setCounts({
          "Seed Plan": seedCount,
          "Sprout Plan": sproutCount,
          "Root Plan": rootCount,
        });
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Plan Overview</h3>
      <div className="grid grid-cols-3 gap-6">
        {Object.keys(counts).map((plan) => (
          <div key={plan} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="font-semibold">{plan}</h4>
            <p className="text-gray-700">{counts[plan]} Users</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentPlans;