
const menuItems = [
  { name: "Overview", icon: "▦" },
  { name: "Products", icon: "◇" },
  { name: "Categories", icon: "▤" },
  { name: "Orders", icon: "🛍" },
  { name: "Customers", icon: "♙" },
  { name: "Discounts & Coupons", icon: "%" },
  { name: "Payments", icon: "↗" },
  { name: "Feedback", icon: "✉" },
  { name: "Inventory", icon: "▥" },
  { name: "Reports", icon: "▧" },
  { name: "Settings", icon: "⚙" },
];

function AdminSidebar({
  activePage,
  setActivePage,
  mobileMenuOpen,
  setMobileMenuOpen,
  onLogout,
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/[0.08] bg-[#151515] transition-transform duration-300 lg:static lg:translate-x-0 ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-20 items-center justify-between border-b border-white/[0.08] px-6">
        <div>
          <p className="text-xl font-bold tracking-[0.18em]">
            EURO<span className="text-amber-400">SHEIN</span>
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gray-500">
            Administration
          </p>
        </div>

        <button
          onClick={() => setMobileMenuOpen(false)}
          className="text-xl text-gray-400 lg:hidden"
          aria-label="Close menu"
        >
          ×
        </button>
      </div>

      <div className="px-5 pb-3 pt-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
          Store management
        </p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActivePage(item.name);
              setMobileMenuOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
              activePage === item.name
                ? "bg-amber-400 font-semibold text-black"
                : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            <span className="flex w-5 justify-center text-base">
              {item.icon}
            </span>
            {item.name}
          </button>
        ))}
      </nav>

      <div className="border-t border-white/[0.08] p-4">
        <button
          onClick={() => (window.location.href = "/")}
          className="mb-2 w-full rounded-lg px-4 py-2.5 text-left text-sm text-gray-400 hover:bg-white/[0.05] hover:text-white"
        >
          ↗ View storefront
        </button>

        <button
          onClick={onLogout}
          className="w-full rounded-lg px-4 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10"
        >
          ⇥ Sign out
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
