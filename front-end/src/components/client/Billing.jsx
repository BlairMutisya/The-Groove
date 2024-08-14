import React, { useState } from 'react';
import './BillingPage.css';
import pesapalService from './pesapalService';

const BillingPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        country: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === 'firstName' || name === 'lastName') && /\d/.test(value)) {
            return; // Prevent numbers in first and last name fields
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = 'First name cannot be empty';
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Last name cannot be empty';
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone || formData.phone <= 0 || !/^\d{12}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be a valid digit number and cannot be negative';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        const paymentDetails = {
            amount: 1000, // Example amount
            currency: 'KES',
            description: 'Payment for order',
            ...formData
        };

        try {
            const response = await pesapalService.makePayment(paymentDetails);
            console.log('Payment successful:', response);
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    return (
        <div className="billing-container">
            <h2 className="billing-title">Billing Details</h2>
            
            <form onSubmit={handleSubmit} className="billing-form">
                <div className="billing-input-group">
                    <label htmlFor="firstName" className="billing-label">First Name</label>
                    <input id="firstName" name="firstName" type="text" placeholder="First Name" className="billing-input" value={formData.firstName} onChange={handleChange} />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                </div>

                <div className="billing-input-group">
                    <label htmlFor="lastName" className="billing-label">Last Name</label>
                    <input id="lastName" name="lastName" type="text" placeholder="Last Name" className="billing-input" value={formData.lastName} onChange={handleChange} />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                </div>

                <div className="billing-input-group">
                    <label htmlFor="email" className="billing-label">Email</label>
                    <input id="email" name="email" type="email" placeholder="Email" className="billing-input" value={formData.email} onChange={handleChange} />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="billing-input-group">
                    <label htmlFor="address" className="billing-label">Address</label>
                    <input id="address" name="address" type="text" placeholder="Address" className="billing-input" value={formData.address} onChange={handleChange} />
                </div>

                <div className="billing-input-group">
                    <label htmlFor="city" className="billing-label">City</label>
                    <input id="city" name="city" type="text" placeholder="City" className="billing-input" value={formData.city} onChange={handleChange} />
                </div>

                <div className="billing-input-group">
                    <label htmlFor="zipCode" className="billing-label">ZIP Code</label>
                    <input id="zipCode" name="zipCode" type="text" placeholder="ZIP Code" className="billing-input" value={formData.zipCode} onChange={handleChange} />
                </div>

                <div className="billing-input-group">
                    <label htmlFor="country" className="billing-label">Country</label>
                    <input id="country" name="country" type="text" placeholder="Country" className="billing-input" value={formData.country} onChange={handleChange} />
                </div>

                <div className="billing-input-group">
                    <label htmlFor="phone" className="billing-label">Phone Number</label>
                    <input id="phone" name="phone" type="number" placeholder="Phone Number" className="billing-input" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                </div>

                <div className="billing-button-container">
                    <button type="submit" className="billing-button">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default BillingPage;
