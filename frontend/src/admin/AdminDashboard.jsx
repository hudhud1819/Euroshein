
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import Overview from "./Overview";
import Products from "./Products";
import Categories from "./Categories";


function AdminDashboard() {
  
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [customerCount, setCustomerCount] = useState(0);

useEffect(() => {
  async function fetchDashboardStats() {
    const token = sessionStorage.getItem("eurosheinAdminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load dashboard stats.");
      }

      setCustomerCount(data.stats.customerCount);
    } catch (error) {
      console.error("Dashboard statistics error:", error);
    }
  }

  fetchDashboardStats();
}, [navigate]);
  function handleLogout() {
    sessionStorage.removeItem("eurosheinAdminToken");
    sessionStorage.removeItem("eurosheinAdminUser");
    navigate("/admin/login");
  }

  const userText = sessionStorage.getItem("eurosheinAdminUser");
  let adminName = "Administrator";

  try {
    const user = JSON.parse(userText || "null");
    if (user?.name) adminName = user.name;
  } catch {
    // Use the default name if saved user data is unavailable.
  }

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <div className="flex min-h-screen">
       <AdminSidebar
  activePage={activePage}
  setActivePage={setActivePage}
  mobileMenuOpen={mobileMenuOpen}
  setMobileMenuOpen={setMobileMenuOpen}
  onLogout={handleLogout}
/>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <button
            aria-label="Close navigation"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          />
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1">
         <AdminHeader
  activePage={activePage}
  onMenuClick={() => setMobileMenuOpen(true)}
/>

          <div className="mx-auto max-w-[1600px] space-y-8 p-4 sm:p-8">
 {activePage === "Overview" ? (
  <Overview
    customerCount={customerCount}
    adminName={adminName}
    setActivePage={setActivePage}
  />
) : activePage === "Categories" ? (
  <Categories />
) : activePage === "Products" ? (
  <Products />
) : (
  <section className="rounded-xl border border-white/[0.08] bg-[#171717] p-6 sm:p-10">
    <p className="text-sm text-amber-400">STORE MANAGEMENT</p>
    <h2 className="mt-3 text-2xl font-semibold">{activePage}</h2>
    <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
      This section has not been connected yet.
    </p>
    <button
      onClick={() => setActivePage("Overview")}
      className="mt-6 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-300"
    >
      Back to overview
    </button>
  </section>
)}
          </div>
        </main>
      </div>                           
    </div>
  );
}

export default AdminDashboard;
