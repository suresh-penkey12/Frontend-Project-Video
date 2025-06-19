import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Api } from '../../../Api';
// import "./memborships.css"
import "../../../STYLES/friends.scss"
// import "../../../STYLES/memberships.scss"
const Friends = () => {
  // let Api=import.meta.env.SKILLSYNC_BACKEND_API;
  const[friends,setFriends]=useState([]);
  const[present,setPresent]=useState(false);
    const[mailmessage,setMailMessage]=useState({message:"",roomid:""});
  let token =sessionStorage.getItem("token");
  useEffect(()=>{
    let fetchData = async()=>{
      let {data}= await axios.get(`${Api}/connection/friends/email`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
        withCredentials:true
      })
      setFriends(data.message);
    }
    fetchData();
  },[token])
  const handleMailValues=(e)=>{
    setMailMessage((prev)=({
      ...prev,[e.target.name]:e.target.value,
    }))
  }
  const handleFormSubmit=(e)=>{
    e.preventDefault();
    setPresent(false);
  }
  const handleMail = async(e)=>{
    setPresent(true);
    let email =e.target.name;
    let arr=Object.values(mailmessage);
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
  console.log(friends);
  let data= typeof friends[0]==="string" ? 0 : friends
  sessionStorage.setItem("friends",JSON.stringify(data))
  return (
    <div className="friends-container" style={{marginTop:"100px"}}>
      <h4 className="title">Friends List</h4>

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
        <h3 className="empty-message">{friends[0]}</h3>
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
                <h3>{friend.firstname} {friend.lastname}</h3>
                <h4>{friend.company}</h4>
                <h4>{friend.country}</h4>
                <h4>{friend.description}</h4>
                <h4>{friend.email}</h4>
                <h4>{friend.job_title}</h4>

                <div className="skills">
                  {Array.isArray(friend.skills)
                    ? friend.skills.map((skill, i) => <span key={i}>{skill}</span>)
                    : JSON.parse(friend.skills).map((skill, i) => <span key={i}>{skill}</span>)
                  }
                </div>
              </div>

              <div className="card-actions">
                <button className="mail-btn" onClick={handleMail} name={friend.email}>Send Mail</button>
                <Link to="/DashBoard/connections/friends/room">
                  <button className="room-btn">Room</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Friends