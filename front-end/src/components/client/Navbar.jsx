import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking authToken in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); // Update login state
    navigate("/login"); // Redirect to login page
  };

  return (
    <header>
      <div className="flex justify-between items-center w-full h-14 fixed text-black px-4 bg-[#FCE8CF] shadow-md p-8 z-50">
        <div>
          <h1 className="text-2xl md:text-4xl font-signature ml-2">
            The Groove
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center space-x-4 font-bold">
          <NavLink
            to="/"
            className="cursor-pointer hover:scale-105 duration-200"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="cursor-pointer hover:scale-105 duration-200"
          >
            About
          </NavLink>
          <NavLink
            to="/spacelist"
            className="cursor-pointer hover:scale-105 duration-200"
          >
            SpaceList
          </NavLink>
          <NavLink
            to="/agents"
            className="cursor-pointer hover:scale-105 duration-200"
          >
            Agents
          </NavLink>
          <NavLink
            to="/contact"
            className="cursor-pointer hover:scale-105 duration-200"
          >
            Contact
          </NavLink>
        </div>

        {/* Account and Menu Icons */}
        <div className="flex cursor-pointer md:pr-4 z-10">
          <ul className="flex space-x-4">
            {!isLoggedIn ? (
              <>
                <li>
                  <VscAccount size={30} />
                </li>

                {/* Dropdown Menu */}
                <li className="relative">
                  <div className="flex items-center" onClick={toggleDropdown}>
                    <MdOutlineKeyboardArrowDown size={24} className="ml-2" />
                  </div>

                  {/* Dropdown Links */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#FCE8CF] border-gray-200 rounded-lg shadow-lg z-10">
                      <Link
                        to="/adminsignin"
                        className="block px-4 py-2 text-gray-700 hover:bg-[#fff3e5]"
                      >
                        Admin
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-gray-700 hover:bg-[#fff3e5]"
                      >
                        Client
                      </Link>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-700 hover:bg-[#fff3e5]"
              >
                Logout
              </button>
            )}

            {/* Mobile Menu Icon */}
            <li className="md:hidden" onClick={toggleNav}>
              {navOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-14 left-0 w-full bg-[#FCE8CF] z-40 transition-transform duration-300 ease-in-out ${
          navOpen ? "transform translate-y-0" : "transform -translate-y-full"
        } md:hidden`}
      >
        <ul className="flex flex-col items-center space-y-4 py-6">
          <li>
            <NavLink
              to="/"
              onClick={toggleNav}
              className="cursor-pointer hover:scale-105 duration-200"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={toggleNav}
              className="cursor-pointer hover:scale-105 duration-200"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/spacelist"
              onClick={toggleNav}
              className="cursor-pointer hover:scale-105 duration-200"
            >
              SpaceList
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/agents"
              onClick={toggleNav}
              className="cursor-pointer hover:scale-105 duration-200"
            >
              Agents
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={toggleNav}
              className="cursor-pointer hover:scale-105 duration-200"
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
