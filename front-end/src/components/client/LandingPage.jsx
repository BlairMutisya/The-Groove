import React from 'react'
import React, { useEffect, useState } from 'react';
import Footer from './Footer'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

const apiUrl = 'https://fakestoreapi.com/products';

const LandingPage = () => {
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='landing page'>
        <Navbar />
    </div>
  )
}

export default LandingPage