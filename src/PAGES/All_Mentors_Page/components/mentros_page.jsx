// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { Api } from '../../../Api';
// import "../../../STYLES/mentors.css"
// const Mentros_page = () => {
//     // let Api=import.meta.env.SKILLSYNC_BACKEND_API;

//     let [data] = useSearchParams();
//     console.log(useSearchParams())

//     const searchParams = new URLSearchParams(window.location.search);
// const searchQuery = searchParams.get('search');
// console.log("Search Query:", searchQuery);

//     const[activePage,setActivePage]=useState(0);
//     console.log(data);
//     let search = data.get("search") || "";
//     console.log(search)
//     let tags = data.getAll("tags");
//     let jobs = data.getAll("job_titles");
//     let company = data.getAll("company");
//     console.log(search);
//     console.log(tags);
//     let query = [];
//     if (search) query.push(`search=${encodeURIComponent(search)}`);
//     if (tags) query.push(`tags=${encodeURIComponent(tags)}`);
//     if (jobs) query.push(`job_titles=${encodeURIComponent(jobs)}`);
//     if (company) query.push(`company=${encodeURIComponent(company)}`)
//     console.log(query)
//     const queryString = query.length ? `?${query.join("&")}` : "";
//     console.log(queryString);
//     let email = JSON.parse(sessionStorage.getItem("email"));
//     const [AllData, setMemoizedData] = useState([]);
//     console.log(window.location.href)
//     useEffect(() => {
//         let fetchData = async () => {
//             let { data } = await axios.get(`${Api}/Auth/AllData?${queryString}`);
//             let { message } = data;
//             if (email) {
//                 let finalData = message.filter(each => each.email !== email);
//                 setMemoizedData(finalData);
//             } else {
//                 setMemoizedData(message);
//             }
//         };
//         fetchData();
//     }, [search,tags,jobs,company]);

//     const handleTab=(k)=>{
//         setActivePage(k);
//     }
//     const handlePrev=()=>{
//         setActivePage((prev)=>prev-1);
//     }
//     const handleNext=()=>{
//         setActivePage((prev)=>prev+1);
//     }
//     let Cards =4;
//     let totalPages = Math.ceil(AllData.length/Cards);
//     let start=activePage*Cards;
//     let end =start+Cards;
//     return (
//         <div className='ment'>
//             <div style={{  padding: "15px", textAlign: "center", borderRadius: "10px", marginBottom: "20px" }}>
//                 <h2>Mentors</h2>
//             </div>
//             <div className='cards'>
//                 {AllData.slice(start,end).map((da) => (
//                     <div className=" carrd" style={{ border: "2px solid var(--border-color)", maxWidth: "100%", borderRadius: "20px", backgroundColor: "var(--background-color)" }} key={da._id}>
//                         <div>
//                             <img src={da.image.startsWith("https") ? da.image : da.file} alt="mentor" width={150} height={200} style={{ objectFit: "cover", borderRadius: "20px" }} />
//                         </div>
//                         <div>
//                             <h4>{da.firstname} {da.lastname}</h4>
//                             <p>{da.job_title} at <b>{da.company}</b></p>
//                             <p>{da.description}</p>
//                             <div className='skill-map'>
//                                 {(da.skills.length > 1) ? da.skills.map((skill, index) => (
//                                     <span className="skilled" key={index} >{skill}</span>
//                                 )) : JSON.parse(da.skills[0]).map((skill, index) => (
//                                     <span className="skilled" key={index} >{skill.length > 1 ? skill : ""}</span>
//                                 ))}
//                             </div>
//                             <div className='d-flex gap-5 m-4 p-2'>
//                                 <span>Starting from <h3 className='d-inline'>&#8377;{parseInt(da.price)}</h3>/month</span>
//                                 <Link to={`/mentor/${da._id}`}><button className='btn btn-primary profile-btn'>View Profile</button></Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className='pagination-main'>
//                 <button disabled={activePage===0} className='steps' onClick={handlePrev}>Prev</button>
//                 {[...Array(totalPages).keys()].map((k)=>(
//                     <span key={k} className='page' style={{backgroundColor:activePage===k ?"var(--secondary-color)":"",color:activePage===k?"white":"var(--text-color)"}} onClick={()=>handleTab(k)}>{k}</span> 
//                 ))}
//                <button disabled={activePage===totalPages-1} className='steps' onClick={handleNext}>Next</button>
//             </div>
//         </div>
//     );
// }

// export default Mentros_page;



import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Api } from '../../../Api'
import { Link } from 'react-router-dom';
import "../../../STYLES/mentors.css"

// const mentros_page = ({filters}) => {
//   const [allMentorData, setAllMentorData] = useState([])

//   const fetchAllMentorData = async()=>{
//     try {
//       const res = await axios.get(`${Api}/Auth/AllData`)
//       setAllMentorData(res.data.message)
//     } catch (error) {
//       console.log(error)
//     }
    
//   }
  
//   const fetchFilterData = async ()=>{
//     try {
//       const query = `search=${filters.search}`
//       const res = await axios.get(`${Api}/Auth/AllData?${query}`)
//       setAllMentorData(res.data.message)
//     } catch (error) {
//       console.log(error)
//     }
//   }
  

//   useEffect(
//     ()=>{
//       if(filters.search.length > 0 ~ ){
//         fetchFilterData()
//       }
//       fetchAllMentorData()
//     }, [filters]
//   )

//   return (
//     <div>
//       {allMentorData.map(v=><h1 key={v._id}>{v.firstname} {v.lastname}</h1>)}
//     </div>
//   )
// }


const Mentros_page = ({ filters }) => {
  // console.log(filters)
  const[activePage,setActivePage]=useState(0);
  const [allMentorData, setAllMentorData] = useState([]);
  const Api = 'https://skillsync-backend-rsyq.onrender.com';

  // Fetch mentor data based on filters
  const fetchMentorData = async () => {
    try {
      const url = `${Api}/Auth/AllData`;

      const res = await axios.post(url, filters);
      setAllMentorData(res.data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Trigger fetch on filter change
  useEffect(() => {
    fetchMentorData();
  }, [filters]);
  const handleTab=(k)=>{
      setActivePage(k);
  }
  const handlePrev=()=>{
      setActivePage((prev)=>prev-1);
  }
  const handleNext=()=>{
      setActivePage((prev)=>prev+1);
  }
  let Cards =4;
  let totalPages = Math.ceil(allMentorData.length/Cards);
  let start=activePage*Cards;
  let end =start+Cards;
  return (
    <div className='ment'>
             <div style={{  padding: "15px", textAlign: "center", borderRadius: "10px", marginBottom: "20px" }}>
                 <h2>Mentors</h2>
             </div>
             <div className='cards'>
                {allMentorData.slice(start,end).map((da) => (
                    <div className=" carrd" style={{ border: "2px solid var(--border-color)", maxWidth: "100%", borderRadius: "20px", backgroundColor: "var(--background-color)" }} key={da._id}>
                        <div>
                            <img src={da.image.startsWith("https") ? da.image : da.file} alt="mentor" width={150} height={200} style={{ objectFit: "cover", borderRadius: "20px" }} />
                        </div>
                        <div>
                            <h4>{da.firstname} {da.lastname}</h4>
                            <p>{da.job_title} at <b>{da.company}</b></p>
                            <p>{da.description}</p>
                            <div className='skill-map'>
                                {(da.skills.length > 1) ? da.skills.map((skill, index) => (
                                    <span className="skilled" key={index} >{skill}</span>
                                )) : JSON.parse(da.skills[0]).map((skill, index) => (
                                    <span className="skilled" key={index} >{skill.length > 1 ? skill : ""}</span>
                                ))}
                            </div>
                            <div className='d-flex gap-5 m-4 p-2'>
                                <span>Starting from <h3 className='d-inline'>&#8377;{parseInt(da.price)}</h3>/month</span>
                                <Link to={`/mentor/${da._id}`}><button className='btn btn-primary profile-btn'>View Profile</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='pagination-main'>
                <button disabled={activePage===0} className='steps' onClick={handlePrev}>Prev</button>
                {[...Array(totalPages).keys()].map((k)=>(
                    <span key={k} className='page' style={{backgroundColor:activePage===k ?"var(--secondary-color)":"",color:activePage===k?"white":"var(--text-color)"}} onClick={()=>handleTab(k)}>{k}</span> 
                ))}
               <button disabled={activePage===totalPages-1} className='steps' onClick={handleNext}>Next</button>
            </div>
        </div>
  );
};

export default Mentros_page