import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


// const backgroundImage = require('./../assets/Frank Gehry Architecture.jpeg')
// style={{ backgroundImage: url(${backgroundImage}) }}
function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover bg-[url('https://static.dezeen.com/uploads/2023/02/the-lymbar_gin-design-group_leonid-furmansky_dezeen_2364_col_15.jpg')]">
      <div className="bg-white bg-opacity-40 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome back</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="test1@gmail.com"
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
              placeholder="******"
              className="w-full px-4 py-2 border rounded-lg bg-white bg-opacity-90"
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
        {/* <div className="my-6 text-center text-gray-600">Or login with</div>
        <div className="flex space-x-4 justify-center">
          <button className="bg-black text-white py-2 px-4 rounded-lg flex items-center justify-center">
            <FaGoogle />
          </button>
          <button className="bg-black text-white py-2 px-4 rounded-lg flex items-center justify-center">
            <FaApple />
          </button>
          <button className="bg-black text-white py-2 px-4 rounded-lg flex items-center justify-center">
            <FaFacebookF />
          </button>
        </div> */}
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
