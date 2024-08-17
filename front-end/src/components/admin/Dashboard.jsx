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
    const response = await fetch("https://the-groove.onrender.com/spaces");
    const data = await response.json();
    setSpaces(data);
  };

  const fetchAllUsers = async () => {
    const response = await fetch("https://the-groove.onrender.com/users");
    const data = await response.json();
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      console.error("Expected an array but received:", data);
      setUsers([]);
    }
  };

  const fetchBookedSpaces = async () => {
    const response = await fetch(
      "https://the-groove.onrender.com/create-bookings"
    );
    const data = await response.json();
    if (Array.isArray(data)) {
      setBookings(data);
    } else {
      console.error("Expected an array but received:", data);
      setBookings([]);
    }
  };

  const fetchContacts = async () => {
    const response = await fetch("https://the-groove.onrender.com/contacts");
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
    const response = await fetch("https://the-groove.onrender.com/spaces", {
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
      const response = await fetch("https://the-groove.onrender.com/logout", {
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
    const response = await fetch(`https://the-groove.onrender.com/spaces/${id}`, {
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
        `https://the-groove.onrender.com/${editableSpace.id}`,
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

  const handleMarkAsRead = async (id) => {
    const response = await fetch(
      `https://the-groove.onrender.com/contacts/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      }
    );

    if (response.ok) {
      fetchContacts(); // Refresh contact list
    } else {
      alert("Failed to mark as read.");
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
              Contacted{" "}
              {unreadMessages > 0 && (
                <span className="ml-2 text-red-600 font-bold">
                  ({unreadMessages} new)
                </span>
              )}
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
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600" />
          </div>
          <div className="flex items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="inline mr-1" />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 flex-1">
          {/* All Spaces Section */}
          {activeSection === "allSpaces" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">All Spaces</h2>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#fce8d0] text-black">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpaces.map((space) => (
                    <tr key={space.id} className="border-t">
                      <td className="py-3 px-4">{space.name}</td>
                      <td className="py-3 px-4">{space.location}</td>
                      <td className="py-3 px-4">${space.price}</td>
                      <td className="py-3 px-4">{space.status}</td>
                      <td className="py-3 px-4">{space.rating}</td>
                      <td className="py-3 px-4">
                        <button
                          className="bg-black-300 hover:bg-black-700 text-white font-bold py-1 px-2 rounded mr-2"
                          onClick={() => handleUpdateClick(space)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleDelete(space.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* All Users Section */}
          {activeSection === "allUsers" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">All Users</h2>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#fce8d0] text-black">
                  <tr>
                    <th className="py-3 px-4">First Name</th>
                    <th className="py-3 px-4">Last Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="py-3 px-4">{user.first_name}</td>
                      <td className="py-3 px-4">{user.last_name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.role}</td>
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
                    <th className="py-3 px-4">Space Name</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Message</th>
                    <th className="py-3 px-4">Terms</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Booking Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-t">
                      <td className="py-3 px-4">{booking.first_name}</td>
                      <td className="py-3 px-4">{booking.last_name}</td>
                      <td className="py-3 px-4">{booking.space_name}</td>
                      <td className="py-3 px-4">{booking.location}</td>
                      <td className="py-3 px-4">{booking.phone}</td>
                      <td className="py-3 px-4">{booking.message}</td>
                      <td className="py-3 px-4">
                        {booking.agreement ? "Agreed" : "Not Agreed"}
                      </td>
                      <td className="py-3 px-4">{booking.price}</td>
                      <td className="py-3 px-4">{booking.created_at}</td>
                      {/* <td className="py-3 px-4">
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Space Section */}
          {activeSection === "addSpace" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {editableSpace ? "Update Space" : "Add Space"}
              </h2>
              <form onSubmit={editableSpace ? handleUpdate : addSpace}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={editableSpace ? editableSpace.name : newSpace.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={
                      editableSpace ? editableSpace.location : newSpace.location
                    }
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={
                      editableSpace
                        ? editableSpace.description
                        : newSpace.description
                    }
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={editableSpace ? editableSpace.price : newSpace.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="image_url"
                    placeholder="Image URL"
                    value={
                      editableSpace
                        ? editableSpace.image_url
                        : newSpace.image_url
                    }
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="rating"
                    placeholder="Rating"
                    value={
                      editableSpace ? editableSpace.rating : newSpace.rating
                    }
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="user_id"
                    placeholder="User ID"
                    value={
                      editableSpace ? editableSpace.user_id : newSpace.user_id
                    }
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  <select
                    name="status"
                    value={
                      editableSpace ? editableSpace.status : newSpace.status
                    }
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Unavailable</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  {editableSpace ? "Update Space" : "Add Space"}
                </button>
              </form>
            </div>
          )}

          {/* Contacted Section */}
          {activeSection === "contacted" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Contacted Messages</h2>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#fce8d0] text-black">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Message</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-t">
                      <td className="py-3 px-4">{contact.name}</td>
                      <td className="py-3 px-4">{contact.phone}</td>
                      <td className="py-3 px-4">{contact.email}</td>
                      <td className="py-3 px-4">{contact.message}</td>
                      <td className="py-3 px-4">
                        {!contact.read && (
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleMarkAsRead(contact.id)}
                          >
                            <FaCheck className="inline mr-1" /> Mark as Read
                          </button>
                        )}
                      </td>
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
