import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import BodyContent from "./Components/BodyContent";
import { Api } from "../../Api";
// import "../../styles/Dashboard.css"; // Import CSS
import "../../STYLES/DashBoardContext.scss";

const Dashboard = () => {
  // let Api=import.meta.env.SKILLSYNC_BACKEND_API;
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  let token = sessionStorage.getItem("token");

  if (!token) {
    navigate("/");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          let { data } = await axios.get(`${Api}/Auth/profile-check/`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          setUserData(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div>
      <div className="dashboard-container">
        <div>
          {userData ? (
            <h3 style={{color:"var(--text-color)"}}>
              Welcome,{" "}
              {userData.name ? userData.name.split(" ")[0] : userData.firstname}!
            </h3>
          ) : (
            <p>Loading.....</p>
          )}
          <h4 style={{color:"var(--text-color)"}}>
            Start Connecting With Mentors to explore your career to the next
            level
          </h4>
          <Link to="/mentor/browse">
            <button className="btn btn-primary browse-btn">Browse Mentors</button>
          </Link>
        </div>
      </div>
      <BodyContent />
    </div>
  );
};

export default Dashboard;
