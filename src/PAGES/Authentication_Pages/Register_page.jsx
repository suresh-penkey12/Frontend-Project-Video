import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Api } from "../../Api";
import "../../STYLES/register_page.scss"
const RegisterPage = () => {
  // let Api=import.meta.env.SKILLSYNC_BACKEND_API;
  const [register, setRegister] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    if (!register.email || !register.password || !register.firstname || !register.lastname) {
      toast.error("All fields are required!");
      return false;
    }
    if (!isValidEmail(register.email)) {
      toast.error("Invalid email format!");
      return false;
    }
    if (register.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${Api}/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(register),
      });

      const data = await response.json();
      console.log(data);

      if (!data.message) {
        toast.error("User not valid");
      } else {
        if (data.message) {
          toast.success("Register successful!");
          sessionStorage.setItem("token", data.token);
          setTimeout(() => {
            window.location.href = "/Auth/Login";
          }, 500);
        } else {
          toast.error(data.message || "Enter valid details");
        }
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="register-container" style={{marginTop:"100px"}}>
      {/* Logo Section */}
      <div className="logo-section">
        <img src={logo} alt="Logo" />
      </div>

      {/* Register Form */}
      <div className="register-form">
        <div className="card">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstname"
                className="form-control"
                placeholder="Enter your first name"
                value={register.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                placeholder="Enter your last name"
                value={register.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={register.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={register.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>

          {/* Already have an account */}
          <p className="text-center">
            Already have an account? <Link to="/Auth/Login">Login here</Link>
          </p>
        </div>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          toastStyle={{ fontSize: "10px", padding: "15px", width: "200px", height: "30px" }}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
