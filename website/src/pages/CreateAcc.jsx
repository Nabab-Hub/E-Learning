import React, { useState } from "react";
import "./CreateAcc.css";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const CreateAcc = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    confpassword: "",
    email: "",
    phone: "",
    role: "", // Default role is "student"
  });
  const { BACKEND_HOSTING_URL, storeTokenInLS } = useAuth();

  const handleUserDataChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log(userDetails);
    

    // Password mismatch check before API call
    if (userDetails.password !== userDetails.confpassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(userDetails.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Validate phone number (just an example check)
    if (userDetails.phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_HOSTING_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userDetails}),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully");
        console.log(res_data);
        // Store the token in local storage
        storeTokenInLS(res_data.token);
      } else {
        // Display error messages from the backend
        Object.values(res_data).forEach((err) => toast.error(err));
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="create-acc-container">
      <div className="create-acc-box">
        <h1 className="organization-title">Educational Organization</h1>
        <h2 className="create-acc-title">Create Your Account</h2>
        <p className="create-acc-subtitle">
          Fill in the details to create a new account
        </p>
        <form className="create-acc-form" onSubmit={handleSignup}>
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-input"
            placeholder="Choose a username"
            name="username"
            value={userDetails.username}
            onChange={handleUserDataChange}
            required
          />
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter your email"
            name="email"
            value={userDetails.email}
            onChange={handleUserDataChange}
            required
          />
          <label className="form-label" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel" // Changed to 'tel' for phone input
            id="phone"
            className="form-input"
            placeholder="Enter your phone"
            name="phone"
            value={userDetails.phone}
            onChange={handleUserDataChange}
            required
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Create a password"
            name="password"
            value={userDetails.password}
            onChange={handleUserDataChange}
            required
          />
          <label className="form-label" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="form-input"
            placeholder="Confirm your password"
            name="confpassword"
            value={userDetails.confpassword}
            onChange={handleUserDataChange}
            required
          />

          {/* Radio Buttons for Role Selection */}
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={userDetails.role === "student"}
                onChange={handleUserDataChange}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={userDetails.role === "teacher"}
                onChange={handleUserDataChange}
              />
              Teacher
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={userDetails.role === "admin"}
                onChange={handleUserDataChange}
              />
              Admin
            </label>
          </div>

          <button type="submit" className="create-acc-button">
            Create Account
          </button>
        </form>
        <p className="info-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Log in here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default CreateAcc;
