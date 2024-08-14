import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log("Form submitted successfully");
    }
  };

  const handleSocialSignIn = (provider) => {
    const urls = {
      google: 'https://accounts.google.com/signin',
      microsoft: 'https://login.microsoftonline.com/',
      apple: 'https://appleid.apple.com/auth/authorize',
    };
    window.location.href = urls[provider];
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <button type="submit">Sign In</button>
        </form>
        <div className="social-buttons">
          <button className="google" onClick={() => handleSocialSignIn('google')}>Google</button>
          <button className="microsoft" onClick={() => handleSocialSignIn('microsoft')}>Microsoft</button>
          <button className="apple" onClick={() => handleSocialSignIn('apple')}>Apple</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
