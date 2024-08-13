import React from "react";
import "../../styles.css";

const AddSpace = () => {
  return (
    <div className="AddSpaceDiv">
      <form className="form">
        <p className="heading">ADD SPACE</p>
        <input placeholder="Name" className="input" type="text" />
        <input placeholder="Location" className="input" type="text" />
        <input placeholder="Price" className="input" type="number" />

        <input placeholder="Upload Image" className="input" type="file" accept="image/*" />


        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

// THis is to merege
export default AddSpace;