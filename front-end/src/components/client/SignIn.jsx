import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    const signInUrl = "https://the-groove.onrender.com/signin";

    try {
      const response = await fetch(signInUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { access_token } = data;

        // Save token to localStorage
        localStorage.setItem("authToken", access_token);

        // Redirect to homepage
        navigate("/");
      } else {
        // Handle specific error messages
        const errorMessage =
          data.error || "An error occurred. Please try again.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover bg-[url('https://static.dezeen.com/uploads/2023/02/the-lymbar_gin-design-group_leonid-furmansky_dezeen_2364_col_15.jpg')]">
      <div className="bg-white bg-opacity-40 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="test1@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white bg-opacity-90"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white bg-opacity-90"
              required
            />
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Forgot Password?
              </a>
            </div>
          </div>
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

export default SignIn;
