import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { Api } from '../../../Api';
// import "./Requests.scss";  // Import the SCSS file
// import "../../../STYLES/friends.scss"
import "../../../STYLES/Friend_Request.scss"

const Requests = () => {
  // let Api=import.meta.env.SKILLSYNC_BACKEND_API;
  const [requests, setRequests] = useState([]);
  let token = sessionStorage.getItem("token");

  useEffect(() => {
    let requestData = async () => {
      try {
        let { data } = await axios.get(`${Api}/connection/requests/email`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        console.log(data.message);
        setRequests(data.message);
      } catch (errr) {
        console.log(errr);
      }
    };
    requestData();
  }, []);

  const handleResponse = useCallback(async (e) => {
    let result = "free";
    let { data } = await axios.get(`${Api}/connection/response/${e.target.innerText}/${e.target.name}/${result}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    });
    toast.success(data.message);
  }, []);

  return (
    <div style={{marginTop:"150px"}}>
      <h4 className="tit">Friend requests</h4>
      <div className="tab-links">
        <Link to="/DashBoard/connections/requests">
          <button>Friend Requests</button>
        </Link>
        <Link to="/DashBoard/connections/membor_requests">
          <button>Membership Requests</button>
        </Link>
        <Link to="/DashBoard/connections/memborships">
          <button>Memberships</button>
        </Link>
        <Link to="/DashBoard/connections/friends">
          <button>Friends</button>
        </Link>
      </div>

      {typeof requests[0] === "string" && <h3 className="text-center">{requests[0]}</h3>}

      <div className="requests-list">
        {typeof requests[0] !== "string" &&
          requests.map((reqe, ind) => (
            <div className="request-card" key={ind}>
              <div className="request-info">
                <img src={reqe.image} alt="" />
                <div className="details">
                  <h3>{reqe.firstname} {reqe.lastname}</h3>
                  {/* <h4>{reqe.email}</h4> */}
                  <h4>{reqe.job_title} at {reqe.company}</h4>
                  <div className="skills">
                    {reqe.skills.length > 1 ? (
                      reqe.skills.map((skill, i) => (
                        <span key={i} className="badge">{skill}</span>
                      ))
                    ) : (
                      JSON.parse(reqe.skills[0]).map((skill, i) => (
                        <span key={i} className="badge">{skill}</span>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="actions">
                <button className="accept-btn" name={reqe.email} onClick={handleResponse}>Accept</button>
                <button className="reject-btn" name={reqe.email} onClick={handleResponse}>Reject</button>
              </div>
            </div>
          ))}
      </div>

      <ToastContainer position="top-center" autoClose={3000} className="toast-container" />
    </div>

  );
}

export default Requests;
