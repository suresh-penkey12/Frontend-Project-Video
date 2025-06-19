import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Api } from '../../../Api';
// import "./memborships.css"
import "../../../STYLES/memberships.scss"
import "react-toastify/dist/ReactToastify.css";
import { toast ,ToastContainer } from 'react-toastify';
const Memborships = () => {
  // let Api=import.meta.env.SKILLSYNC_BACKEND_API;
  const[friends,setFriends]=useState([]);
  const[mailmessage,setMailMessage]=useState({message:"",roomid:""});
  const[present,setPresent]=useState(false);
  let token =sessionStorage.getItem("token");
  // console.log("token",token);
  useEffect(()=>{
    console.log("i'm invoked useffrect");
    let fetchData = async()=>{
        console.log("i'm invoked");
      let {data}= await axios.get(`${Api}/connection/memborships/email`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
        withCredentials:true
      })
      // console.log(data);
      setFriends(data.message);
    }
    fetchData();
  },[token])
   // handlemail values
   console.log(mailmessage);
  const handleMailValues=(e)=>{
     setMailMessage((prev)=>({
      ...prev,
      [e.target.name]: e.target.value,
     }))
  }

  //form submit
  const handleFormSubmit =(e)=>{
    console.log("handle submit")
    e.preventDefault();
    setPresent(false);
  }
  //handling mail details
  const handleMail = async(e)=>{
    // setPresent(true);
    let token2 =e.target.dataset.token;
    let email = e.target.dataset.email;
    // console.log(email);
    // console.log(token2);
    if(!token2){
      let {data}=await axios.delete(`${Api}/connection/delete/${email}`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
        withCredentials:true
      });
      toast.error("The user is no longer can Access");
      windows.location.reload();
    }
    else if(!present){
        let arr =Object.values(mailmessage);
        console.log(arr);
        if(arr[0].length >1){
          let bodydata = `the meeting shedules at ${mailmessage.message} and the roomId:${mailmessage.roomid}`;
          let {data} = await axios.post(`${Api}/connection/mail/${email}`,
            {
              data:bodydata
            },
            {
              headers:{
                Authorization:`Bearer ${token}`
              },
              withCredentials:true
            }
          );
          if(data.message){
            toast.success(data.message);
          }else{
            toast.error("Failed to send");
          }
          setTimeout(()=>{
            setMailMessage({message:"",roomid:""})
          },1000)

        
      }
    }
  }

  // console.log(friends);
  // for showing profile
  sessionStorage.setItem("memborships",JSON.stringify(friends));
  // console.log(mailmessage)
  return (
    <div className="membership-container" style={{marginTop:"100px"}}>
      <h4 className="title">Memberships List</h4>

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

      {(
        <form className="chat-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter text"
            name="message"
            value={mailmessage.message}
            onChange={handleMailValues}
          />
          <input
            type="text"
            placeholder="Enter roomId"
            name="roomid"
            value={mailmessage.roomid}
            onChange={handleMailValues}
          />
          {/* <button type="submit">Send</button> */}
        </form>
      )}

      {typeof friends[0] === "string" ? (
        <div className="empty-message">
          <h3>{friends[0]}</h3>
        </div>
      ) : (
        <div className="cards-container">
          {friends.map((friend, ind) => (
            <div key={ind} className="card">
              <div className="card-image">
                <img
                  src={friend.image || "https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"}
                  alt="Profile"
                />
              </div>
              <div className="card-details">
                <h4>{friend.firstname} {friend.lastname}</h4>
                {/* <p>{friend.about}</p> */}
                <h5>{friend.company}</h5>
                {/* <h4>{friend.country}</h4> */}
                <h5>{friend.email}</h5>
                <h5>{friend.job_title}</h5>

                <div className="skills">
                  {friend.skills.length >1 
                    ? friend.skills.map((skill, i) => (
                        <span key={i}>{skill}</span>
                      ))
                    : JSON.parse(friend.skills).map((skill, i) => (
                        <span key={i}>{skill}</span>
                      ))
                  }
                </div>
              </div>

              <div className="card-actions">
                <button className="send-mail" onClick={handleMail} data-email={friend.email} data-token={friend.token}>
                  Send Mail
                </button>
                <Link to="/DashBoard/connections/friends/room">
                  <button className="room">Room</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} toastStyle={{ fontSize: "10px", padding: "15px", width: "200px", height: "30px" }} />
    </div>
  );
}

export default Memborships;