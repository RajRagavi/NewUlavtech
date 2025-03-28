import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fruits from '../assets/img/veggies.jpg';
import Logo from '../assets/img/logo.png';
import Google from '../assets/img/Google.png';
import { auth, googleProvider, db ,storage } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithRedirect,
  sendEmailVerification,
  GoogleAuthProvider,
  getRedirectResult 
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    otp: "",
    referralCode: "", // ✅ Referral Code Added
  });

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const user = result.user;
          console.log("Redirect Login Success:", user);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Google Redirect Error:", error.message);
      })});
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA verified", response);
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired, please refresh.");
        },
      });
    }
  }, []);
  

  // ✅ Form Validation Function
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
        case "name":
            if (!value.trim()) errorMsg = "Name is required";
            break;

        case "phone":
            if (!value.trim()) errorMsg = "Phone number is required";
            else if (!/^\d{10}$/.test(value)) errorMsg = "Enter a valid 10-digit phone number";
            break;

        case "email":
            if (!value.trim()) errorMsg = "Email is required";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = "Enter a valid email address";
            break;

        case "password":
            if (!value.trim()) errorMsg = "Password is required";
            else if (value.length < 6) errorMsg = "Password must be at least 6 characters";
            break;

        case "otp":
            if (!value.trim()) errorMsg = "OTP is required";
            else if (!/^\d{6}$/.test(value)) errorMsg = "Enter a valid 6-digit OTP";
            break;

        default:
            break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
};

// ✅ Validate Entire Form Before Submission
const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    Object.keys(form).forEach((key) => {
        validateField(key, form[key]);
        if (form[key] === "" || errors[key]) {
            isValid = false;
            newErrors[key] = errors[key] || "This field is required";
        }
    });

    setErrors(newErrors);
    return isValid;
};

// ✅ Handle Input Changes & Validate
const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") {
        // Remove all non-numeric characters
        value = value.replace(/\D/g, "").slice(0, 10); // Allow only 10 digits
    }

    setForm({ ...form, [name]: value });
    validateField(name, value);
};

// ✅ Send OTP Function with Correct Phone Format
const sendOTP = async (phoneNumber) => {
  try {
    // Validate and format phone number
    if (!/^\+\d{10,15}$/.test(phoneNumber)) {
      alert("Invalid phone number! Use international format (e.g., +15551234567)");
      return;
    }

    // Ensure reCAPTCHA is initialized
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }

    const appVerifier = window.recaptchaVerifier;
    await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

    console.log("OTP Sent!");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};


  // Register user with Email & Password
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        phone: form.phone,
        email: form.email,
        userId: user.uid,
        referralCode: form.referralCode || "", // ✅ Save referral code
        createdAt: serverTimestamp(), // ✅ Firebase Timestamp Added
      });

      alert('Verification email sent! Please check your inbox.');
      navigate("/signin");
    } catch (error) {
      console.error("Error registering user:", error.message);
      alert(error.message);
    }
  };
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log("reCAPTCHA solved!");
      }
    });
  };
  const verifyOTP = (otp) => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        console.error("Invalid OTP:", error);
      });
  };
  
    // Google Login
    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Google Login Success:", result.user);
      } catch (error) {
        console.error("Google Sign-In Error:", error.message);
      }
    };
    
    
    
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-lg flex">
        {/* Left Side Image */}
        <div className="w-1/2 hidden md:block">
          <img src={Fruits} alt="Fresh Fruits" className="w-full h-full object-cover rounded-l-lg border-8 border-white" />
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <img src={Logo} alt="UlavTech Logo" className="w-30 h-30 mr-[-30px]" />
            <h2 className="text-4xl font-bold text-green-700">UlavTech</h2>
          </div>

          <h1 className="font-bold text-2xl mb-4">Hi,</h1>
          <p className="text-black mb-2 text-sm">Sign up for an UlavTech account</p>

          {/* Sign Up Form */}
          <form onSubmit={handleEmailRegister}>
            <div className="mb-3">
              <input
                type="text"
                name="phone"
                placeholder="Mobile Number"
                className={`w-full p-3 border rounded-lg text-sm ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                className={`w-full p-3 border rounded-lg text-sm ${errors.email ? "border-red-500" : "border-gray-300"}`}
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`w-full p-3 border rounded-lg text-sm ${errors.password ? "border-red-500" : "border-gray-300"}`}
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* ✅ Referral Code Input Field */}
            <div className="mb-3">
              <input type="text" name="referralCode" placeholder="Referral Code (optional)" className="w-full p-3 border rounded-lg text-sm" value={form.referralCode} onChange={handleChange} />
            </div>


            <div className="mb-3">

            <button
  type="button"
  onClick={() => sendOTP(form.phone.trim())}
  className="w-full p-2 mt-2 bg-blue-600 text-white rounded-lg"
  disabled={otpSent || !form.phone || errors.phone}
>
  {otpSent ? "OTP Sent" : "Send OTP"}
</button>


            </div>

            {/* OTP Input */}
            {otpSent && (
              <div className="mb-3">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  className={`w-full p-3 border rounded-lg text-sm ${errors.otp ? "border-red-500" : "border-gray-300"}`}
                  value={form.otp}
                  onChange={handleChange}
                />
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
              </div>
            )}

            <button
              type="submit"
              className={`w-full p-3 rounded-lg font-semibold cursor-pointer ${isOtpVerified ? "bg-black text-white" : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
              disabled={!isOtpVerified || !validateForm()}
            >
              Sign Up
            </button>

          </form>

          <div id="recaptcha-container"></div>

          {/* OR Section */}
          <div className="flex items-center my-4">
            <div className="border-t w-full"></div>
            <p className="px-3 text-black">Or</p>
            <div className="border-t w-full"></div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center space-x-4 mb-4">
          <button 
  onClick={handleGoogleLogin} 
  className={`p-2 ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow"}`} 
  disabled={loading}
>
  {loading ? "Signing in..." : <img src={Google} alt="Google" className="w-6 h-6" />}
</button>

          </div>

          <p className="text-black text-sm">
            Already have an account?
            <a href="/signin" className="text-blue-500 ml-1 font-semibold">Login</a>
          </p>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Register;
