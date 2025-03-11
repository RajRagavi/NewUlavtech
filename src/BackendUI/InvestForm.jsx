import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { auth, db } from "../firebase/firebaseConfig"; 
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Money from "../assets/img/money.jpg";

const InvestForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    accountNo: "",
    panNo: "",
    aadharNo: "",
    investmentAmount: "",
    plan: "Seed Plan", // Default plan selection
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch user ID when component mounts
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "investmentAmount" ? Number(value) : value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.accountNo || !/^\d{6,}$/.test(formData.accountNo)) {
      newErrors.accountNo = "Account Number must be at least 6 digits";
    }
    if (!formData.panNo || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo)) {
      newErrors.panNo = "Invalid PAN Number (Format: ABCDE1234F)";
    }
    if (!formData.aadharNo || !/^\d{12}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = "Aadhar Number must be exactly 12 digits";
    }
    if (!formData.investmentAmount || formData.investmentAmount < 5000 || formData.investmentAmount > 50000) {
      newErrors.investmentAmount = "Investment must be between ₹5000 and ₹50000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User not authenticated. Please log in.");
      return;
    }

    if (validateForm()) {
      try {
        await addDoc(collection(db, "investments"), {
          userId,
          accountNo: formData.accountNo,
          panNo: formData.panNo,
          aadharNo: formData.aadharNo,
          investmentAmount: formData.investmentAmount,
          plan: formData.plan,
          timestamp: new Date(),
        });

        alert("Investment submitted successfully! ✅");
        navigate("/"); // Redirect after success
      } catch (error) {
        console.error("Error storing investment:", error);
        alert("Failed to submit investment. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />

      <div className="flex w-full">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-center text-green-800">sssInvest Now</h2>
            <p className="text-center text-gray-600 mb-6">Fill in your details to proceed with the investment.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleInputChange}
                placeholder="Account No"
                className="p-2 border rounded w-full focus:outline-none focus:ring focus:ring-green-300"
              />
              {errors.accountNo && <p className="text-red-600 text-sm">{errors.accountNo}</p>}

              <input
                type="text"
                name="panNo"
                value={formData.panNo}
                onChange={handleInputChange}
                placeholder="PAN No (ABCDE1234F)"
                className="p-2 border rounded w-full uppercase focus:outline-none focus:ring focus:ring-green-300"
              />
              {errors.panNo && <p className="text-red-600 text-sm">{errors.panNo}</p>}

              <input
                type="text"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleInputChange}
                placeholder="Aadhar No"
                className="p-2 border rounded w-full focus:outline-none focus:ring focus:ring-green-300"
              />
              {errors.aadharNo && <p className="text-red-600 text-sm">{errors.aadharNo}</p>}

              <input
                type="number"
                name="investmentAmount"
                value={formData.investmentAmount}
                onChange={handleInputChange}
                placeholder="Investment Amount"
                className="p-2 border rounded w-full focus:outline-none focus:ring focus:ring-green-300"
              />
              {errors.investmentAmount && <p className="text-red-600 text-sm">{errors.investmentAmount}</p>}

              {/* Dropdown for selecting a plan */}
              <select
                name="plan"
                value={formData.plan}
                onChange={handleInputChange}
                className="p-2 border rounded w-full focus:outline-none focus:ring focus:ring-green-300"
              >
                <option value="Seed Plan">Seed Plan</option>
                <option value="Sprout Plan">Sprout Plan</option>
                <option value="Root Plan">Root Plan</option>
              </select>

              <button
                type="submit"
                className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700 cursor-pointer"
              >
                Submit Investment
              </button>
            </form>
          </div>
        </div>

        <div className="w-1/2 p-6 text-white flex flex-col items-center">
          <img
            src={Money}
            alt="Investment"
            className="w-full object-cover h-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default InvestForm;
