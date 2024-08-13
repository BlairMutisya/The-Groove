import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const About = () => {
  return (
    <div className="bg-[#FAE5D3] text-black font-sans">
      {/* Top Section */}
      <div className="max-w-screen-lg mx-auto py-16 px-9 flex flex-col md:flex-row items-center -ml-1">
        <div className="md:w-1/2 mb-8 md:mb-0 -ml-0 mt-9">
          <img
            src="https://i.pinimg.com/474x/95/2f/44/952f44eaca237055954b696e3b607808.jpg"
            alt="Office Space"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-12 text-center md:text-left -mt-18">
          <h3 className="text-xl font-bold text-purple-700">ABOUT US</h3>
          <h2 className="text-4xl font-bold mt-4 mb-6">
            We are The Best Space Renting Company
          </h2>
          <p className="text-lg mb-6">
            At The Groove, we specialize in providing exceptional spaces for
            rent that cater to a variety of needs and events. Whether you're
            planning a corporate meeting, hosting a private event, or looking
            for a versatile space for a creative project, we've got you covered.
          </p>
          <h3 className="text-4xl font-bold mt-4 mb-6">Our Mission</h3>
          <p className="text-lg mb-6">
            Our mission is to deliver outstanding spaces that enhance every
            event and project. We understand that finding the right venue can
            make all the difference, whether it's for a corporate gathering, a
            private celebration, or a creative endeavor.
          </p>
          <button className="bg-[#79a9c2] text-white px-6 py-3 rounded-full shadow hover:bg-[#5299be] transition duration-300">
            More About Us
          </button>
        </div>
      </div>

      {/* Facts Section */}
      <div className="relative bg-white py-18 h-full ">
        {/* Image Placeholder */}
        <img
          src="https://i.pinimg.com/474x/75/bb/7a/75bb7ad43a5ce65090276c92d976f863.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        <div
          className="relative max-w-screen-lg mx-auto px-4 py-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg"
          style={{ margin: "0 2cm" }}
        >
          <h2 className="text-center text-3xl font-bold mb-12">
            The Groove Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-700">1M+</h3>
              <p className="text-gray-600">Spaces Delivered This Month</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-700">37K+</h3>
              <p className="text-gray-600">Active Customers</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-700">99%</h3>
              <p className="text-gray-600">Customer Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-700">25</h3>
              <p className="text-gray-600">Expert Team Members</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-700">42%</h3>
              <p className="text-gray-600">Customers Retention Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#FAE5D3] py-12">
        <div className="max-w-screen-lg mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">The Groove</h3>
            <p className="text-gray-700">(+254) 758 012 249</p>
            <p className="text-gray-700">info@The-Groove.co.ke</p>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Address</h3>
            <p className="text-gray-700">P.O.BOX 10253-00400</p>
            <p className="text-gray-700">
              4th Floor Royal Offices, 26 Mogotio Road, Westlands, Nairobi,
              Kenya
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-700 hover:text-purple-700 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-700 hover:text-purple-700 transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/spacelist"
                  className="text-gray-700 hover:text-purple-700 transition"
                >
                  SpaceList
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-700 hover:text-purple-700 transition"
                >
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-screen-lg mx-auto px-4 mt-8 flex justify-between items-center">
          <p className="text-gray-600">
            © 2024 The Groove. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-700 hover:text-purple-700 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-700 transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-700 transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-700 transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
