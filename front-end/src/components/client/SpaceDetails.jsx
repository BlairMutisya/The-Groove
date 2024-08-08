import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const apiUrl = 'https://fakestoreapi.com/products';

const SpaceDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${apiUrl}/${id}`);
          if (!response.ok) {
            throw new Error('Product not found');
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProduct();
    }, [id]);
  
    if (loading) return <div className='flex justify-center text-2xl'>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div>SpaceDetails</div>
  )
}

export default SpaceDetails