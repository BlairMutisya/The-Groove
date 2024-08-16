import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function AdminSignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok && data.role === "admin") {
      // Store token and redirect to admin dashboard
      localStorage.setItem("token", data.token);
      // Redirect to the admin dashboard
      navigate("/dashboard"); // Use relative path
    } else {
      setError("Invalid credentials or not an admin.");
    }
  } catch (error) {
    console.error("Login error:", error);
    setError("An error occurred. Please try again.");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover bg-[url('https://static.dezeen.com/uploads/2023/02/the-lymbar_gin-design-group_leonid-furmansky_dezeen_2364_col_15.jpg')]">
      <div className="bg-white bg-opacity-40 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 border rounded-lg bg-white bg-opacity-90"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="******"
              className="w-full px-4 py-2 border rounded-lg bg-white bg-opacity-90"
            />
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Forgot Password?
              </a>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg flex items-center justify-center"
          >
            SIGN IN
            <MdOutlineKeyboardArrowRight className="ml-2" />
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-500 hover:underline">
            Signup
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminSignIn;
