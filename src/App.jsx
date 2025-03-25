import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase/firebaseConfig"; 

import Home from "./pages/Home";
import About from "./pages/About";
import Investment from "./pages/Investment";
import Project from "./pages/Project";
import Gallery from "./pages/Gallery";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Contactus from "./pages/Contactus";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./BackendUI/Dashboard";
import UserData from "./BackendUI/UserData";
import SeedPlan from "./BackendUI/SeedPlan";
import RootPlan from "./BackendUI/RootPlan";
import SproutPlan from "./BackendUI/SproutPlan";
import InvestForm from "./BackendUI/InvestForm";
import InvestmentsList from "./BackendUI/InvestmentsList";
import Maturity from "./BackendUI/Maturity";

//  Protected Route Component
const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // True if user exists, false otherwise
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>; // Prevent flickering

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

// Layout Component
function Layout() {
  const location = useLocation();
  const hideNavbarFooterRoutes = ["/dashboard", "/user-data", "/plans/seed", "/plans/root", "/plans/sprout", "/register", "/signin", "/invest","/maturity"];
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/project" element={<Project />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactus" element={<Contactus />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-data" element={<UserData />} />
          <Route path="/plans/seed" element={<SeedPlan />} />
          <Route path="/plans/root" element={<RootPlan />} />
          <Route path="/plans/sprout" element={<SproutPlan />} />
          <Route path="/invest" element={<InvestForm />} />
          <Route path="/investmentsList" element={<InvestmentsList />} />
          <Route path="/maturity" element={<Maturity />}/>
        </Route>
      </Routes>

      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
}

//  Main App Component
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
