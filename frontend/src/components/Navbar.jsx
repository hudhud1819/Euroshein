
import { useEffect, useState } from "react";

function Navbar({ onLoginClick, onSignupClick }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () =>
      typeof window !== "undefined" &&
      Boolean(sessionStorage.getItem("eurosheinToken"))
  );

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("eurosheinUser") || "null");
    } catch {
      return null;
    }
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Update the navbar when login succeeds.
  useEffect(() => {
    function updateAuth() {
      const token = sessionStorage.getItem("eurosheinToken");

      setIsLoggedIn(Boolean(token));

      try {
        setUser(
          JSON.parse(sessionStorage.getItem("eurosheinUser") || "null")
        );
      } catch {
        setUser(null);
      }
    }

    window.addEventListener("euroshein-auth-changed", updateAuth);
    window.addEventListener("storage", updateAuth);

    return () => {
      window.removeEventListener("euroshein-auth-changed", updateAuth);
      window.removeEventListener("storage", updateAuth);
    };
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("eurosheinToken");
    sessionStorage.removeItem("eurosheinUser");

    setIsLoggedIn(false);
    setUser(null);
    setIsProfileOpen(false);

    window.dispatchEvent(new Event("euroshein-auth-changed"));
  }

  const linkClass =
    "transition hover:text-gray-500";

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white px-5 py-4 shadow-sm sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">

        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-black tracking-wider text-black"
        >
          EUROSHEIN
        </a>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-800">
          <a href="/" className={linkClass}>Home</a>
          <a href="/shop" className={linkClass}>Shop</a>
          <a href="/women" className={linkClass}>Women</a>
          <a href="/men" className={linkClass}>Men</a>
          <a href="/accessories" className={linkClass}>Accessories</a>
          <a href="/sale" className="font-bold text-red-600">Sale</a>
        </div>

        {/* Search and account actions */}
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            className="w-36 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-black sm:w-44"
          />

          {!isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={onLoginClick}
                className="text-sm font-semibold text-gray-800 transition hover:text-gray-500"
              >
                Login
              </button>

              <button
                type="button"
                onClick={onSignupClick}
                className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative">
              {/* Profile dropdown trigger */}
              <button
                type="button"
                onClick={() => setIsProfileOpen((open) => !open)}
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 transition hover:border-black"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-800">
                  {(user?.name || "U").charAt(0).toUpperCase()}
                </span>

                <span className="max-w-28 truncate text-sm font-semibold text-gray-800">
                  {user?.name || "My Account"}
                </span>

                <span className="text-xs text-gray-500">
                  {isProfileOpen ? "▲" : "▼"}
                </span>
              </button>

              {/* Dropdown menu */}
              {isProfileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
                >
                  <div className="border-b border-gray-100 px-4 py-4">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {user?.name || "Customer"}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {user?.email || ""}
                    </p>
                  </div>

                  <div className="p-2">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setIsProfileOpen(false);
                        window.dispatchEvent(
                          new CustomEvent("euroshein-open-profile")
                        );
                      }}
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                    >
                      <span className="mr-2">👤</span>
                      My Profile
                    </button>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setIsProfileOpen(false);
                        window.dispatchEvent(
                          new CustomEvent("euroshein-open-orders")
                        );
                      }}
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                    >
                      <span className="mr-2">📦</span>
                      My Orders
                    </button>

<button
  type="button"
  role="menuitem"
  onClick={() => {
    setIsProfileOpen(false);
    window.dispatchEvent(
      new CustomEvent("euroshein-open-settings")
    );
  }}
  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-100"
>
  <span className="mr-2">⚙️</span>
  Settings
</button>

<button
  type="button"
  role="menuitem"
  onClick={() => {
    setIsProfileOpen(false);
    window.dispatchEvent(
      new CustomEvent("euroshein-open-feedback")
    );
  }}
  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-100"
>
  <span className="mr-2">💬</span>
  Feedback
</button>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <span className="mr-2">↪</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Wishlist */}
          <button
            type="button"
            aria-label="Wishlist"
            className="text-2xl transition hover:scale-110 hover:text-gray-500"
          >
            ♡
          </button>

          {/* Shopping cart */}
          <button
            type="button"
            aria-label="Shopping cart"
            className="text-xl transition hover:scale-110"
          >
            🛍
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
