import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import { Api } from '../../../Api';
import "../../../STYLES/memberships.scss"
const MemborRequests = () => {
  // let Api=import.meta.env.SKILLSYNC_BACKEND_API;
    const[requests,setrequests] = useState([]);
    let token =sessionStorage.getItem("token");
    // console.log(email)
    useEffect(()=>{
      let requestdata =async(req,res)=>{
        try{
          let {data} = await axios.get(`${Api}/connection/membor_requests/email`,{
            headers:{Authorization:`Bearer ${token}`},
            withCredentials:true
          });
          console.log(data.message);
          setrequests(data.message);
        }
        catch(errr){
          console.log(errr);
        }
      }
      requestdata();
    },[])
    const handleResponse=useCallback(async(e)=>{
        let result ="pay";
      let {data}=await axios.get(`${Api}/connection/response/${e.target.innerText}/${e.target.name}/${result}`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
        withCredentials:true
      })
      toast.success(data.message);
    })
    console.log(typeof requests[0] ==="string");
    console.log(requests);
    return (
      <div className="membership-container" style={{marginTop:"100px"}}>
        <h4 className="title">Membership Requests</h4>
  
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
  
        {typeof requests[0] === "string" ? (
          <div className="empty-message">
            <h3>{requests[0]}</h3>
          </div>
        ) : (
          <div className="cards-container">
            {requests.map((reqe, ind) => (
              <div key={ind} className="card">
                <div className="card-image">
                  <img
                    src={reqe.image || "https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"}
                    alt="Profile"
                  />
                </div>
  
                <div className="card-details">
                  <h4>{reqe.firstname} {reqe.lastname}</h4>
                  <h5>{reqe.email}</h5>
                  <h5>{reqe.job_title} at {reqe.company}</h5>
                  <p>{reqe.about}</p>
  
                  <div className="skills">
                    {reqe.skills.length >1 
                      ? reqe.skills.map((skill, i) => (
                          <span key={i}>{skill}</span>
                        ))
                      : JSON.parse(reqe.skills[0]).map((skill, i) => (
                          <span key={i}>{skill}</span>
                        ))
                    }
                  </div>
                </div>
  
                <div className="card-actions">
                  <button className="accept"   name={reqe.email} onClick={handleResponse}>Accept</button>
                  <button className="reject" name={reqe.email} onClick={handleResponse}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
  
        <ToastContainer position="top-center" autoClose={3000} toastStyle={{ fontSize: "10px", padding: "15px", width: "200px", height: "30px" }} />
      </div>
    );
}

export default MemborRequests;