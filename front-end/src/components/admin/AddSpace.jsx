import React, { useState } from "react";
import "../../styles.css";

const AddSpace = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    image: null,
  });
 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input separately
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("image", formData.image);

    try {
      const response = await fetch("http://127.0.0.1:5000/spaces", {
        method: "POST",
        body: data,
        headers: {
          // 'Content-Type' is not needed because fetch automatically sets the correct boundary for FormData
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="AddSpaceDiv">
      <form className="form" onSubmit={handleSubmit}>
        <p className="heading">ADD SPACE</p>
        <input
          name="name"
          placeholder="Name"
          className="input"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          className="input"
          type="text"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          className="input"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          name="image"
          placeholder="Upload Image"
          className="input"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddSpace;
