import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';

const ManageUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [filter, setFilter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://the-groove.onrender.com/users"); // Adjust the API endpoint as needed
      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://the-groove.onrender.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update the state to remove the deleted user from the list
        setUsersData(usersData.filter(user => user.id !== id));
        console.log('User deleted successfully');
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const getFilteredData = (data) => {
    if (filter === 'all') return data;
    if (filter === 'booked') return data.filter(user => user.isBooked);
    if (filter === 'paid') return data.filter(user => user.isPaid);
    return [];
  };

  const filteredData = getFilteredData(usersData);

  return (
    <div>
      <div className="content-container">
        <div className="heading-container">
          <h2 className="heading">Welcome to the admin Dashboard!</h2>
        </div>
        <div className="buttons-container">
          <button onClick={() => handleFilterChange('all')}>All Users</button>
          <button onClick={() => handleFilterChange('booked')}>Booked Spaces</button>
          <button onClick={() => handleFilterChange('paid')}>Paid Spaces</button>
          <button onClick={() => navigate('/add-space')}>Add Spaces</button>
          <button onClick={() => navigate('/view-space')}>View Spaces</button>
        </div>
        <div className="grid-container">
          {filter && filteredData.map((user, index) => (
            <div key={index} className='product-card'>
              <div className="product-content">
                <div className="image-container">
                  <img className="product-image" src={user.imageUrl} alt={user.userName} />
                </div>
                <div className="product-details">
                  <p className="product-title">{user.userName}</p>
                  <p className="product-location">Email: {user.email}</p>
                  <p className="product-location">Contact: {user.contact}</p>
                  <p className="product-location">Space Name: {user.spaceName}</p>
                  <p className="product-location">Location: {user.location}</p>
                  <p className="product-location">Status: {user.isBooked ? 'Booked' : 'Available'}</p>
                  <p className="product-location">Paid: {user.isPaid ? 'Yes' : 'No'}</p>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button> {/* Delete button */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
