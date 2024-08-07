import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const apiUrl = 'https://fakestoreapi.com/products';

const SpaceList = () => {
    // const isBooked = product.isBooked;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to handle product selection
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

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
    <div name='spacelist'>
        <Navbar className='navbar' />
        <div className='pt-20 bg-[#fff3e5]'>
        <div className="flex justify-center text-5xl font-bold">
          <h1 className="mb-11">Featured Spaces</h1>
        </div>
        </div>
    </div>
  )
}

export default SpaceList