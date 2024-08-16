import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../client/Footer";
import Navbar from "../client/Navbar";

const apiUrl = "http://localhost:5000/spaces";
const bookingUrl = "http://127.0.0.1:5000/create-bookings"; 

const SpaceDetails = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreement: false,
  });

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
          throw new Error("Space not found");
        }
        const data = await response.json();
        setSpace(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSpace();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const bookingData = {
        ...formData,
        space_id: space.id, // include space_id
        space_name: space.name, // include space name
        location: space.location, // include space location
        description: space.description, // include space description
        price: space.price, // include space price
        image_url: space.image_url, // include space image URL
      };
  
      const response = await fetch(bookingUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create booking");
      }
  
      const result = await response.json();
      console.log("Booking created:", result);
      alert("Booking created successfully!");
  
      // Optionally, you can reset the form after submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        agreement: false,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating booking. Please try again.");
    }
  };
  

     

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#fff3e5]">
      <Navbar />
      <div name="details" className="pt-14">
        {space ? (
          <div>
            <header className="bg-[#fff3e5] p-6 flex justify-between items-center">
              <h1 className="text-3xl font-bold">{space.name}</h1>
              <span className="bg-orange-500 text-white py-2 px-4 rounded-lg">
                KSH {space.price} / hour
              </span>
            </header>

            <main className="p-6">
              <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="flex-shrink-0">
                  <img
                    className="rounded-lg shadow-lg object-cover h-[520px] w-[520px]"
                    src={space.image_url}
                    alt={space.name}
                  />
                </div>

                <div className="max-w-screen-lg mx-auto mt-6 md:mt-0 flex-grow px-4 md:pl-44">
                  <h2 className="text-2xl font-semibold mb-2 ml-4 md:ml-10">
                    Get in touch with our Agents
                  </h2>
                  <p className="mb-4 ml-4 md:ml-10">
                    Our friendly team would love to hear from you.
                  </p>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        className="border rounded-lg p-2 w-full md:w-48"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        className="border rounded-lg p-2 w-full md:w-48"
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className="border rounded-lg p-2 w-full md:w-[400px]"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="border rounded-lg p-2 w-full md:w-[400px]"
                    />

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Message"
                      className="border rounded-lg p-2 w-full md:w-[400px]"
                      rows="4"
                    ></textarea>

                    <label className="flex items-center space-x-2 ml-4 md:ml-16">
                      <input
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleInputChange}
                        className="form-checkbox"
                      />
                      <span>
                        I agree to the{" "}
                        <a href="#" className="text-blue-500 underline">
                          terms and conditions
                        </a>
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="bg-[#79a9c2] text-white py-2 px-4 rounded-lg shadow-lg ml-4 md:ml-12"
                    >
                      Place a booking (Proceed to Payment)
                    </button>
                  </form>
                </div>
              </div>

              <section className="mt-12 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 mb-4">{space.description}</p>
              </section>
            </main>
          </div>
        ) : (
          <div>No space found</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SpaceDetails;
