import React, { useCallback, useEffect, useState } from 'react'
import { data, Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import "../../../STYLES/leftpart.scss"
import { Api } from '../../../Api';
import useFetch from '../../../Data/ApiData';
// import { Data } from '../../../Data/data';
const Leftpart = () => {
  // let Api=import.meta.env.SKILLSYNC_BACKEND_API;
    let{query_id}=useParams();
    // let key = import.meta.env.VITE_SKILLSYNC_PUBLISH_KEY;
    // console.log(key)
    const stripePromise = loadStripe(import.meta.env.VITE_SKILLSYNC_PUBLISH_KEY);
    console.log(stripePromise);
    const[list,setList]=useState(null);
    const[payment,setPayment]=useState(false);
    const[email,setEmail]=useState("");
    const navigate =useNavigate();
    // const[userData,setUserData]=useState([])
    let token =sessionStorage.getItem("token");
    let login = sessionStorage.getItem("login");
    let profile = JSON.parse(sessionStorage.getItem("profiledata"))
    useEffect(()=>{
        let newdata =async()=>{
          let {data} = await axios.get(`${Api}/Auth/Get_Data/${query_id}`);
          // console.log(data.message);
          let{message}=data;
          setList(message[0]);
        }
        newdata();
    },[query_id])   
    useEffect(()=>{
      if(!email) return;
      const currentTime = new Date().getTime();
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      let localData = JSON.parse(localStorage.getItem(email));
      console.log(localData)
      if(!localData) return ;
      let {status,timestamp} = localData
      if(status && currentTime-timestamp < oneMonth){
        console.log("i'm entering here ")
        setPayment(true);
      }else{
        setPayment(false);
        localStorage.removeItem(email);
      }
    },[email])

    let handleConnect =async(e)=>{
      e.preventDefault();
      if(!login){
        toast.error("please login and continue")
        return;
      }
      if(!profile){
        toast.error("Please Create your profile")
        setTimeout(()=>{
          navigate("/DashBoard/profile")
        },1000)
      }
      let amount =parseInt(e.target.dataset.price);
      let email =e.target.dataset.email;
      console.log(payment);
      if(amount>0 && !payment){
        toast.error("These is paid user,you need to pay first");
      }
      if(amount===0 || payment){
        let status = payment?"membor":"free";
        let {data} =await axios.post(`${Api}/connection/assign/${email}/${status}`,{},{
         headers: { Authorization: `Bearer ${token}` },
           withCredentials: true,
         })
         console.log(data.message);
         toast.success(data.message);
      }
        
    }
    // console.log(list);
    if(!list){
      return <h4>Loading...</h4>
    }
    
    let handlePayment =async(e)=>{
      if(!login){
        toast.error("please login and continue")
        return
      }
      if(!profile){
        toast.error("Please Create your Profile")
        setTimeout(()=>{
          navigate("/DashBoard/profile")
        },1000)
      }
      let amt = parseInt(e.target.dataset.price);
      let email =e.target.dataset.email;
      console.log(payment);
      console.log(typeof amt);
      if(amt===0 || payment){
        setPayment(true);
        toast.error("No Need To Do Payment")
      }
      else{
        console.log("i'm in else block");
        const stripe = await stripePromise;
        console.log(stripe);
        const response = await fetch(`${Api}/connection/payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount:amt }) 
        });
        const session = await response.json();

        if(session.id){
          const paymentData = {
            status: true,
            timestamp: new Date().getTime(), 
          };
          localStorage.setItem(email, JSON.stringify(paymentData));
          await stripe.redirectToCheckout({ sessionId: session.id });
          toast.success("Payment Successfull");
          console.log("i'm invoked in if block")
        }else{
          toast.error("Payment Failed");
        }
      }
    }
    
    
  return (
    <>
      <div className="leftpart-container">
        <div className="left-section">
          <div className="profile-card">
            <img src={list.image.startsWith("https")?list.image : list.file} alt="Profile" />
          </div>
          <div className="profile-details">
            <div>
              {list.name ? (
                <h3>{list.name}</h3>
              ) : (
                <h3>
                  {list.firstname} {list.lastname}
                </h3>
              )}
              <h6>
                {list.job_title} @{list.company}
              </h6>
              <h6>{list.description}</h6>
            </div>
            <div className="skills">
              <h5>Skills</h5>
              {/* <div className="skill-list">
                {list.skills.length > 1
                  ? list.skills.map((skill, index) => (
                      <p key={index}>{skill}</p>
                    ))
                  : JSON.parse(list.skills[0]).map((skill, index) => (
                      <p key={index}>{skill}</p>
                    ))}
              </div> */}
            </div>
            <div className="info">
              <p>
                <i className="bi bi-geo-alt-fill text-primary"></i>
                {list.country}
              </p>
              <p>
                <i className="bi bi-star-fill text-primary"></i>4.8
              </p>
              <p>
                <i className="bi bi-clock-fill text-primary"></i>Active Today
              </p>
            </div>
            <div>
              <h6>{list.about}</h6>
            </div>
          </div>
        </div>
        <div className="right-section">
          <p>Membership Plans</p>
          <div className="membership-details">
            <h4>
              {list.price} &#8377;/<span>month</span>
            </h4>
            <p>
              Video calls, pair programming, code reviews, interview practice &
              unlimited chat on Slack.
            </p>
            <div className="benefits">
              <p>
                <i className="bi bi-telephone-fill text-primary"></i> 4 calls per
                month (60min/call)
              </p>
              <p>
                <i className="bi bi-chat-dots-fill text-primary"></i> Unlimited
                Q&A via chat
              </p>
              <p>
                <i className="bi bi-clock-fill text-primary"></i> Expect
                responses in 24 hours or less
              </p>
              <p>
                <i className="bi bi-bag-fill text-primary"></i> Hands-on support
              </p>
            </div>
            <div className="buttons">
              <button
                className="btn btn-primary"
                data-price={list.price}
                data-email ={list.email}
                onClick={handleConnect}
              >
                Connect
              </button>
              {parseInt(list.price) > 0 ? (
                <button
                  className="btn btn-primary"
                  data-price={list.price}
                  data-email={list.email}
                  onClick={handlePayment}
                >
                  PAY
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastStyle={{
          fontSize: "10px",
          padding: "15px",
          width: "200px",
          height: "30px",
        }}
      />
    </>
  )
}

export default Leftpart