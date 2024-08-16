import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const apiUrl = "http://localhost:5000/spaces";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
    <div>
      <Navbar />
      <div name="home" className="h-full w-full bg-[#FFF3e5]">
        <div className="w-full -mx-4 flex h-full px-4 md:flex-row">
          <div className="flex flex-col bg-[#FCE8CF] h-screen px-20 mr-2">
            <h3 className="py-2 sm:text-5xl text-2xl font-bold pt-36 mt-24">
              DISCOVER SPACES <br /> YOU'LL LOVE TO BE IN.
            </h3>
            <p className="py-4">
              At ChillSpaces, we believe that the right environment can
              transform your relaxation experience. Our curated collection of
              rental spaces is designed to provide the ultimate in comfort and
              tranquility. From stylish lofts and charming cottages to tranquil
              gardens and sleek modern retreats, we’ve got something to suit
              every chill vibe.
            </p>
          </div>
          <div className="ml-6 w-full">
            <img
              className="w-[500px] h-[520px] object-cover rounded-lg mr-6 mt-28 -mx-20"
              src="https://i.pinimg.com/564x/7a/bc/0e/7abc0ea4b3538f738d150ffe455b61e0.jpg"
              alt="Main Banner"
            />
          </div>
        </div>
        <div className="w-full max-w-5xl p-5 pb-10 mb-10 columns- gap-2 space-y-5 flex bg-[#fff3e5]">
          <img
            className="rounded-lg w-[300px] h-[500px]"
            src="https://i.pinimg.com/564x/a6/9a/9f/a69a9f8cb1267a77e47f3d50408d4e7b.jpg"
            alt="Featured Space"
          />
          <div className="bg-[#FCE8CF] h-screen w-[3000px]">
            <h3 className="font-bold sm:text-5xl p-8 pb-0">FEATURED SPACES</h3>
            <h3 className="font-bold sm:text-5xl p-11 pt-0 justify-center flex items-center">
              FOR YOU
            </h3>
            <div>
              <img
                className="rounded-lg w-[300px] h-[500px] -mx-0 mt-1"
                src="https://i.pinimg.com/474x/99/ec/34/99ec347680d26949daf4e65539d089c6.jpg"
                alt="Featured Space"
              />
            </div>
          </div>
          <div className="justify-center w-[1800px] pl-18 -mx-20 pt-[400px]">
            <p className="text-xl">
              All lovely spaces for you. No two spaces are ever the same.
            </p>
            <div className="p-10 pt-1">
              <Link
                to="spacelist"
                className="text-2xl text-black font-semibold justify-center mr-10 p-20 group w-fit px-5 py-3 my-2 flex items-center rounded-lg bg-[#79a9c2] cursor-pointer transition-transform duration-300 hover:opacity-80 hover:scale-110"
              >
                view Spaces
              </Link>
            </div>
          </div>
        </div>
        <div className="p-5 pb-10 mb-10 gap-2 space-y-5 flex bg-[#fce8cf]">
          <div className="w-[600px]">
            <p className="mt-72 text-xl">
              Are you searching for the ideal location to launch your business,
              host an event, or find your next office? Look no further! At The
              Groove, we offer a diverse selection of spaces tailored to meet
              your needs.
            </p>
          </div>
          <div className="flex space-x-4">
            <img
              className="rounded-lg w-[300px] h-[500px] object-cover mt-"
              src="https://i.pinimg.com/736x/ae/3d/95/ae3d951a645c50105d1017b742bf4855.jpg"
              alt="Additional Space"
            />
            <img
              className="rounded-lg w-[300px] h-[500px] object-cover mt-24"
              src="https://i.pinimg.com/474x/db/30/9d/db309d2eab68d19602a006da43332e75.jpg"
              alt="Additional Space"
            />
          </div>
        </div>
        <div>
          <div>
            <h1 className="justify-center items-center flex text-5xl font-bold">
              FEATURED SPACES
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            {products.slice(0, 6).map((space) => (
              <div key={space.id} className="border-slate-950 border-b-2">
                <div className="flex bg-[#fff3e5] p-4 mb-8">
                  <div className="w-[250px]">
                    <img
                      className="rounded-lg w-full h-48 object-cover"
                      src={space.image_url}
                      alt={space.name}
                    />
                  </div>
                  <div className="ml-5 flex-1">
                    <p className="text-lg font-semibold mb-2">{space.name}</p>
                    <p className="text-gray-600 mb-4">
                      Location: {space.location}
                    </p>
                    <div className="flex items-center">
                      {/* Display space rating as stars */}
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${
                            index < Math.round(space.rating)
                              ? "text-yellow-300"
                              : "text-gray-300"
                          } ms-1`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
