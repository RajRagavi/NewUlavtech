import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const QuickStatus = () => {
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [activePlans, setActivePlans] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "investments"));
        let total = 0;
        let planSet = new Set();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.investmentAmount) {
            total += Number(data.investmentAmount);
          }
          if (data.plan) {
            planSet.add(data.plan);
          }
        });

        setTotalInvestment(total);
        setActivePlans(planSet.size); // Unique plan count
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg hover:scale-95 transition">
      <h3 className="text-xl font-semibold mb-4">Quick Status</h3>
      <p>Active Plans: {activePlans}</p>
      <p>Total Investment: ₹{totalInvestment.toLocaleString()}</p>
      <p>Pending Withdrawals: ₹</p>
    </div>
  );
};

export default QuickStatus;
