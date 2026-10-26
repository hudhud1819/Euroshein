
import { useState } from "react";

function Login({ isOpen, onClose, onSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/customer/login",
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

      if (!data.token || !data.user) {
        throw new Error("The server returned an invalid login response.");
      }

      // Store the token for authenticated API requests.
      // For a production storefront, prefer secure HttpOnly cookies.
      sessionStorage.setItem("eurosheinToken", data.token);
      sessionStorage.setItem(
        "eurosheinUser",
        JSON.stringify(data.user)
      );
window.dispatchEvent(new Event("euroshein-auth-changed"));
      setSuccess(`Welcome back, ${data.user.name}!`);
      setPassword("");

      // Close the popup after successful login.
      // The token remains available to the app in this browser tab.
      onClose();
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that your backend is running."
          : err.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        className="relative my-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close login popup"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-2xl text-gray-500 transition hover:bg-gray-100 hover:text-black disabled:opacity-50"
        >
          ×
        </button>

        <div className="mb-7 text-center">
          <a
            href="/"
            className="text-2xl font-black tracking-[0.15em] text-black"
          >
            EUROSHEIN
          </a>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Welcome Back
          </p>

          <h2
            id="login-title"
            className="mt-2 text-2xl font-bold text-gray-900"
          >
            Sign in to your account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Welcome back! Enter your details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email address
            </label>

            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              required
              className={inputClass}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="login-password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <a
                href="/forgot-password"
                className="text-xs font-medium text-gray-600 hover:text-black hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                required
                className={`${inputClass} pr-16`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-600 hover:text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="rounded-lg bg-green-50 p-3 text-sm text-green-800"
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSignup}
            disabled={isLoading}
            className="font-bold text-black underline underline-offset-4 hover:text-gray-600"
          >
            Sign up
          </button>
        </p>

        <p className="mt-7 text-center text-xs text-gray-400">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Login;
