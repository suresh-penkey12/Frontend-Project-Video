import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {skills,companies,jobTitles} from "../Data/DataValuesConstants"
import "../STYLES/Filters.css";
import "../STYLES/globaltheme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// const Filters_page = () => {
//     const[value,setValue]=useState("");
//     const[skilllist,setSkilllist]=useState([]);
//     const[jobs,setjobList]=useState([]);
//     const[company,setCompany]=useState([]);
//     // function for adding search value
//     const handleSearch =(e)=>{
//         setValue(e.target.value);
//     }
//     // useEffect(() => {
//     //     const timer = setTimeout(() => {
//     //         setDebouncevalue(value);
//     //     }, 500); // Wait 500ms before updating

//     //     return () => clearTimeout(timer); // Cleanup previous timer
//     // }, [value]);
//     const handleSkillChange=(e)=>{
//         const skill = e.target.value;
//         setSkilllist((prevSkills) =>
//             prevSkills.includes(skill)
//                 ? prevSkills.filter((s) => s !== skill)
//                 : [...prevSkills, skill]
//         );
//     }
//     const handleJobChange =(e)=>{
//       const job=e.target.value;
//       setjobList((prevjob)=>
//          prevjob.includes(job)
//          ? prevjob.filter((s)=> s!==job)
//          : [...prevjob,job]
//       )
//     }
//     const handleCompanyChange =(e)=>{
//         const comp=e.target.value;
//         setCompany((prevcom)=>
//         prevcom.includes(comp)
//         ?prevcom.filter((s)=>s!==comp)
//         :[...prevcom,comp]
//     )
//     }
//     // useEffect(()=>{
//     //     let params = new URLSearchParams();
//     //     if(value.trim()) params.set("search",value);
//     //     skilllist.forEach((skills)=>params.append("tags",skills))
//     //     jobs.forEach((job)=>params.append("job_titles",job))
//     //     company.forEach((comp)=>params.append("company",comp))
//     //     const queryString = params.toString();

//     // // Only navigate if the URL has changed to avoid duplicate entries
//     //     if (window.location.search !== `?${queryString}`) {
//     //         navigate(`/mentor/browse?${queryString}`);
//     //     }
//     // },[value,skilllist,jobs,company,navigate])

//   return (
//     <div>
//     <div className="container-custom">
//         <div>
//             <input
//             type="text"
//             onChange={handleSearch}
//             value={value}
//             placeholder='search for any skill,title, or company'
//             className='form-control w-100'
//             style={{width:"300px"}}
//             />
//             <h4 style={{marginTop:"20px"}}>100+ mentors</h4>
//         </div>
//         <div>
//             <h3>Skills</h3>
//             <div style={{display:"flex" ,flexDirection:"column",gap:'10px'}}>
//                 {Skills1.map(skill => (
//                     <div key={skill}>
//                     <label>
//                         <input
//                             type="checkbox"
//                             value={skill}
//                             checked={skilllist.includes(skill)}
//                             onChange={handleSkillChange}
//                         />
//                         <span>{skill}</span>
//                     </label>
//                 </div>
//                 ))}
//             </div>
//         </div>
//         <div>
//           <h3>Job Titles</h3>
//             <div style={{display:"flex" ,flexDirection:"column",gap:'10px'}}>
//                 {Roles1.map(skill => (
//                     <div key={skill}>
//                     <label>
//                         <input
//                             type="checkbox"
//                             value={skill}
//                             checked={jobs.includes(skill)}
//                             onChange={handleJobChange}
//                         />
//                         <span >{skill}</span>
//                     </label>
//                 </div>
//                 ))}
//             </div>
//         </div>
//         <div>
//             <h3>Company</h3>
//             <div style={{display:"flex" ,flexDirection:"column",gap:'10px'}}>
//                 {Company1.map(skill => (
//                     <div key={skill}>
//                     <label>
//                         <input
//                             type="checkbox"
//                             value={skill}
//                             checked={company.includes(skill)}
//                             onChange={handleCompanyChange}
//                         />
//                         <span >{skill}</span>
//                     </label>
//                 </div>
//                 ))}
//             </div>
//         </div>
//     </div>
//         <div className="dropdown">
//             {/* Dropdown Button */}
//                 <div>
//                     <input
//                     type="text"
//                     onChange={handleSearch}
//                     value={value}
//                     placeholder='search for any skill,title, or company'
//                     className='form-control w-75 searching'
//                     style={{width:"100vw"}}
//                     />
//                     <h4 style={{marginTop:"20px"}} className='h4'>100+ mentors</h4>

//                 </div>
//             <button className="btn btn-primary dropdown-toggle  dropdown-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                 Filters
//             </button>

//             {/* Dropdown Content */}
//             <div className="dropdown-menu p-3">

//                 {/* Skills Section */}
//                 <div>
//                     <h5>Skills</h5>
//                     <div className="d-flex flex-column gap-2">
//                         {Skills1.map(skill => (
//                         <label key={skill}>
//                             <input
//                             type="checkbox"
//                             value={skill}
//                             checked={skilllist.includes(skill)}
//                             onChange={handleSkillChange}
//                             />
//                             <span>{skill}</span>
//                         </label>
//                         ))}
//                     </div>
//                 </div>

//                 <hr />

//                 {/* Job Titles Section */}
//                 <div>
//                     <h5>Job Titles</h5>
//                     <div className="d-flex flex-column gap-2">
//                         {Roles1.map(skill => (
//                         <label key={skill}>
//                             <input
//                             type="checkbox"
//                             value={skill}
//                             checked={jobs.includes(skill)}
//                             onChange={handleJobChange}
//                             />
//                             <span>{skill}</span>
//                         </label>
//                         ))}
//                     </div>
//                 </div>

//                 <hr />

//                 {/* Company Section */}
//                 <div>
//                     <h5>Company</h5>
//                     <div className="d-flex flex-column gap-2">
//                         {Company1.map(skill => (
//                         <label key={skill}>
//                             <input
//                             type="checkbox"
//                             value={skill}
//                             checked={company.includes(skill)}
//                             onChange={handleCompanyChange}
//                             />
//                             <span>{skill}</span>
//                         </label>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }


const Filters_page = ({ filters, setFilters, setQuery }) => {
    // const[searchTerm,setSearchTerm]=useState("");
    const handleChange = (type, e) => {
      const { value, checked } = e.target;
  
      setFilters((prev) => {
        let updatedList;
        if(e.target.name !=="Skills"){
          updatedList = value
        }else{
          updatedList=checked ? 
          [...prev[type], value] 
          : prev[type].filter((item) => item !== value);
        }
        return { ...prev, [type]: updatedList };
      });
    };
  
    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     setFilters((prev) => ({ ...prev, search: searchTerm }));
    //     setQuery("");
    //   }, 100); 
    //   return () => clearTimeout(timer); 
    // }, [searchTerm]);

    const handleSearch = (e) => {
      setFilters((prev) => ({ ...prev, search: e.target.value }));
      // setQuery("")
      // setSearchTerm(e.target.value)
    };
      
    return (
      <div>
        <div className="container-custom">
          {/* Search Section */}
          <div>
            <input
              type="text"
              onChange={handleSearch}
              value={filters.search}
              placeholder="Search for any skill, title, or company"
              className="form-control w-100"
              style={{ width: "300px" }}
            />
            <h4 style={{ marginTop: "20px" }}>100+ mentors</h4>
          </div>
  
          {/* Reusable Filter Section */}
          {[
            { title: "Skills", data: skills, type: "skills" },
            { title: "Job Titles", data: jobTitles, type: "jobs" },
            { title: "Company", data: companies, type: "company" },
          ].map(({ title, data, type }) => (
            <div key={type}>
              <h3>{title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {data.map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      value={item}
                      name={title}
                      checked={filters[type].includes(item)}
                      onChange={(e) => handleChange(type, e)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        {/* Dropdown Section */}
        <div className="dropdown">
          <div>
            <input
              type="text"
              onChange={handleSearch}
              value={filters.value}
              placeholder="Search for any skill, title, or company"
              className="form-control w-75 searching"
              style={{ width: "100vw" }}
            />
            <h4 style={{ marginTop: "20px" }} className="h4">100+ mentors</h4>
          </div>
          <button className="btn btn-primary dropdown-toggle dropdown-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filters
          </button>
  
          <div className="dropdown-menu p-3">
            {[
              { title: "Skills", data: skills, type: "skills" },
              { title: "Job Titles", data: jobTitles, type: "jobs" },
              { title: "Company", data: companies, type: "company" },
            ].map(({ title, data, type }) => (
              <div key={type}>
                <h5>{title}</h5>
                <div className="d-flex flex-column gap-2">
                  {data.map((item) => (
                    <label key={item}>
                      <input
                        type="checkbox"
                        value={item}
                        checked={filters[type].includes(item)}
                        onChange={(e) => handleChange(type, e)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };



export default Filters_page;
