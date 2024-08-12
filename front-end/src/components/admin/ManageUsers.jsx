// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../styles.css';
// // import Navbar from './Navbar';
// // import Footer from './Footer';

// const usersData = [
//   {
//     userName: 'John Doe',
//     email: 'john@example.com',
//     contactInfo: '123-456-7890',
//     spaceName: 'Luxury Apartment',
//     location: 'New York',
//     isBooked: true,
//     isPaid: true,
//     imageUrl: 'https://via.placeholder.com/150'
//   },
//   {
//     userName: 'Jane Smith',
//     email: 'jane@example.com',
//     contactInfo: '987-654-3210',
//     spaceName: 'Cozy Cottage',
//     location: 'California',
//     isBooked: false,
//     isPaid: false,
//     imageUrl: 'https://via.placeholder.com/150'
//   },
//   {
//     userName: 'Tom Johnson',
//     email: 'tom@example.com',
//     contactInfo: '555-555-5555',
//     spaceName: 'Beach House',
//     location: 'Florida',
//     isBooked: true,
//     isPaid: false,
//     imageUrl: 'https://via.placeholder.com/150'
//   },
//   {
//     userName: 'Emily Davis',
//     email: 'emily@example.com',
//     contactInfo: '444-444-4444',
//     spaceName: 'Mountain Cabin',
//     location: 'Colorado',
//     isBooked: false,
//     isPaid: true,
//     imageUrl: 'https://via.placeholder.com/150'
//   },
// ];

// const additionalCards = [
//   {
//     userName: 'Booked User',
//     email: 'booked@example.com',
//     contactInfo: '555-123-4567',
//     spaceName: 'Reserved Condo',
//     location: 'Florida',
//     isBooked: true,
//     isPaid: false,
//     imageUrl: 'https://via.placeholder.com/150'
//   },
//   {
//     userName: 'Booked User',
//     email: 'booked@example.com',
//     contactInfo: '555-123-4567',
//     spaceName: 'Reserved Condo 2',
//     location: 'Texas',
//     isBooked: true,
//     isPaid: true,
//     imageUrl: 'https://via.placeholder.com/150'
//   },
//   {
//     userName: 'Johnson',
//     email: 'booked@example.com',
//     contactInfo: '555-123-4567',
//     spaceName: 'Reserved Condo 3',
//     location: 'Nevada',
//     isBooked: true,
//     isPaid: true,
//     imageUrl: 'https://via.placeholder.com/150'
//   },
//   {
//     userName: 'Trevor',
//     email: 'booked@example.com',
//     contactInfo: '555-123-4567',
//     spaceName: 'Reserved Condo 4',
//     location: 'Arizona',
//     isBooked: true,
//     isPaid: false,
//     imageUrl: 'https://via.placeholder.com/150'
//   }
// ];

// const ManageUsers = () => {
//   const [filter, setFilter] = useState(null);
//   const navigate = useNavigate();

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   const getFilteredData = (data) => {
//     if (filter === 'all') return data;
//     if (filter === 'booked') return data.filter(user => user.isBooked);
//     if (filter === 'paid') return data.filter(user => user.isPaid);
//     return [];
//   };

//   const filteredData = getFilteredData(usersData);
//   const filteredAdditionalCards = getFilteredData(additionalCards);

//   return (
//     <div>
//       {/* <Navbar className='navbar' /> */}
//       <div className="content-container">
//         <div className="heading-container">
//           <h2 className="heading">Welcome to the admin Dashboard!</h2>
//         </div>
//         <div className="buttons-container">
//           <button onClick={() => handleFilterChange('all')}>All Users</button>
//           <button onClick={() => handleFilterChange('booked')}>Booked Spaces</button>
//           <button onClick={() => handleFilterChange('paid')}>Paid Spaces</button>
//           <button onClick={() => navigate('/add-space')}>Add Spaces</button>
//           <button onClick={() => navigate('/view-space')}>View Spaces</button>
//         </div>
//         <div className="grid-container">
//           {filter && filter === 'all' && filteredData.map((user, index) => (
//             <div key={index} className='product-card'>
//               <div className="product-content">
//                 <div className="product-details">
//                   <p className="product-title">{user.userName}</p>
//                   <p className="product-location">Email: {user.email}</p>
//                   <p className="product-location">Contact Info: {user.contactInfo}</p>
//                   <p className="product-location">Space Name: {user.spaceName}</p>
//                   <p className="product-location">Location: {user.location}</p>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {filter && filter !== 'all' && filteredData.map((user, index) => (
//             <div key={index} className='product-card'>
//               <div className={`indicator ${user.isBooked ? 'bg-red' : 'bg-green'}`}></div>
//               <div className="product-content">
//                 <div className="image-container">
//                   <img className="product-image" src={user.imageUrl} alt={user.userName} />
//                 </div>
//                 <div className="product-details">
//                   <p className="product-title">{user.userName}</p>
//                   <p className="product-location">Email: {user.email}</p>
//                   <p className="product-location">Contact Info: {user.contactInfo}</p>
//                   <p className="product-location">Space Name: {user.spaceName}</p>
//                   <p className="product-location">Location: {user.location}</p>
//                   <p className="product-location">Status: {user.isBooked ? 'Booked' : 'Available'}</p>
//                   <p className="product-location">Paid: {user.isPaid ? 'Yes' : 'No'}</p>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {filter && filter === 'booked' && filteredData.some(user => user.isBooked) && filteredAdditionalCards.map((user, index) => (
//             <div key={index + usersData.length} className='product-card'>
//               <div className="product-content">
//                 <div className="image-container">
//                   <img className="product-image" src={user.imageUrl} alt={user.userName} />
//                 </div>
//                 <div className="product-details">
//                   <p className="product-title">{user.userName}</p>
//                   <p className="product-location">Email: {user.email}</p>
//                   <p className="product-location">Contact Info: {user.contactInfo}</p>
//                   <p className="product-location">Space Name: {user.spaceName}</p>
//                   <p className="product-location">Location: {user.location}</p>
//                   <p className="product-location">Status: {user.isBooked ? 'Booked' : 'Available'}</p>
//                   <p className="product-location">Paid: {user.isPaid ? 'Yes' : 'No'}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default ManageUsers;
