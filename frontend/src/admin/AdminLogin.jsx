
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      if (!data.token || data.user?.role !== "ADMIN") {
        throw new Error("Admin access could not be verified.");
      }

      sessionStorage.setItem("eurosheinAdminToken", data.token);
      sessionStorage.setItem(
        "eurosheinAdminUser",
        JSON.stringify(data.user)
      );

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that your backend is running."
          : err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1b1b1b] p-8 shadow-2xl sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            EUROshein
          </p>

          <h1 className="mt-5 text-3xl font-semibold text-white">
            Admin Login
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Sign in to manage your store.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Admin email
            </label>

            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your admin email"
              required
              className="w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-amber-400"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Password
            </label>

            <div className="flex rounded-lg border border-white/10 bg-[#111111] focus-within:border-amber-400">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-gray-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-4 text-sm text-amber-400 hover:text-amber-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-400 py-3.5 font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In to Admin"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-500">
          Authorized administrators only.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
