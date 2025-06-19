import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Api } from '../../../Api';
const Profile_Form = () => {
    // let Api=import.meta.env.SKILLSYNC_BACKEND_API;
    let token = sessionStorage.getItem("token");
    let navigate =useNavigate();
    const[details,setdetails]=useState({comapny:"",About:"",description:"",price:"",job_title:"",country:"",skills:[],image:null});
    // console.log(userData?userData:"null data");
    const handleChange =(e)=>{
        if (e.target.name === "skills") {
            setdetails({ ...details, skills: e.target.value.split(",") });
        } else if (e.target.name === "image") {
            let file = e.target.files[0];
            console.log(file);
            setdetails({ ...details, image: file||null }); // Store file object
        } else {
            setdetails({ ...details, [e.target.name]: e.target.value });
        }
    }
    console.log(details);
    const handleSubmit = async (event) => {
        event.preventDefault(); 

        try {
            const formData = new FormData();
            Object.keys(details).forEach((key) => {
                if (key === "skills") {
                    formData.append(key, JSON.stringify(details[key])); 
                } else {
                    formData.append(key, details[key]);
                }
            });

            const response = await axios.post(`${Api}/Auth/create-profile`, formData, {
                headers: { "Content-Type": "multipart/form-data" ,Authorization: `Bearer ${token}`},
            });

            toast.success("Profile updated successfully", response.message);
            setTimeout(() => {
                navigate("/DashBoard/mentors");
            },500);

        } catch (error) {
            toast.error("Error updating profile", error);
        }
    };
    console.log(details.image);
  return (
    <div style={{margintop:"100px"}}>
        <h2>Create Profile</h2>
        {/* <h3 style={{marginLeft:"7%",marginTop:"0%"}}>Profile</h3> */}
        <div style={{marginLeft:"7%",marginRight:"7%",border:"2px solid var(--border-color)",borderRadius:"20px"}}>
            <form enctype="multipart/form-data" class="container mt-4" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="image" class="form-label">Upload Image:</label>
                    <img src="" alt="" class="d-block mb-2" />
                    <input type="file" class="form-control" name="image" id="image" onChange={handleChange}required/>
                </div>
                <div class="mb-3 row">
                    <div class="col">
                        <label for="description" class="form-label">Description:</label>
                        <input type="text" class="form-control" name="description" id="description" placeholder="Enter Description" value={details.description} onChange={handleChange}/>
                    </div>
                    
                </div>
                <div class="mb-3 row">
                    <div class="col">
                        <label for="company" class="form-label">Company:</label>
                        <input type="text" class="form-control" name="company" id="company" placeholder="Enter company" value={details.company} onChange={handleChange} required/>
                    </div>
                    <div class="col">
                        <label for="job_title" class="form-label">Profession:</label>
                        <input type="text" class="form-control" name="job_title" id="job_title" placeholder="Enter profession" value={details.job_title} onChange={handleChange} required/>
                    </div>
                    
                </div>
                <div class="mb-3 row">
                    <div class="col">
                        <label for="country" class="form-label">Country:</label>
                        <input type="text" class="form-control" name="country" id="country" placeholder="Enter country" value={details.country} onChange={handleChange} required/>
                    </div>
                    <div class="col">
                        <label for="price" class="form-label">Price:</label>
                        <input type="text" class="form-control" name="price" id="price" placeholder="Enter price" value={details.price} onChange={handleChange} required/>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="about" class="form-label">About:</label>
                    <input type="text" class="form-control" name="About" id="about" placeholder="Enter About" value={details.About} onChange={handleChange} required/>
                </div>

                <div class="mb-3">
                    <label for="skills" class="form-label">Skills:</label>
                    <input type="text" class="form-control" name="skills" id="skills" placeholder="Enter skills" value={details.skills} onChange={handleChange} required/>
                </div>

                <button type="submit" class="btn btn-primary" style={{marginBottom:"3%",marginLeft:"50%"}}>Submit</button>
            </form>
        </div>
        <ToastContainer position="top-center" autoClose={3000} toastStyle={{ fontSize: "10px", padding: "15px", width: "200px",height:"30px" }}/>

    </div>
  )
}

export default Profile_Form