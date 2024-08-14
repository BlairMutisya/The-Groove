import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function SignUp() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "", 
    email: "",
    password: "",
    role: "client", // Default role
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
      isValid = false;
    }

    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData), // Send formData as is
        });

        const data = await response.json();

        if (response.ok) {
          console.log("User registered:", data);
          setSuccessMessage(
            "Registration successful! Please check your email to verify your account."
          );
        } else {
          console.error("Registration failed:", data);
          setErrors((prevErrors) => ({
            ...prevErrors,
            backend: data.error || "Registration failed",
          }));
        }
      } catch (error) {
        console.error("Error registering:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover bg-[url('https://static.dezeen.com/uploads/2023/02/the-lymbar_gin-design-group_leonid-furmansky_dezeen_2364_col_15.jpg')]">
      <div className="bg-white bg-opacity-40 backdrop-blur-lg p-4 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-6">Create Account</h2>
        {successMessage ? (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-2" htmlFor="first_name">
                First Name
              </label>
              <input
                type="text"
                id="first_name" // Updated to match backend
                value={formData.first_name}
                onChange={handleChange}
                placeholder="John"
                className="w-full px-4 py-2 border rounded-lg bg-white bg-opacity-90"
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2" htmlFor="last_name">
                Last Name
              </label>
              <input
                type="text"
                id="last_name" // Updated to match backend
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full px-4 py-2 border rounded-lg bg-white bg-opacity-90"
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="test@gmail.com"
                className="w-full px-4 py-2 border rounded-lg bg-white bg-opacity-90"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
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
                placeholder="**********"
                className="w-full px-4 py-2 border rounded-lg bg-white bg-opacity-90"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            {errors.backend && (
              <p className="text-red-500 text-xs mt-1 text-center">
                {errors.backend}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg flex items-center justify-center"
            >
              CREATE ACCOUNT
              <MdOutlineKeyboardArrowRight className="ml-2" />
            </button>
          </form>
        )}
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-green-500 hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
