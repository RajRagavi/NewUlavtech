import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fruits from '../assets/img/veggies.jpg';
import Logo from '../assets/img/logo.png';
import Google from '../assets/img/Google.png';
import { auth, googleProvider, db } from "../firebase/firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  sendEmailVerification 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    otp: "",
  });

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
      window.recaptchaVerifier.render();
    }
  }, []);
  
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible", // 'normal' என்றால் UI-யில் காணலாம்
        callback: (response) => {
          console.log("reCAPTCHA verified!", response);
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired! Refresh the page.");
        },
      });
    }
  };
  // Send OTP
  const sendOtp = async (phoneNumber) => {
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      console.log("OTP Sent Successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }
  };
  
  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\+[1-9]\d{1,14}$/; // E.164 format check
    return phoneRegex.test(phoneNumber);
}
  // Verify OTP
  const verifyOtp = async () => {
    if (!form.otp) {
      alert("Please enter the OTP.");
      return;
    }

    try {
      await confirmationResult.confirm(form.otp);
      setIsOtpVerified(true);
      alert("Phone number verified!");
    } catch (error) {
      console.error("OTP verification failed:", error.message);
      alert("Invalid OTP. Please try again.");
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "name":
        if (!value.trim()) errorMsg = "Name is required.";
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) errorMsg = "Enter a valid 10-digit phone number.";
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) errorMsg = "Enter a valid email address.";
        break;
      case "password":
        if (value.length < 6) errorMsg = "Password must be at least 6 characters.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  // Validate all fields before submission
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email address.";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        createdAt: new Date(),
      });

      alert('Verification email sent! Please check your inbox.');
      navigate("/signin");
    } catch (error) {
      console.error("Error registering user:", error.message);
      alert(error.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Login Successful!", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Login Error:", error.message);
      alert(error.message);
    }
  };
  return (
    <div className="h-screen   mb-30 flex items-center justify-center ">
      <div className="w-full  bg-white rounded-lg shadow-lg flex">

        {/* Left Side Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={Fruits}
            alt="Fresh Fruits"
            className="w-full h-full object-cover rounded-l-lg border-8 border-white"
          />
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">

          {/* Logo */}
          <div className="flex items-center mb-6">
            <img src={Logo} alt="UlavTech Logo" className="w-30 h-30 mr-[-30px]" />
            <h2 className="text-4xl font-bold text-green-700">UlavTech</h2>
          </div>

          {/* Sign Up Heading */}
          <h1 className="font-bold text-2xl mb-4">Hi,</h1>
          <p className="text-black mb-2 text-sm">Sign up for an UlavTech account</p>

          {/* Sign Up Form */}

          <form onSubmit={handleEmailRegister}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={`w-full p-3 border rounded-lg text-sm ${errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="phone"
                placeholder="Mobile Number"
                className={`w-full p-3 border rounded-lg text-sm ${errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                className={`w-full p-3 border rounded-lg text-sm ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`w-full p-3 border rounded-lg text-sm ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Profile Photo Input */}
            {/* <div className="mb-4">
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handlePhotoChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            />
            {errors.profilePhoto && <p className="text-red-500 text-xs mt-1">{errors.profilePhoto}</p>}
          </div> */}

            <div className="mb-3">
              <input
                type="text"
                name="phone"
                placeholder="Mobile Number"
                className={`w-full p-3 border rounded-lg text-sm ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                value={form.phone}
                onChange={handleChange}
                disabled={otpSent} // Disable phone input after OTP is sent
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              <button
                type="button"
                onClick={sendOtp}
                className="w-full p-2 mt-2 bg-blue-600 text-white rounded-lg"
                disabled={otpSent} // Disable send OTP button after OTP is sent
              >
                {otpSent ? "OTP Sent" : "Send OTP"}
              </button>
            </div>

            {/* OTP Input Field */}
            {otpSent && (
              <div className="mb-3">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  className="w-full p-3 border rounded-lg text-sm"
                  value={form.otp}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="w-full p-2 mt-2 bg-green-600 text-white rounded-lg"
                >
                  Verify OTP
                </button>
              </div>
            )}


<button 
  type="submit" 
  className={`w-full p-3 rounded-lg font-semibold cursor-pointer ${
    isOtpVerified ? "bg-black text-white" : "bg-gray-400 text-gray-600 cursor-not-allowed"
  }`} 
  disabled={!isOtpVerified}
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
            {/* <button className="p-2 cursor-pointer hover:shadow">
              <img src={Fb} alt="Facebook" className="w-6 h-6" />
            </button> */}
            <button onClick={handleGoogleLogin} className="p-2 cursor-pointer hover:shadow">
              <img src={Google} alt="Google" className="w-6 h-6" />
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
