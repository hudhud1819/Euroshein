
import { useState } from "react";

function Signup({ isOpen, onClose, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  function handleChange(event) {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    if (formData.password.length > 72) {
      setError("Your password must not exceed 72 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/customer/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess(
        data.message || "Account created successfully! Please log in."
      );

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

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
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        className="relative my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close sign up popup"
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
            Join Euroshein
          </p>

          <h2
            id="signup-title"
            className="mt-2 text-2xl font-bold text-gray-900"
          >
            Create your account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Sign up to discover your next favorite look.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="signup-firstName"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                First name
              </label>
              <input
                id="signup-firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
                maxLength={100}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="signup-lastName"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Last name
              </label>
              <input
                id="signup-lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                maxLength={100}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email address
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              maxLength={72}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="signup-confirmPassword"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Confirm password
            </label>
            <input
              id="signup-confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter your password again"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(event) =>
                setShowPassword(event.target.checked)
              }
              className="h-4 w-4 accent-black"
            />
            Show passwords
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {success && (
            <div
              role="status"
              className="rounded-lg bg-green-50 p-3 text-sm text-green-800"
            >
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onLogin}
            disabled={isLoading}
            className="font-bold text-black underline underline-offset-4 hover:text-gray-600"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
