import React, { useEffect, useState } from 'react'
import image from "./dummy-user.png"
import { Link } from 'react-router-dom'
import { Data } from '../../../Data/data'
import { Api } from '../../../Api'
import axios from 'axios'
import "../../../STYLES/part2.css"
const Part2 = () => {
  const[Data,setData]=useState([]);
  // let Api=import.meta.env.SKILLSYNC_BACKEND_API;

  useEffect(()=>{
     let fetchdata =async()=>{
      let {data}=await axios.post(`${Api}/Auth/AllData`)
      let{message}=data;
      // console.log(message)
      setData(message)
     }
     fetchdata()
  },[])
  return (
    <div style={{backgroundColor:"var(--background-color)"}}> 
      <div className='mainn'>
        <div className='sidebar'>
            <div className='d-flex sideer'>
                <div>
                    <h6>john cruise</h6>
                    <h6>software Engineer</h6>
                    {/* <h6>Engineer</h6> */}
                </div>
                <div>
                    <img src={image} alt="image" width={80} height={80} style={{borderRadius:"50px"}}/>
                </div>
            </div>
            <div className='d-flex flex-column gap-3'>
              <h6 style={{backgroundColor:"var(--border-color)",padding:"4%"}}>Intro session</h6>
              <h6 style={{backgroundColor:"var(--border-color)",padding:"4%"}}>Cv review</h6>
              <h6 style={{backgroundColor:"var(--border-color)",padding:"4%"}}>Expert Session</h6>
            </div>
        </div>
        <div className="d-flex flex-column gap-4"style={{padding:"5%"}}>
          <h2 style={{fontFamily:"sans-serif"}} className='head'>It's In your Hand : Grab It and full fill your Dream</h2>
          <h5 style={{fontFamily:"sans-serif"}} className='heade'>Want to start a new dream career? Successfully build your startup? Itching to learn high-demand skills? Work smart with an online mentor by your side to offer expert advice and guidance to match your zeal. Become unstoppable using SkillSync</h5>
          <div className='fav'>
            <div className='fav-left'>
              <h6><i class="bi bi-check-circle-fill text-primary"></i>&nbsp;&nbsp;Hundred's of Mentors</h6>
              <h6><i class="bi bi-check-circle-fill text-primary"></i>&nbsp;&nbsp;Free Trail</h6>
              <h6><i class="bi bi-check-circle-fill text-primary"></i>&nbsp;&nbsp;1-to-1</h6>
            </div>
            <div className='fav-right'>
              <h6><i class="bi bi-check-circle-fill text-primary"></i>&nbsp;&nbsp;Flexible Program</h6>
              <h6><i class="bi bi-check-circle-fill text-primary"></i>&nbsp;&nbsp;Perfomance Charts</h6>
              <h6><i class="bi bi-check-circle-fill text-primary"></i>&nbsp;&nbsp;95% satisfaction rate</h6>
            </div>
            <Link to="/mentor/browse/" ><button style={{backgroundColor:"#1976FF",padding:"5px 10px",color:"white",marginTop:"5%",borderRadius:"20px",borderColor:"#F5F5F5"}}>Find A Mentor </button></Link>
          </div>
        </div>
      </div>
         <div 
            className='d-grid gap-4' 
            style={{ 
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
              padding: "5%",
            }}
          >
            {Data.slice(0,15).map((card, ind) => (
              <Link 
                key={ind} 
                to={`/mentor/${card._id}/`} 
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div 
                  className='d-flex flex-column align-items-center p-3 shadow-lg' 
                  style={{ 
                    backgroundColor: "var(--primary-color)", 
                    borderRadius: "12px", 
                    height: "100%",  /* Ensures all cards have the same height */
                    transition: "transform 0.3s ease-in-out", 
                    border: "1px solid var(--border-color)",
                    textAlign: "center",
                    display: "flex", 
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  {/* Image */}
                  <img 
                    src={card.image.startsWith("https") ?card.image : card.file} 
                    alt="mentor"  
                    style={{ 
                      objectFit: "cover", 
                      width: "100%", 
                      height: "250px", 
                      borderRadius: "12px",
                    }} 
                  />

                  {/* Name & Job Title */}
                  <h4 className="mt-3">{card.firstname} {card.lastname}</h4>
                  <h5 style={{ fontSize: "1rem", color: "var(--text-color)", minHeight: "40px" }}>
                    {card.job_title} at {card.company}
                  </h5>

                  {/* Skills */}
                  <div 
                    className="d-flex gap-2 flex-wrap justify-content-center align-items-center mt-2"
                    style={{ minHeight: "50px" }}  // Ensures same space for skills
                  >
                    {card.skills.length > 1 ? (
                      card.skills.map((skill, ind) => (
                        <span 
                          key={ind} 
                          style={{ 
                            backgroundColor: "var(--fourth-color)", 
                            padding: "5px 12px", 
                            borderRadius: "20px", 
                            fontSize: "0.9rem",
                            whiteSpace: "nowrap"  // Prevents breaking inside span
                          }}
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <div className="d-flex gap-2 flex-wrap">
                        {JSON.parse(card.skills[0])?.map((skill, ind) => (
                          <span 
                            key={ind} 
                            style={{ 
                              backgroundColor: "var(--fourth-color)", 
                              padding: "5px 12px", 
                              borderRadius: "20px", 
                              fontSize: "0.9rem",
                              whiteSpace: "nowrap" 
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>


                  {/* Button (Aligned at Bottom) */}
                  <div style={{ flexGrow: 1 }}></div> {/* Push button to bottom */}
                  <button 
                    className="mt-3 btn btn-primary w-100" 
                    style={{ borderRadius: "8px", padding: "8px 12px" }}
                  >
                    View Profile
                  </button>
                </div>
              </Link>
            ))}
          </div>
    </div>
  )
}

export default Part2