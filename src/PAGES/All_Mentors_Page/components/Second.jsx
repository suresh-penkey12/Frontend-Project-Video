import React from 'react'
import { Second } from '../../../Data/data'
import { Link } from 'react-router-dom'
const SecondData = () => {
  return (
    <div>
        <div style={{display:"flex", flexDirection:"column",gap:"20px",marginRight:'20%',maxWidth:"100%"}}>
            {Second.map((da)=>(
                <div className="d-flex gap-3 p-4" style={{border:"2px solid #ddd",maxWidth:"100%",borderRadius:"20px"}}>
                    <div>
                      <img src={da.image} alt="image" width={150} height={200} style={{objectFit:"cover",borderRadius:"20px"}}/>
                    </div>
                    <div>
                      <div>
                        <h4>{da.name}</h4>
                        <p>{da.job_title} at <b>{da.company}</b></p>
                      </div>
                      <div>
                        <p>{da.description}</p>
                      </div>
                      <div className='d-flex gap-3'>
                        {da.skills.map((skill)=>(
                          <span style={{padding:"5px 10px", backgroundColor:"#dddd",borderRadius:"20px"}}>{skill}</span>
                        ))} 
                      </div>
                      <div className='d-flex gap-5 m-4'>
                        <span>Starting from <h3 className='d-inline'>${da.price}</h3>/month</span>
                        <Link to={`queryid=${da.name}`}><button className='btn btn-primary'>View Profile</button></Link>
                      </div>
                      
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SecondData