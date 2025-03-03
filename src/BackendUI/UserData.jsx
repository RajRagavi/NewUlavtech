import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AOS from "aos";
import "aos/dist/aos.css";

const UserData = () => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      plans: [
        { name: "SeedPlan", amount: 1000 }, 
        { name: "SproutPlan", amount: 500 }
      ]
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com", 
      plans: [] 
    },
    { 
      id: 3, 
      name: "Michael Johnson", 
      email: "michael@example.com", 
      plans: [
        { name: "RootPlan", amount: 2000 }
      ]
    }
  ]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const getTotalInvestment = (plans) => plans.reduce((sum, plan) => sum + plan.amount, 0);
  const getStatus = (plans) => (getTotalInvestment(plans) > 0 ? "Active" : "Inactive");

  const withdrawAllInvestment = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, plans: [] } : user
      )
    );
  };

  const investAgain = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { 
              ...user, 
              plans: [
                { name: "SeedPlan", amount: 1000 },
                { name: "SproutPlan", amount: 500 },
                { name: "RootPlan", amount: 2000 }
              ] 
            }
          : user
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-gray-200 mt-30">
      <Sidebar />

      <div className="p-6 bg-gray-100 min-h-screen w-full">
        <h1 className="text-2xl font-semibold mb-4" data-aos="fade-down">
          User Data
        </h1>

      
        <div className="md:hidden space-y-4">
          {users.map((user, index) => {
            const totalInvestment = getTotalInvestment(user.plans);
            const status = getStatus(user.plans);

            return (
              <div key={index} className="bg-white shadow-md rounded-lg p-4" data-aos="fade-up">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm"><strong>Plans:</strong> {user.plans.length > 0 ? user.plans.map(plan => plan.name).join(", ") : "No Plans"}</p>
                <p className="text-sm"><strong>Total Investment:</strong> ₹{totalInvestment}</p>
                <p className={`text-sm font-semibold ${status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  <strong>Status:</strong> {status}
                </p>
                <div className="mt-2">
                  {status === "Active" ? (
                    <button onClick={() => withdrawAllInvestment(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Withdraw All
                    </button>
                  ) : (
                    <button onClick={() => investAgain(user.id)} className="bg-green-500 text-white px-3 py-1 rounded">
                      Invest Again
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

       
        <div className="hidden md:block overflow-x-auto" data-aos="fade-up">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Plans</th>
                <th className="py-2 px-4 text-left">Total Investment</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const totalInvestment = getTotalInvestment(user.plans);
                const status = getStatus(user.plans);

                return (
                  <tr key={index} className="border-b hover:bg-gray-100" data-aos="fade-up">
                    <td className="py-2 px-4">{user.id}</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">
                      {user.plans.length > 0 ? user.plans.map((plan) => plan.name).join(", ") : "No Plans"}
                    </td>
                    <td className="py-2 px-4">₹{totalInvestment}</td>
                    <td className={`py-2 px-4 font-semibold ${status === "Active" ? "text-green-600" : "text-red-600"}`}>
                      {status}
                    </td>
                    <td className="py-2 px-4">
                      {status === "Active" ? (
                        <button
                          onClick={() => withdrawAllInvestment(user.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Withdraw All
                        </button>
                      ) : (
                        <button
                          onClick={() => investAgain(user.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Invest Again
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default UserData;
