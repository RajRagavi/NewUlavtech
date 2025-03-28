import { useEffect, useState } from "react";
import { db,auth  } from "../../firebase/firebaseConfig"; // Import Firebase config
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


const TransactionHistory = () => {
    const [investments, setInvestments] = useState([]);
    const [user, setUser] = useState(null); // Track authenticated user

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // Set logged-in user
                fetchInvestments(user.uid);
            } else {
                console.log("No authenticated user found.");
                setUser(null);
            }
        });

        return () => unsubscribe(); // Cleanup subscription
    }, []);

    const fetchInvestments = async (userId) => {
        try {
            const q = query(
                collection(db, "investments"),
                where("userId", "==", userId) // Fetch only logged-in user's investments
            );

            const querySnapshot = await getDocs(q);
            const fetchedInvestments = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log("Fetched Investments: ", fetchedInvestments); // Debugging
            setInvestments(fetchedInvestments);
        } catch (error) {
            console.error("Error fetching investments:", error);
        }
    };

    if (!user) return <p>Loading...</p>; // Show loading state until user is authenticated

    return (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4  inline-block px-2 py-1 rounded">Transaction History</h3>
            <ul>
                {investments.map((investment) => (
                    <li key={investment.id} className="flex justify-between items-center border-b py-2">
                        <span className=" px-2 py-1 rounded">
                            Invested ₹{investment.investmentAmount.toLocaleString()} in {investment.plan}
                        </span>
                        <span className=" px-2 py-1 rounded text-gray-500">
                            {new Date(investment.timestamp.seconds * 1000).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default TransactionHistory;
