import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const SeedPlan = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full bg-gray-200 ">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gradient-to-r from-green-200 to-green-50 py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-green-800 text-center mb-4">🌱 Seed Plan</h1>
          <p className="text-gray-700 text-center mb-6">
            The Seed Plan is designed for small investors who want to start with a low-risk agricultural investment.
          </p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-green-900">Minimum Investment</h3>
              <p className="text-green-700 font-bold">₹5000</p>
            </div>

            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-green-900">Maximum Investment</h3>
              <p className="text-green-700 font-bold">₹50000</p>
            </div>

            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-green-900">Average Return</h3>
              <p className="text-green-700 font-bold">12% per annum</p>
            </div>

            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-green-900">Duration</h3>
              <p className="text-green-700 font-bold">12 months</p>
            </div>
          </motion.div>

          <div className="text-center mt-8">
          <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              onClick={() => navigate("/invest")}
            >
              Invest Now
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default SeedPlan;
