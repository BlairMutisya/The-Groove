import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../client/Footer";
import Navbar from "../client/Navbar";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const apiUrl = "http://localhost:5000/spaces";
const bookingUrl = "http://localhost:5000/create-bookings";
const reviewUrl = "http://localhost:5000/reviews"; // URL for submitting reviews

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

  const [reviewData, setReviewData] = useState({
    userFirstName: "",
    userLastName: "",
    rating: 0,
    reviewMessage: "",
  });

  const [reviews, setReviews] = useState([]);

  // Define fetchReviews outside useEffect so it can be used elsewhere
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${apiUrl}/${id}/reviews`);
      if (!response.ok) {
        throw new Error("Reviews not found");
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

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
    fetchReviews();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setReviewData((prevData) => ({
      ...prevData,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!space) {
      alert("Space details not available.");
      return;
    }

    const bookingData = {
      ...formData,
      space_name: space.name,
      location: space.location,
      description: space.description,
      price: space.price,
      image_url: space.image_url,
      space_id: space.id,
    };

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
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create booking");
      }
  
      const result = await response.json();
      console.log("Booking created:", result);
      alert("Booking created successfully!");

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(reviewUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...reviewData,
          space_id: id,
          user_id: 1, // Set user_id to 1
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const result = await response.json();
      console.log("Review submitted:", result);
      alert("Review submitted successfully!");

      setReviewData({
        user_first_name: "",
        user_last_name: "",
        rating: 0,
        reviewMessage: "",
      });

      // Fetch updated reviews after submission
      fetchReviews();
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting review. Please try again.");
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

              <section className="mt-12 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="border p-4 rounded-lg">
                        <h3 className="text-xl font-semibold">
                          {review.user_first_name} {review.user_last_name}
                        </h3>
                        <div className="flex items-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) =>
                            review.rating >= star ? (
                              <FaStar key={star} className="text-yellow-500" />
                            ) : review.rating >= star - 0.5 ? (
                              <FaStarHalfAlt
                                key={star}
                                className="text-yellow-500"
                              />
                            ) : (
                              <FaRegStar
                                key={star}
                                className="text-yellow-500"
                              />
                            )
                          )}
                        </div>
                        <p>{review.review_message}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>
              </section>

              <section className="mt-12 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Submit a Review</h2>
                <form className="space-y-4" onSubmit={handleReviewSubmit}>
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <input
                      type="text"
                      name="userFirstName"
                      value={reviewData.user_first_name}
                      onChange={handleReviewChange}
                      placeholder="Your first name"
                      className="border rounded-lg p-2 w-full md:w-48"
                    />
                    <input
                      type="text"
                      name="userLastName"
                      value={reviewData.user_last_name}
                      onChange={handleReviewChange}
                      placeholder="Your last name"
                      className="border rounded-lg p-2 w-full md:w-48"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className={`text-2xl ${
                          reviewData.rating >= star
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>

                  <textarea
                    name="reviewMessage"
                    value={reviewData.reviewMessage}
                    onChange={handleReviewChange}
                    placeholder="Your review"
                    className="border rounded-lg p-2 w-full"
                    rows="4"
                  ></textarea>

                  <button
                    type="submit"
                    className="bg-[#79a9c2] text-white py-2 px-4 rounded-lg shadow-lg"
                  >
                    Submit Review
                  </button>
                </form>
              </section>
            </main>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SpaceDetails;
