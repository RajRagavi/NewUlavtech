import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { auth, db } from "../firebase/firebaseConfig"; 
import { collection, addDoc ,doc, getDoc} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Money from "../assets/img/money.jpg";


const InvestForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    accountNo: "",
    ifsc: "",
    accountholdername: "",
    bankname: "",
    panNo: "",
    aadharNo: "",
    investmentAmount: "",
    plan: "Seed Plan", // Default plan selection
  });

  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
  
        // Fetch display name from Firebase Auth
        let userName = user.displayName || "";
  
        // Fetch from Firestore if not available in Auth
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
  
        if (userSnap.exists() && userSnap.data().name) {
          userName = userSnap.data().name;
        }
  
        // Update formData with username and disable editing
        setFormData((prevData) => ({
          ...prevData,
          Name: userName,
        }));
      } else {
        navigate("/login");
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
    
    if (!formData.ifsc || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc.toUpperCase())) {
      newErrors.ifsc = "Invalid IFSC code (Format: ABCD0123456)";
    }
  
    if (!formData.accountholdername || formData.accountholdername.trim().length < 3) {
      newErrors.accountholdername = "Account Holder Name must be at least 3 characters";
    }
  
    if (!formData.bankname || formData.bankname.trim().length < 3) {
      newErrors.bankname = "Bank Name is required";
    }
  
    if (!formData.panNo || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo.toUpperCase())) {
      newErrors.panNo = "Invalid PAN Number (Format: ABCDE1234F)";
    }
  
    if (!formData.aadharNo || !/^\d{12}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = "Aadhar Number must be exactly 12 digits";
    }
  
    if (!formData.investmentAmount || formData.investmentAmount < 5000 || formData.investmentAmount > 50000) {
      newErrors.investmentAmount = "Investment must be between ₹5000 to ₹50000";
    }
  
    if (!formData.plan || formData.plan === "Select Plan") {
      newErrors.plan = "Please select an investment plan";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User not authenticated. Please log in.");
      return;
    }
  
    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }
  
    try {
      await addDoc(collection(db, "investments"), {
        userId,
        username: formData.Name,
        phone: formData.phone,
        accountNo: formData.accountNo,
        ifsc: formData.ifsc,
        accountholdername: formData.accountholdername,
        bankname: formData.bankname,
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
  };
  

  return (
    <div className="flex h-full bg-gray-200">
      <Sidebar />

      <div className="flex w-full">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-center text-green-800">Invest Now</h2>
            <p className="text-center text-gray-600 mb-6">Fill in your details to proceed with the investment.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.Name}
  disabled
               
                className="p-2 border rounded w-full focus:outline-none focus:ring focus:ring-green-300"
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="phone No"
                className="p-2 border rounded w-full focus:outline-none focus:ring focus:ring-green-300"
              />
              {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
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
  name="ifsc"
  value={formData.ifsc}
  onChange={handleInputChange}
  placeholder="IFSC"
  className={`p-2 border rounded w-full focus:outline-none ${errors.ifsc ? "border-red-500" : "focus:ring focus:ring-green-300"}`}
/>
{errors.ifsc && <p className="text-red-600 text-sm">{errors.ifsc}</p>}

              <input
                type="text"
                name="accountholdername"
                value={formData.accountholdername}
                onChange={handleInputChange}
                placeholder="Account holder name"
                className="p-2 border rounded w-full focus:outline-none focus:ring focus:ring-green-300"
              />
              {errors.accountholdername && <p className="text-red-600 text-sm">{errors.accountholdername}</p>}
              <input
                type="text"
                name="bankname"
                value={formData.bankname}
                onChange={handleInputChange}
                placeholder="Bank Name"
                className="p-2 border rounded w-full focus:outline-none focus:ring focus:ring-green-300"
              />
              {errors.bankname && <p className="text-red-600 text-sm">{errors.bankname}</p>}

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
                <option value="Select Plan">Select Plan</option>
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
