import React, { useState ,useEffect, useCallback} from 'react'
import ContinueEffet from './components/Effect.jsx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import InfiniteScrollCards from './components/Scroll.jsx'
// import "../../../STYLES/Part1.scss"
import "../../../STYLES/part1.css"
const Part1 = () => {
  const[value,setValue]=useState("");
  let navigate = useNavigate();
  const handleChange =(e)=>{
    setValue(e.target.value);
    
  }
  const handleTransport=()=>{
    // console.log(value);
    let params =new URLSearchParams();
    if(value.trim()) params.set("search",value);
    let query = params.toString();
    // console.log(query)
   value.length > 0 ? navigate(`/mentor/browse?${query}`) : navigate("/");
    // if()
  }
  return (
    <>
      <div className='d-grid' style={{gridTemplateColumns:"2fr 1fr",backgroundColor:"var(--background-color)",marginTop:"80px"}}>
        <div className='d-flex flex-column gap-4 flex-shrink-1  main' style={{paddingLeft:"10%", paddingTop:"7%"}}>
            <p style={{fontSize:"1.2rem"}}>Learn a new Skill,Land your Dream Job</p>
            <div className='d-flex gap-2 effect'>
                <h1 style={{color:"var(--text-color)"}}>1-on-1</h1>
                <h1 style={{color:"var(--secondary-color)"}}><ContinueEffet/></h1><br />
                <h1 style={{color:"var(--text-color)"}}>MentorShip</h1>
            </div>
            <div className="input-group w-75 search">
              <input type="text" className="search-bar" value={value} onChange={handleChange} placeholder="Search by company, skills or role"  />
              <button className="custom-btn" onClick={handleTransport}>
                Find mentors
              </button>
           </div>
           <div className='buttonss'>
              <div className='d-flex gap-2'>
                <p className='p-1' style={{backgroundColor:"var(--primary-color)",borderRadius:"15px",color:"var(--text-color)"}}>product managers</p>
                <p className='p-1'style={{backgroundColor:"var(--primary-color)",borderRadius:"15px",color:"var(--text-color)"}}>Career Coaches</p>
                <p className='p-1' style={{backgroundColor:"var(--primary-color)",borderRadius:"15px",color:"var(--text-color)"}}>Software Engineering</p>
              </div>
              <div className='d-flex gap-2'>
                <p className='p-1' style={{backgroundColor:"var(--primary-color)",borderRadius:"15px",color:"var(--text-color)"}}>Leadership mentors</p>
                <p className='p-1' style={{backgroundColor:"var(--primary-color)",borderRadius:"15px",color:"var(--text-color)"}}>Ux Designers</p>
                <p className='p-1' style={{backgroundColor:"var(--primary-color)",borderRadius:"15px",color:"var(--text-color)"}}>Data Scientist</p>
              </div>
           </div>
           <div className='d-flex gap-5'>
            <div>
              <h2>800+</h2>
              <p>Mentors</p>
            </div>
            <div>
              <h2>2000+</h2>
              <p>matches made</p>
            </div>
            <div>
              <h2>20+</h2>
              <p>countries represented</p>
            </div>
           </div>

        </div>
        <div className="Scroll_cards" style={{marginRight:"10%"}}>
          <InfiniteScrollCards/>
        </div>
      </div>
    </>
  )
}

export default Part1