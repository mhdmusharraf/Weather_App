// src/components/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/register", { email, password });
      if (response.data === "exist") {
        alert("User already exists");
      } else if (response.data === "notexist") {
        navigate("/home", { state: { id: email } });
      }
    } catch (error) {
      alert("Wrong details");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center bg">
      <div className="w-full max-w-md bg-white bg-opacity-50 rounded-lg shadow-md p-8 glass">
        <h1 className="text-3xl mb-6 text-center text-white font-bold">Signup</h1>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              id="email"
              type="email"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              id="password"
              type="password"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Signup
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link to="/" className="text-purple-500 font-bold underline hover:text-blue-700 transition duration-300">Login Page</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
