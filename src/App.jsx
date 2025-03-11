import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

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

function Layout() {
  const location = useLocation();


  const hideNavbarFooterRoutes = ["/dashboard", "/user-data", "/plans/seed","/plans/root","/plans/sprout","/register","/signin","/invest"];

  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname);

  return (
    <>
 
      {!shouldHideNavbarFooter && <Navbar />}

      <Routes>
    
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/project" element={<Project />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactus" element={<Contactus />} />

     
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-data" element={<UserData />} />
        <Route path="/plans/seed" element={<SeedPlan />} />
        <Route path="/plans/root" element={<RootPlan />} />
        <Route path="/plans/sprout" element={<SproutPlan />} />
        <Route path="/invest" element={<InvestForm />} />
      </Routes>

   
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
