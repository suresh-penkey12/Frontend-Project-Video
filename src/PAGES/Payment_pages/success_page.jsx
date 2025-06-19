import React from 'react'
import { Link } from 'react-router-dom'
const Success_page = () => {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100vw"}}>
     <Link to="/DashBoard/mentors" style={{ textDecoration: "none" }}><div style={{padding:"20px",backgroundColor:"#C8FACC",width:"200px",height:"200px",display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",}}>
        <h2 style={{textAlign:"center",textDecoration:"none",color:"black"}}>Payment Successfull</h2>
        <i className="bi bi-check-circle" style={{ fontSize: "50px", color: "green" }}></i>
        </div></Link>
    </div>
  )
}

export default Success_page