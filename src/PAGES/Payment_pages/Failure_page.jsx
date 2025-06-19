import React from 'react'
import { Link } from 'react-router-dom'
const Failure_page = () => {
  return (

      <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100vw"}}>
     <Link to="/DashBoard/mentors" style={{textDecoration:"none"}}><div style={{padding:"20px",backgroundColor:"#FFCCCB",width:"200px",height:"200px",display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",}}>
        <h2 style={{textAlign:"center",color:"black"}}>Payment Failed</h2>
        <i className="bi bi-x-circle" style={{ fontSize: "50px", color: "red" }}></i>
        </div></Link>
    </div>
    
  )
}

export default Failure_page