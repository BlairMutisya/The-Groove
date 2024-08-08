import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// const apiUrl = 'https://fakestoreapi.com/products';

// const SpaceDetails = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       const fetchProduct = async () => {
//         try {
//           const response = await fetch(`${apiUrl}/${id}`);
//           if (!response.ok) {
//             throw new Error('Product not found');
//           }
//           const data = await response.json();
//           setProduct(data);
//         } catch (error) {
//           setError(error.message);
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchProduct();
//     }, [id]);
  
//     if (loading) return <div className='flex justify-center text-2xl'>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//   return (
//     <div className='bg-[#fff3e5]'>
//       <div name='details'>
//         {product ? (
//           <div>
//             <header className='bg-[#fff3e5] p-6 flex justify-between items-center'>
//               <h1 className='text-3xl font-bold'>{product.title}</h1>
//               <span className="bg-orange-500 text-white py-2 px-4 rounded-lg">{product.price} / hour</span>
//             </header>

//             <main className='p-6'>
//               <div className="flex flex-col md:flex-row md:space-x-6">

//                 <div className='flex-shrink-0'>
//                   <img className='rounded-lg shadow-lg object-cover h-[520px] w-[520px]' src={product.image} alt={product.title} />
//                 </div>

//                 <div className="max-w-screen-lg mx-auto mt-6 md:mt-0 flex-grow px-4 md:pl-44">
//                   <h2 className="text-2xl font-semibold mb-2 ml-4 md:ml-10">Get in touch with our Agents</h2>
//                   <p className="mb-4 ml-4 md:ml-10">Our friendly team would love to hear from you.</p>
//                   <form className="space-y-4">
//                     <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//                       <input type="text" name="firstName" placeholder="First name" className="border rounded-lg p-2 w-full md:w-48" />
//                       <input type="text" name="lastName" placeholder="Last name" className="border rounded-lg p-2 w-full md:w-48" />
//                     </div>

//                     <input type="email" name="email" placeholder="Email address" className="border rounded-lg p-2 w-full md:w-[400px]" />
//                     <input type="tel" name="phone" placeholder="Phone number" className="border rounded-lg p-2 w-full md:w-[400px]" />

//                     <textarea name="message" placeholder="Message" className="border rounded-lg p-2 w-full md:w-[400px]" rows="4"></textarea>

//                     <label className="flex items-center space-x-2 ml-4 md:ml-16">
//                       <input type="checkbox" name="agreement" className="form-checkbox" />
//                       <span>I agree to the <a href="#" className="text-blue-500 underline">terms and conditions</a></span>
//                     </label>

//                     <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg ml-4 md:ml-12">
//                       Place a booking (Proceed to Payment)
//                     </button>
//                   </form>
//                 </div>

//               </div>

//               <section className="mt-12 bg-white p-6 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold mb-4">Description</h2>
//                 <p className='text-gray-600 mb-4'> {product.description}</p>
//               </section>

//             </main>

//           </div>
//         ) : (
//           <div>No product found</div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   )
// }

export default SpaceDetails