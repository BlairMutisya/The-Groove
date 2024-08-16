import React, { useState, useEffect } from "react";

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    booking_id: "",
    amount: "",
    date_paid: new Date().toISOString().slice(0, 16),
    first_name: "",
    last_name: "",
    contacts: "",
    payment_mode: "PesaPal",
    message: "",
  });

  useEffect(() => {
    // Fetch user data from backend
    fetch("/api/user/payment-data")
      .then((response) => response.json())
      .then((data) => {
        setPaymentData((prevState) => ({
          ...prevState,
          booking_id: data.booking_id,
          amount: data.amount,
          first_name: data.first_name,
          last_name: data.last_name,
        }));
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit payment data to backend
    fetch("/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full p-6 bg-white bg-opacity-30 backdrop-blur-md shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Payment Form</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Booking ID</label>
          <input
            type="text"
            name="booking_id"
            value={paymentData.booking_id}
            readOnly
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="first_name"
            value={paymentData.first_name}
            readOnly
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={paymentData.last_name}
            readOnly
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="text"
            name="amount"
            value={paymentData.amount}
            readOnly
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date Paid</label>
          <input
            type="datetime-local"
            name="date_paid"
            value={paymentData.date_paid}
            readOnly
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contacts</label>
          <input
            type="text"
            name="contacts"
            value={paymentData.contacts}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Payment Mode</label>
          <input
            type="text"
            name="payment_mode"
            value={paymentData.payment_mode}
            readOnly
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            name="message"
            value={paymentData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
