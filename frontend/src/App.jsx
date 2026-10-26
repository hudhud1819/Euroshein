
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import NewArrivals from "./components/NewArrivals";
import PromoBanners from "./components/PromoBanners";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  function openLogin() {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  }

  function openSignup() {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  }

  return (
    <>
      <TopBar />

      <Navbar
        onLoginClick={openLogin}
        onSignupClick={openSignup}
      />

      <Hero />
      <Categories />
      <NewArrivals />
      <PromoBanners />
      <Features />
      <Footer />

      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignup={openSignup}
      />

      <Signup
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onLogin={openLogin}
      />
    </>
  );
}

function AdminDashboardPlaceholder() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111] px-4 text-center text-white">
      <div>
        <h1 className="text-3xl font-semibold">
          Euroshein Admin Dashboard
        </h1>
        <p className="mt-3 text-gray-400">
          Your admin login works. We'll build the dashboard next.
        </p>
      </div>
    </div>
  );
}

function ProtectedAdminDashboard() {
  const token = sessionStorage.getItem("eurosheinAdminToken");
  const userText = sessionStorage.getItem("eurosheinAdminUser");

  let isAdmin = false;

  try {
    const user = JSON.parse(userText || "null");
    isAdmin = Boolean(token && user?.role === "ADMIN");
  } catch {
    isAdmin = false;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminDashboard />;
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={<ProtectedAdminDashboard />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
