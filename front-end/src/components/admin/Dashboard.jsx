import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaSignOutAlt, FaCheck } from "react-icons/fa";

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
  const [editableSpace, setEditableSpace] = useState(null);
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
    if (editableSpace) {
      setEditableSpace({ ...editableSpace, [name]: value });
    } else {
      setNewSpace({ ...newSpace, [name]: value });
    }
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
        credentials: "include", // Ensure cookies are sent if needed
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

  const handleUpdateClick = (space) => {
    setEditableSpace(space);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editableSpace) {
      const response = await fetch(
        `http://localhost:5000/spaces/${editableSpace.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableSpace),
        }
      );
      if (response.ok) {
        alert("Space updated successfully!");
        setEditableSpace(null);
        fetchAllSpaces();
      } else {
        alert("Failed to update space.");
      }
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
                      <td className="py-2 px-4">
                        {editableSpace && editableSpace.id === space.id ? (
                          <input
                            type="text"
                            name="name"
                            value={editableSpace.name || ""}
                            onChange={handleInputChange}
                            className="border px-2 py-1"
                          />
                        ) : (
                          space.name
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editableSpace && editableSpace.id === space.id ? (
                          <input
                            type="text"
                            name="description"
                            value={editableSpace.description || ""}
                            onChange={handleInputChange}
                            className="border px-2 py-1"
                          />
                        ) : (
                          space.description
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editableSpace && editableSpace.id === space.id ? (
                          <input
                            type="text"
                            name="location"
                            value={editableSpace.location || ""}
                            onChange={handleInputChange}
                            className="border px-2 py-1"
                          />
                        ) : (
                          space.location
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editableSpace && editableSpace.id === space.id ? (
                          <input
                            type="text"
                            name="price"
                            value={editableSpace.price || ""}
                            onChange={handleInputChange}
                            className="border px-2 py-1"
                          />
                        ) : (
                          space.price
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editableSpace && editableSpace.id === space.id ? (
                          <input
                            type="text"
                            name="status"
                            value={editableSpace.status || ""}
                            onChange={handleInputChange}
                            className="border px-2 py-1"
                          />
                        ) : (
                          space.status
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editableSpace && editableSpace.id === space.id ? (
                          <input
                            type="text"
                            name="rating"
                            value={editableSpace.rating || ""}
                            onChange={handleInputChange}
                            className="border px-2 py-1"
                          />
                        ) : (
                          space.rating
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editableSpace && editableSpace.id === space.id ? (
                          <>
                            <button
                              onClick={handleUpdate}
                              className="text-green-600 hover:text-green-800"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => setEditableSpace(null)}
                              className="text-red-600 hover:text-red-800 ml-2"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleUpdateClick(space)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(space.id)}
                              className="text-red-600 hover:text-red-800 ml-4"
                            >
                              Delete
                            </button>
                          </>
                        )}
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
              <form onSubmit={addSpace} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={newSpace.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="border px-4 py-2 w-full"
                />
                <input
                  type="text"
                  name="description"
                  value={newSpace.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="border px-4 py-2 w-full"
                />
                <input
                  type="text"
                  name="location"
                  value={newSpace.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="border px-4 py-2 w-full"
                />
                <input
                  type="text"
                  name="price"
                  value={newSpace.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="border px-4 py-2 w-full"
                />
                <input
                  type="text"
                  name="image_url"
                  value={newSpace.image_url}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  className="border px-4 py-2 w-full"
                />
                <input
                  type="text"
                  name="status"
                  value={newSpace.status}
                  onChange={handleInputChange}
                  placeholder="Status"
                  className="border px-4 py-2 w-full"
                />
                <input
                  type="text"
                  name="rating"
                  value={newSpace.rating}
                  onChange={handleInputChange}
                  placeholder="Rating"
                  className="border px-4 py-2 w-full"
                />
                <input
                  type="text"
                  name="user_id"
                  value={newSpace.user_id}
                  onChange={handleInputChange}
                  placeholder="User ID"
                  className="border px-4 py-2 w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
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
                Contacted ({unreadMessages})
              </h2>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#fce8d0] text-black">
                  <tr>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td className="py-2 px-4">{contact.id}</td>
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

          {/* Booked Spaces Section */}
          {activeSection === "bookedSpaces" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Booked Spaces</h2>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#fce8d0] text-black">
                  <tr>
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-4">Space Name</th>
                    <th className="py-3 px-4">User Name</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="py-2 px-4">{booking.id}</td>
                      <td className="py-2 px-4">{booking.spaceName}</td>
                      <td className="py-2 px-4">{booking.userName}</td>
                      <td className="py-2 px-4">{booking.date}</td>
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
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="py-2 px-4">{user.id}</td>
                      <td className="py-2 px-4">{user.name}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">{user.role}</td>
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
