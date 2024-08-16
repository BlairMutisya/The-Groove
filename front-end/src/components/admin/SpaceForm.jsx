import React, { useState, useEffect } from "react";

const SpaceForm = ({ spaceId, initialData, isUpdating, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (isUpdating && initialData) {
      setFormData({
        name: initialData.name,
        location: initialData.location,
        price: initialData.price,
        description: initialData.description,
        image: initialData.image_url,
      });
    }
  }, [initialData, isUpdating]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    try {
      const url = isUpdating
        ? `http://localhost:5000/spaces/${spaceId}`
        : "http://localhost:5000/spaces";

      const method = isUpdating ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
      alert(isUpdating ? "Space updated successfully!" : "Space added successfully!");

      setFormData({
        name: "",
        location: "",
        price: "",
        description: "",
        image: "",
        status: "",
    
      });

      onCancel();
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">
        {isUpdating ? "Update Space" : "Add Space"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={formData.description}
          onChange={handleChange}
        />
         <input
          name="location"
          placeholder="location"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={formData.location}
          onChange={handleChange}
        />
         <input
          name="status"
          placeholder="status"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={formData.status}
          onChange={handleChange}
        />
       <input
          name="image_url"
          placeholder="image"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type= "text"
          
          value={formData.image_url}
          onChange={handleChange}
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isUpdating ? "Update Space" : "Add Space"}
          </button>
          {onCancel && (
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SpaceForm;
