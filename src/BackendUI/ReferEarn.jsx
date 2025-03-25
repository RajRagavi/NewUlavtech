import { useState, useEffect } from "react";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const ReferEarn = () => {
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const fetchReferralCode = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().referralCode) {
          // If referral code exists, use it
          setReferralCode(userDoc.data().referralCode);
        } else {
          // Generate new referral code
          const newCode = generateReferralCode(user.uid);
          setReferralCode(newCode);

          // Store in Firestore
          await setDoc(userRef, { referralCode: newCode }, { merge: true });
        }
      }
    };

    fetchReferralCode();
  }, [auth]);

  // Function to generate a unique referral code
  const generateReferralCode = (uid) => {
    return `REF-${uid.substring(0, 6).toUpperCase()}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareText = `Join now and earn rewards! Use my referral code: ${referralCode}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Refer & Earn",
          text: shareText,
          url: window.location.href,
        })
        .catch((error) => console.error("Sharing failed:", error));
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Refer & Earn</h2>
          <p className="text-gray-700 mb-4">Share your referral code and earn rewards!</p>

          <div className="flex items-center justify-between bg-gray-200 p-3 rounded-lg">
            <span className="text-lg font-semibold">{referralCode || "Generating..."}</span>
            <button onClick={handleCopy} className="text-green-600 hover:text-green-800">
              <FaCopy size={20} />
            </button>
          </div>
          {copied && <p className="text-green-600 mt-2">Copied to clipboard!</p>}

          <button
            onClick={handleShare}
            className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-green-800"
          >
            <FaShareAlt className="mr-2" /> Share & Earn
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferEarn;
