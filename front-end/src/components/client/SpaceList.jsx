import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from '../client/Footer';
import { Link } from 'react-router-dom';

const apiUrl = "https://fakestoreapi.com/products";

const SpaceList = () => {
    // const isBooked = product.isBooked;
    const [products, setProducts] = useState([]);
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
            }
        };

        fetchData();
    }, []);

    if (error) return <div>Error: {error}</div>;

      return (
    <div name='spacelist'>
        <Navbar className='navbar' />
        <div className='pt-20 bg-[#fff3e5]'>
            <div className="flex justify-center text-5xl font-bold">
                <h1 className="mb-11">Featured Spaces</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                {products.map((product) => (
                    <div key={product.id} className='relative border-slate-950 border-b-2'>
                        {/* Dot indicator */}
                        <div
                            className={`absolute top-4 right-4 w-4 h-4 rounded-full ${product.isBooked ? 'bg-red-500' : 'bg-green-500'}`}
                        ></div>

                        <div className="flex bg-[#fff3e5] p-4 mb-8">
                            <div className="w-[250px]">
                                <img className="rounded-lg w-full h-48 object-cover" src={product.image} alt={product.title} />
                            </div>
                            <div className="ml-5 flex-1">
                                <p className="text-lg font-semibold mb-2">{product.title}</p>
                                <p className="text-gray-600 mb-4">Location: {product.category}</p>
                                <div className="flex items-center">
                                    {/* Display product rating as stars */}
                                    {[...Array(5)].map((_, index) => (
                                        <svg
                                            key={index}
                                            className={`w-4 h-4 ${index < Math.round(product.rating.rate) ? 'text-yellow-300' : 'text-gray-300'} ms-1`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                        >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className='mt-11 flex space-x-24'>
                                    <p className='bg-white'>{product.price}</p>
                                    <Link to={`/spacedetails/${product.id}`} className='text-white bg-[#4a8cb8] rounded-lg px-4 py-2 hover:bg-[#79a9c2] transition duration-300'>view space</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <Footer />
        </div>
    </div>
      )
}

export default SpaceList