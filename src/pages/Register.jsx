import React, { useState } from "react";
import Fruits from '../assets/img/veggies.jpg';
import Google from '../assets/img/Google.png';
import Fb from '../assets/img/Fb.png';
import Insta from '../assets/img/Insta.png';
import Logo from '../assets/img/logo.png';

import { auth, googleProvider } from "../firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Register = () => {

  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    otp: "",
    verificationId: null,
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Generate OTP for Phone Verification
  const generateOTP = () => {
    if (!form.phone) {
      alert("Please enter your phone number!");
      return;
    }
  
    // Ensure ReCAPTCHA is set up properly
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        console.log("ReCAPTCHA solved:", response);
      },
      "expired-callback": () => {
        alert("ReCAPTCHA expired. Please try again.");
      }
    });
  
    const phoneNumber = `+91${form.phone}`;
  
    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setForm((prevForm) => ({ ...prevForm, verificationId: confirmationResult }));
        alert("OTP Sent Successfully!");
      })
      .catch((error) => {
        console.error("OTP Error:", error);
        alert(error.message);
      });
  };
  // Verify OTP
  const verifyOTP = () => {
    if (!form.verificationId) {
      alert("Please generate OTP first.");
      return;
    }

    form.verificationId
      .confirm(form.otp)
      .then((result) => {
        alert("Phone Verified Successfully!");
      })
      .catch((error) => {
        alert("Invalid OTP");
      });
  };

  // Register User with Email and Password
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    
    if (!form.email.includes("@") || form.password.length < 6) {
      alert("Invalid email or password (must be at least 6 characters)");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      alert("User Registered Successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Login Successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen  mt-60 mb-30 flex items-center justify-center ">
      <div className="w-3/4 max-w-4xl bg-white rounded-lg shadow-lg flex">

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
          <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 mb-2 border border-gray-300 rounded-lg text-sm"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              className="w-full p-3 mb-2 border border-gray-300 rounded-lg text-sm"
              value={form.phone}
              onChange={handleChange}
            />

            {/* OTP Section */}
            {/* <div className="flex gap-x-2">
              <button type="button" onClick={generateOTP} className="w-1/2 p-3 mb-2 border border-gray-300 rounded-lg text-sm bg-gray-300">
                Generate OTP
              </button>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="w-1/2 p-3 mb-2 border border-gray-300 rounded-lg text-sm"
                value={form.otp}
                onChange={handleChange}
              />
              <button type="button" onClick={verifyOTP} className="p-2 text-white bg-green-600 rounded-lg">Verify</button>
            </div> */}

            {/* Email & Password */}
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              className="w-full p-3 mb-2 border border-gray-300 rounded-lg text-sm"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 mb-2 border border-gray-300 rounded-lg text-sm"
              value={form.password}
              onChange={handleChange}
            />

            <button type="submit" className="w-full p-3 bg-black text-white rounded-lg font-semibold cursor-pointer">
              Sign Up
            </button>
          </form>

          {/* OR Section */}
          <div className="flex items-center my-4">
            <div className="border-t w-full"></div>
            <p className="px-3 text-black">Or</p>
            <div className="border-t w-full"></div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center space-x-4 mb-4">
            <button className="p-2 cursor-pointer hover:shadow">
              <img src={Fb} alt="Facebook" className="w-6 h-6" />
            </button>
            <button onClick={handleGoogleLogin} className="p-2 cursor-pointer hover:shadow">
              <img src={Google} alt="Google" className="w-6 h-6" />
            </button>
            <button className="p-2 cursor-pointer hover:shadow">
              <img src={Insta} alt="Instagram" className="w-6 h-6" />
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
