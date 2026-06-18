import React, { useState } from "react";

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => onNavigate("login"), 2000);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (err) {
      setMessage("Cannot connect to backend server.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-black text-emerald-950 text-center">
        Create an Account
      </h2>
      <p className="text-xs text-center text-gray-500 mt-1">
        Join the MarketMeld Artisan network
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-1 uppercase">
            Full Name
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-emerald-800"
            placeholder="John Doe"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-1 uppercase">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-emerald-800"
            placeholder="you@example.com"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-1 uppercase">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-emerald-800"
            placeholder="••••••••"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        {message && (
          <p className="text-xs font-semibold text-emerald-800 text-center">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-emerald-900 text-white font-bold py-2.5 rounded-lg text-sm hover:bg-emerald-950 transition-all"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-gray-500">
        Already have an account?{" "}
        <button
          onClick={() => onNavigate("login")}
          className="text-emerald-800 font-bold hover:underline"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
