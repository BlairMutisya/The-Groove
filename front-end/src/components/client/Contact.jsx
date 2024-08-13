import React from "react";
import Navbar from "./Navbar"; // Adjust the path as necessary
import Footer from "./Footer"; // Adjust the path as necessary

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow bg-[#FDE7D5] flex justify-center items-center">
        <div className="max-w-6xl mx-auto bg-[#fde8d5] rounded-lg flex flex-col md:flex-row overflow-hidden mt-20">
          {/* Left Image Section */}
          <div className="w-full md:w-1/2 h-auto">
            <img
              src="https://i.pinimg.com/736x/3d/3b/f1/3d3bf125f457d91d6433cf92668c9d8c.jpg"
              alt="Branding"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Right Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-3xl font-semibold mb-4">
              Let’s level up our brand, together
            </h1>
            <p className="text-sm mb-4">
              You can reach us anytime via{" "}
              <a
                href="mailto:info@The-Groove.co.ke"
                className="text-purple-600"
              >
                info@The-Groove.co.ke
              </a>
            </p>

            {/* Form */}
            <form action="#" method="POST" className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email address"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter phone number"
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell us a little about the project..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  Submit Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
