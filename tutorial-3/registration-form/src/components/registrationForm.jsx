import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!firstName.match(/^[A-Za-z]+$/)) {
      errors.firstName = "First Name must contain only letters.";
    }

    if (!lastName.match(/^[A-Za-z]+$/)) {
      errors.lastName = "Last Name must contain only letters.";
    }

    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = "Please enter a valid email address.";
    }

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length === 0) {
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      navigate("/profile", {
        state: data,
      });

      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
