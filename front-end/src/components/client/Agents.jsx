import React from 'react';
import { FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa'; // Importing the required icons
import Footer from './Footer';
import {Link} from 'react-router-dom';

const agents = [
  {
    name: 'Blair Vullu',
    position: 'Founder & CEO',
    description: 'Co-founder of the company. The-Groove.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Uvyne Rop',
    position: 'Team-manager',
    description: 'Oversee daily operations and ensure customer satisfaction.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Robert Gathanua',
    position: 'Finance Manager',
    description: 'Ensure compliance with financial regulations and standards.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Liz Zawadi',
    position: 'Operations Manager',
    description: 'Monitor and manage spaces and supplies.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Victor Muriithi',
    position: 'Customer Service Lead',
    description: 'Lead customer service operations and support processes.',
    image: 'https://via.placeholder.com/150',
  },
];

const Agents = () => {
  return(
    
    <div className="bg-orange-100 p-8">
      <div className="text-center">
        <h1 className="text-sm font-semibold text-orange-600 ">Best Team in town! </h1>
        <h2 className="text-3xl font-extrabold text-gray-900 ">Meet our team</h2>
        <p className="mt-2 text-gray-600">At The-Groove, our dedicated agents are the heart of our service, bringing unparalleled expertise and a personalized touch to every rental experience. Our agents are committed to guiding you through the entire process, from discovering your ideal space to securing the perfect lease.</p>
       <div className="mt-4 flex justify-center space-x-4"> 
      <Link to="/about">
      <button className="bg-purple-600 text-white px-4 py-2 rounded-md">About us</button>
      </Link >
      <Link to="/Bookings">
      <button className="bg-purple-600 px-4 py-2 rounded-md text-white">Book a space</button>
      </Link>
      </div>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"> 
        {agents.map((agent,index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
          <img src={agent.image} alt={agent.name} className="w-24 h-24 mx-auto rounded-full mb-4"/>
          <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.position}</p>
          <p className="mt-2 text-gray-500">{agent.description}</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="text-blue-500"> <FaLinkedin/></a>   {/* //Fa- Font Awesome */}
            <a href="#" className="text-blue-400"><FaTwitter/></a>
            <a href="#" className="text-gray-700"><FaGlobe/></a>

          </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
      <Footer/>
    </div>
    </div>
    
  );
  
}
   
export default Agents;
