  import React from 'react';
  import Fruits from '../assets/img/veggies.jpg';
  import Google from '../assets/img/Google.png';
  import Fb from '../assets/img/Fb.png';
  import Insta from '../assets/img/Insta.png';
  import Logo from '../assets/img/logo.png'; 

  const Signin = () => {
    return (
      <div className="h-screen flex items-center justify-center  mt-40 mb-20">
        <div className="w-3/4 max-w-4xl bg-white rounded-lg shadow-lg flex">
          {/* Left Side - Image */}
          <div className="w-1/2 hidden md:block">
            <img
              src={Fruits}
              alt="Vegetables"
              className="w-full h-full object-cover rounded-l-lg border-8 border-white"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            {/* Logo */}
            <div className="flex items-center mb-6">
            <img src={Logo} alt="UlavTech Logo" className="w-30 h-30 mr-[-30px]" />
              <h2 className="text-4xl font-bold text-green-700">UlavTech</h2>
            </div>

            {/* Welcome Text */}
            <h2 className="text-2xl font-bold mb-4">Hello, <br />Welcome Back</h2>
            <p className="text-gray-500 mb-2 text-sm">Login to your UlavTech account</p>

            {/* Login Form */}
            <form>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 mb-3 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-3 border border-gray-300 rounded-lg text-sm"
              />
              <div className="text-right mb-4">
                <a href="#" className="text-blue-500 text-sm">Forgot your Password?</a>
              </div>
              <button className="w-full p-3 bg-black text-white rounded-lg font-semibold cursor-pointer hover:bg-gray-800 transition">
                Login
              </button>
            </form>

            {/* OR Section */}
            <div className="flex items-center my-4">
              <div className="border-t w-full"></div>
              <p className="px-3 text-gray-500">Or</p>
              <div className="border-t w-full"></div>
            </div>

            {/* Social Login */}
            
            <div className="flex justify-center  space-x-4 mb-4">
              <button className="p-2  cursor-pointer hover:shadow">
                <img src={Fb} alt="Facebook" className="w-6 h-6" />
              </button>
              <button className="p-2  cursor-pointer hover:shadow">
                <img src={Google} alt="Google" className="w-6 h-6" />
              </button>
              <button className="p-2  cursor-pointer hover:shadow">
                <img src={Insta} alt="Instagram" className="w-6 h-6" />
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-gray-500 text-sm text-center">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-500 font-semibold">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default Signin;
