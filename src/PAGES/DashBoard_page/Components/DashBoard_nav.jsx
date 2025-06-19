import React, { useContext, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import plain_logo from "../../../assets/plain_theme.png"
// import "../../styles/DashboardNav.css"; // Import the CSS file
import "../../../STYLES/DashBoardNavbas.scss"
import ThemeProvider, { ThemeContext } from "../../MainPage/ThemeContext";
const DashBoard_nav = () => {
  const location = useLocation();
  const[bars,setbars]=useState(false);
  const navRef =useRef();
  // const{theme,Updatetheme}=useContext()
  const{theme,Updatetheme}=useContext(ThemeContext)
  const showNavbar =()=>{
    navRef.current.classList.toggle(
      "responsive_nav"
    );
    setbars(!bars)
  }
  return (
    <header
      className="navbar-container"
      style={{ backgroundColor: "var(-primary-color)" }}
    >
      <div className="nav-links">
        <Link to="/DashBoard/mentors">
          <img
            src={theme === "light" ? logo : plain_logo}
            alt="Logo"
            width={150}
            height={100}
          />
        </Link>
        {/* <Link
          to="/DashBoard/mentors"
          className={`nav-link ${location.pathname.includes("/mentors") ? "active" : ""}`}
        >
          Mentors
        </Link>
        <Link
          to="/DashBoard/connections"
          className={`nav-link ${location.pathname.includes("/Requests") ? "active" : ""}`}
        >
          Connections
        </Link>
        <Link
          to="/DashBoard/profile"
          className={`nav-link ${location.pathname.includes("/profile") ? "active" : ""}`}
        >
          Profile
        </Link> */}
      </div>

      <button
        className="theme-btn"
        style={{
          color: theme === "light" ? "white" : "black",
          backgroundColor: theme === "light" ? "black" : "white",
          borderRadius: "20px",
        }}
        onClick={Updatetheme}
      >
        {theme === "light" ? "🌙" : "🌤️"}
      </button>
      <nav className="nav" ref={navRef}>
        <div className="nav-buttons">
          <Link
            to="/DashBoard/mentors"
            className={`nav-link ${
              location.pathname.includes("/mentors") ? "active" : ""
            }`}
          >
            Mentors
          </Link>
          <Link
            to="/DashBoard/connections"
            className={`nav-link ${
              location.pathname.includes("/Requests") ? "active" : ""
            }`}
          >
            Connections
          </Link>
          <Link
            to="/DashBoard/profile"
            className={`nav-link ${
              location.pathname.includes("/profile") ? "active" : ""
            }`}
          >
            Profile
          </Link>
          <Link to="/mentor/browse" style={{textDecoration:"none"}}>
            <button className="btn btn-primary">Browse Mentors</button>
          </Link>
          <Link to="/" style={{textDecoration:"none"}}>
            <button
              className="btn btn-danger"
              onClick={() => sessionStorage.clear()}
            >
              Log Out
            </button>
          </Link>
        </div>
      </nav>
      {bars === false ? (
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      ) : (
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      )}
    </header>
  );
};

export default DashBoard_nav;
