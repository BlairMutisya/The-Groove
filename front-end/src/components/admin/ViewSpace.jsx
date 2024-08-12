import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';
// import Navbar from './Navbar';
// import Footer from './Footer';

const apiUrl = 'https://fakestoreapi.com/products';

const ViewSpace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleViewSpace = (productId) => {
    navigate(`/listing/details/${productId}`);
  };

  return (
    <div>
      {/* <Navbar className='navbar' /> */}
      <div className="content-container">
        <div className="heading-container">
          <h1 className="heading">Featured Spaces</h1>
        </div>
        <div className="grid-container">
          {products.map((product) => (
            <div key={product.id} className='product-card'>
              <div className={`indicator ${product.isBooked ? 'bg-red' : 'bg-green'}`}></div>
              <div className="product-content">
                <div className="image-container">
                  <img className="product-image" src={product.image} alt={product.title} />
                </div>
                <div className="product-details">
                  <p className="product-title">{product.title}</p>
                  <p className="product-location">Location: {product.category}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`star ${index < Math.round(product.rating.rate) ? 'filled' : ''}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                  <div className='price-and-link'>
                    <p className='product-price'>{product.price}</p>
                    <button 
                      onClick={() => handleViewSpace(product.id)} 
                      className='view-button'
                    >
                      View Space
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ViewSpace;