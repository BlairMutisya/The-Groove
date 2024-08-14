import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaFilter,
  FaSignOutAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("allSpaces");
  const [spaces, setSpaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newSpace, setNewSpace] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    image_url: "",
    status: "Available",
    rating: "",
    user_id: "",
  });
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication and role
    checkAuth();

    // Fetch initial data
    fetchAllSpaces();
    fetchAllUsers();
    fetchBookedSpaces();
  }, []);

  const checkAuth = async () => {
    const response = await fetch("/api/auth/check", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      if (data.role !== "admin") {
        navigate("/adminsignin");
      } else {
        setUserRole(data.role);
      }
    } else {
      navigate("/adminsignin");
    }
  };

  const fetchAllSpaces = async () => {
    const response = await fetch("http://localhost:5000/spaces");
    const data = await response.json();
    setSpaces(data);
  };

  const fetchAllUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };

 const fetchBookedSpaces = async () => {
   const response = await fetch("http://localhost:5000/bookings");
   const data = await response.json();
   console.log(data); // Log the response data
   if (Array.isArray(data)) {
     setBookings(data);
   } else {
     console.error("Expected an array but received:", data);
     setBookings([]); // Set to empty array if data is not an array
   }
 };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpace({ ...newSpace, [name]: value });
  };

  const addSpace = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/spaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSpace),
    });

    if (response.ok) {
      alert("Space added successfully!");
      setNewSpace({
        name: "",
        description: "",
        location: "",
        price: "",
        image_url: "",
        status: "Available",
        rating: "",
        user_id: "",
      });
      fetchAllSpaces();
    } else {
      alert("Failed to add space.");
    }
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/adminsignin");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white shadow-lg">
        <div className="p-4 text-2xl font-bold">The Groove Admin</div>
        <nav className="mt-6">
          <ul>
            <li
              className={`py-2 px-4 hover:bg-gray-700 cursor-pointer ${
                activeSection === "allSpaces" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveSection("allSpaces")}
            >
              View All Spaces
            </li>
            <li
              className={`py-2 px-4 hover:bg-gray-700 cursor-pointer ${
                activeSection === "allUsers" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveSection("allUsers")}
            >
              View All Users
            </li>
            <li
              className={`py-2 px-4 hover:bg-gray-700 cursor-pointer ${
                activeSection === "bookedSpaces" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveSection("bookedSpaces")}
            >
              Booked Spaces
            </li>
            <li
              className={`py-2 px-4 hover:bg-gray-700 cursor-pointer ${
                activeSection === "addSpace" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveSection("addSpace")}
            >
              Add Space
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-lg"
              />
              <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>
            <FaFilter className="text-gray-600 cursor-pointer" />
            <FaBell className="text-gray-600 cursor-pointer" />
            <FaUserCircle className="text-gray-600 cursor-pointer" />
          </div>
          <FaSignOutAlt
            className="text-gray-600 cursor-pointer"
            onClick={handleLogout}
          />
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* View All Spaces Section */}
          {activeSection === "allSpaces" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">All Spaces</h2>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {spaces.map((space) => (
                    <tr key={space.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{space.name}</td>
                      <td className="py-2 px-4">{space.description}</td>
                      <td className="py-2 px-4">{space.location}</td>
                      <td className="py-2 px-4">${space.price}</td>
                      <td className="py-2 px-4">{space.status}</td>
                      <td className="py-2 px-4">{space.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* View All Users Section */}
          {activeSection === "allUsers" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">All Users</h2>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-3 px-4">First Name</th>
                    <th className="py-3 px-4">Last Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Verified</th>
                    <th className="py-3 px-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{user.first_name}</td>
                      <td className="py-2 px-4">{user.last_name}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">
                        {user.verified ? "Yes" : "No"}
                      </td>
                      <td className="py-2 px-4">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Booked Spaces Section */}
          {activeSection === "bookedSpaces" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Booked Spaces</h2>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-3 px-4">User Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Space Name</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">
                        {booking.user_first_name} {booking.user_last_name}
                      </td>
                      <td className="py-2 px-4">{booking.email}</td>
                      <td className="py-2 px-4">{booking.contact}</td>
                      <td className="py-2 px-4">{booking.space_name}</td>
                      <td className="py-2 px-4">${booking.price}</td>
                      <td className="py-2 px-4">{booking.location}</td>
                      <td className="py-2 px-4">{booking.status}</td>
                      <td className="py-2 px-4">
                        {booking.paid ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Space Section */}
          {activeSection === "addSpace" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Add New Space</h2>
              <form
                onSubmit={addSpace}
                className="bg-white p-6 shadow-md rounded-lg"
              >
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newSpace.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={newSpace.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newSpace.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={newSpace.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Image URL</label>
                  <input
                    type="text"
                    name="image_url"
                    value={newSpace.image_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Status</label>
                  <select
                    name="status"
                    value={newSpace.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={newSpace.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">User ID</label>
                  <input
                    type="number"
                    name="user_id"
                    value={newSpace.user_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Space
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
