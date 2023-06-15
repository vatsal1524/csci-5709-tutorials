import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://express-t4.onrender.com/api/login",
        {
          username: email,
          password: password,
        }
      );
      if (response.status === 200) {
        navigate("/users", {
          state: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="container mt-5 col-2 text-center">
      <form class="form-signin" onSubmit={handleSubmit}>
        <h1 class="h3 mb-3 font-weight-normal">Login</h1>
        <label for="email" class="sr-only">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          class="form-control"
          placeholder="Email address"
          required
        />
        <label for="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          class="form-control"
          placeholder="Password"
          required
        />
        <button type="submit" className="mt-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
