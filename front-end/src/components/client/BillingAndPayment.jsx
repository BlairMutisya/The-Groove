import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/pay", {
        phoneNumber,
        amount,
      });

      console.log("Payment Response:", response.data);
      alert("Payment request sent successfully.");
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment request failed.");
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter Phone Number"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount"
        required
      />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PaymentForm;
