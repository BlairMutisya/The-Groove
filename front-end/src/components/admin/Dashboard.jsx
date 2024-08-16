import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("allSpaces");
  const [spaces, setSpaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
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
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchAllSpaces();
    fetchAllUsers();
    fetchBookedSpaces();
    fetchContacts();
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
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      console.error("Expected an array but received:", data);
      setUsers([]);
    }
  };

  const fetchBookedSpaces = async () => {
    const response = await fetch("http://localhost:5000/create-bookings");
    const data = await response.json();
    if (Array.isArray(data)) {
      setBookings(data);
    } else {
      console.error("Expected an array but received:", data);
      setBookings([]);
    }
  };

  const fetchContacts = async () => {
    const response = await fetch("http://localhost:5000/contacts");
    const data = await response.json();
    if (Array.isArray(data)) {
      setContacts(data);

      // Check for unread messages
      const unreadCount = data.filter((contact) => !contact.read).length;
      setUnreadMessages(unreadCount);
    } else {
      console.error("Expected an array but received:", data);
      setContacts([]);
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
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include", // Ensure cookies are sent if needed
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle successful logout
      console.log("Logged out successfully");
      // Redirect to login page or perform other actions
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSpaces = spaces.filter((space) =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/spaces/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Space deleted successfully!");
      fetchAllSpaces();
    } else {
      alert("Failed to delete space.");
    }
  };

  const handleUpdate = async (id, updatedSpace) => {
    const response = await fetch(`http://localhost:5000/spaces/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSpace),
    });
    if (response.ok) {
      alert("Space updated successfully!");
      fetchAllSpaces();
    } else {
      alert("Failed to update space.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#fce8d0] text-black shadow-lg">
        <div className="p-4 text-2xl font-bold">The Groove Admin</div>
        <nav className="mt-6">
          <ul>
            <li
              className={`py-2 px-4 hover:bg-white cursor-pointer ${
                activeSection === "allSpaces" ? "bg-white" : ""
              }`}
              onClick={() => setActiveSection("allSpaces")}
            >
              View All Spaces
            </li>
            <li
              className={`py-2 px-4 hover:bg-white cursor-pointer ${
                activeSection === "allUsers" ? "bg-white" : ""
              }`}
              onClick={() => setActiveSection("allUsers")}
            >
              View All Users
            </li>
            <li
              className={`py-2 px-4 hover:bg-white cursor-pointer ${
                activeSection === "bookedSpaces" ? "bg-white" : ""
              }`}
              onClick={() => setActiveSection("bookedSpaces")}
            >
              Booked Spaces
            </li>
            <li
              className={`py-2 px-4 hover:bg-white cursor-pointer ${
                activeSection === "addSpace" ? "bg-white" : ""
              }`}
              onClick={() => setActiveSection("addSpace")}
            >
              Add Space
            </li>
            <li
              className={`py-2 px-4 hover:bg-white cursor-pointer ${
                activeSection === "contacted" ? "bg-white" : ""
              }`}
              onClick={() => setActiveSection("contacted")}
            >
              Contacted
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#fce8d0] shadow-md p-4 flex items-center justify-between mt-4 mx-4 rounded-lg">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
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
                <thead className="bg-[#fce8d0] text-black">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpaces.map((space) => (
                    <tr
                      key={space.id}
                      className="relative group hover:bg-gray-100"
                    >
                      <td className="py-2 px-4">{space.name}</td>
                      <td className="py-2 px-4">{space.description}</td>
                      <td className="py-2 px-4">{space.location}</td>
                      <td className="py-2 px-4">{space.price}</td>
                      <td className="py-2 px-4">{space.status}</td>
                      <td className="py-2 px-4">{space.rating}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleDelete(space.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            handleUpdate(space.id, {
                              ...space,
                              status:
                                space.status === "Available"
                                  ? "Not Available"
                                  : "Available",
                            })
                          }
                          className="ml-4 text-blue-600 hover:text-blue-800"
                        >
                          Update
                        </button>
                      </td>
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
                <thead className="bg-[#fce8d0] text-black">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="relative group hover:bg-gray-100"
                    >
                      <td className="py-2 px-4">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="py-2 px-4">{user.email}</td>
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
                <thead className="bg-[#fce8d0] text-black">
                  <tr>
                    <th className="py-3 px-4">First Name</th>
                    <th className="py-3 px-4">Last Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Space Name</th>
                    <th className="py-3 px-4">Space Location</th>
                    <th className="py-3 px-4">Booking Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="relative group hover:bg-gray-100"
                    >
                      <td className="py-2 px-4">{booking.first_name}</td>
                      <td className="py-2 px-4">{booking.last_name}</td>
                      <td className="py-2 px-4">{booking.phone}</td>
                      <td className="py-2 px-4">{booking.space_name}</td>
                      <td className="py-2 px-4">{booking.location}</td>
                      <td className="py-2 px-4">{booking.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Space Section */}
          {activeSection === "addSpace" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Add Space</h2>
              <form
                onSubmit={addSpace}
                className="bg-white p-8 shadow-md rounded-lg"
              >
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newSpace.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newSpace.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="location"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={newSpace.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={newSpace.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="image_url"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image_url"
                    name="image_url"
                    value={newSpace.image_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={newSpace.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="rating">
                    Rating
                  </label>
                  <input
                    type="text"
                    id="rating"
                    name="rating"
                    value={newSpace.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="user_id">
                    User ID
                  </label>
                  <input
                    type="text"
                    id="user_id"
                    name="user_id"
                    value={newSpace.user_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#ED1C24] text-white px-4 py-2 rounded-lg"
                >
                  Add Space
                </button>
              </form>
            </div>
          )}

          {/* Contacted Section */}
          {activeSection === "contacted" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Contacted
                {unreadMessages > 0 && (
                  <span className="ml-2 text-red-600">
                    ({unreadMessages} Messages)
                  </span>
                )}
              </h2>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#fce8d0] text-black">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="relative group hover:bg-gray-100"
                    >
                      <td className="py-2 px-4">{contact.name}</td>
                      <td className="py-2 px-4">{contact.phone}</td>
                      <td className="py-2 px-4">{contact.email}</td>
                      <td className="py-2 px-4">{contact.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;