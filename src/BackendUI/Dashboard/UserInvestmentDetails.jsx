import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const UserInvestmentDetails = () => {
  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check authentication state
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setError("User not authenticated.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserInvestments = async () => {
      if (!user) return;

      try {
        const investmentsRef = collection(db, "investments");
        const q = query(investmentsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("No investments found.");
        } else {
          const investmentData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log("Fetched Investments:", investmentData);
          setInvestments(investmentData);
        }
      } catch (error) {
        console.error("Error fetching investments:", error);
        setError("Failed to fetch investments. Check Firestore rules.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUserInvestments();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Investment Plans Subscribed</h3>
      <ul className="list-disc pl-6 text-gray-700">
        {investments.length > 0 ? (
          investments.map((inv, index) => (
            <li key={index}>
              {inv.plan
                ? inv.plan
                : "Unknown Plan"} - ₹
              {inv.investmentAmount
                ? inv.investmentAmount.toLocaleString()
                : "0"} ({inv.returnRate
                ? `${inv.returnRate}% Return`
                : "N/A Return"})
            </li>
          ))
        ) : (
          <li>Unknown Plan - ₹0 (N/A Return)</li>
        )}
      </ul>

      
    </div>
  );
};

export default UserInvestmentDetails;
