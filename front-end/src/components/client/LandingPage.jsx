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
            <div className='h-full w-full bg-[#FFF3e5]'>
                <div className='w-full -mx-4 flex h-full px-4  md:flex-row'>
                    <div className='flex flex-col bg-[#FCE8CF] h-screen px-20 mr-2'>
                        <h3 className='py-2 sm:text-5xl text-2xl font-bold pt-36 mt-24'>DISCOVER SPACES  <br /> YOU'LL LOVE TO BE IN.</h3>
                        <p className='py-4'>
                            At ChillSpaces, we believe that the right environment can transform your relaxation experience. Our curated collection of rental spaces is designed to provide the ultimate in comfort and tranquility. From stylish lofts and charming cottages to tranquil gardens and sleek modern retreats, we’ve got something to suit every chill vibe.
                        </p>
                    </div>
                    <div className='ml-6 w-full'>
                        <img className='w-[500px] h-[520px] object-cover rounded-lg mr-6 mt-28 -mx-20' src='https://media.istockphoto.com/id/1575907553/photo/director-office-interior-design-computer-generated-image-of-office-architectural.jpg?s=1024x1024&w=is&k=20&c=RMsqxyfp6cLpqkOoAY71oK9_f5IeaFwBV4XM__BtGMI=' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LandingPage