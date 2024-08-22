"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Import React Icons
import "bootstrap/dist/css/bootstrap.min.css";

import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formDatas = new FormData();
    formDatas.append("name", formData.name);
    formDatas.append("email", formData.email);
    formDatas.append("password", formData.password);

    try {
      const response = await axios.post("/api/register", formDatas);
      if (response.data.success) {
        toast.success(response.data.msg);
        setFormData({ name: "", email: "", password: "" });
      } else {
        toast.error("Error: " + response.data.msg || "Something went wrong.");
      }
    } catch (error) {
      console.log("not sending", error);
    }
  };

  return (
    <div className="container container-fluid registerforms">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-10 col-lg-5">
          <form className="form" onSubmit={submitHandler}>
            <h1 className="mb-4 text-dark text-center">Register</h1>

            <div className="inputForm">
              <FaUser size={20} className="icon" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="inputForm">
              <FaEnvelope size={20} className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="inputForm">
              <FaLock size={20} className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </span>
            </div>

            <button type="submit" className="button-submit">
              Register
            </button>

            <ToastContainer theme="dark" />
            <p className="p">
              Already Have An Account?{" "}
              <Link href="/login" className="span">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
