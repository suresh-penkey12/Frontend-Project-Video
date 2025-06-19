import React, { useEffect, useState } from "react";
import Profile_Form from "./Components/Profile_form";
import axios from "axios";
import { Api } from "../../Api";
import "../../STYLES/profile_page.scss"; // Importing styles

const Profile_page = () => {
  // let Api=import.meta.env.SKILLSYNC_BACKEND_API;
  let token = sessionStorage.getItem("token");
  let friends = JSON.parse(sessionStorage.getItem("friends")) || [];
  let memberships = JSON.parse(sessionStorage.getItem("memborships")) || [];
  console.log(friends);
  console.log(memberships);
  const [userdetails, setUserDetails] = useState({
    description: "",
    firstname: "",
    lastname: "",
    email: "",
    job_title: "",
    company: "",
    image: "",
    file: "",
    skills: [],
  });

  useEffect(() => {
    const submit = async () => {
      if (!token) return;
      let { data } = await axios(`${Api}/Auth/profile_data/email`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (typeof data.message === "string") return;

      let { message } = data;
      let skills =
        typeof message.skills === "string"
          ? JSON.parse(message.skills)
          : message.skills;

      setUserDetails({
        firstname: message.firstname || message.name.split(" ")[0],
        lastname: message.lastname || message.name.split(" ")[1],
        email: message.email,
        job_title: message.job_title,
        company: message.company,
        image: message.image,
        file: message.file,
        skills: skills,
        description: message.description,
      });
    };

    submit();
  }, [token]);

  return (
    <div className="profile-container" style={{marginTop:"80px"}}>
      {userdetails.skills.length !== 0 ? (
        <>
          <div className="profile-card">
            <img
              src={
                userdetails.image.startsWith("https")
                  ? userdetails.image
                  : userdetails.file
              }
              alt="Profile"
              className="profile-image"
            />
            <h3>
              {userdetails.firstname} {userdetails.lastname}
            </h3>
            <p className="text-muted">
              {userdetails.job_title} at {userdetails.company}
            </p>
            <p>
              <strong>Email:</strong> {userdetails.email}
            </p>
            <p>{userdetails.description}</p>
            <p>
              <strong>Friends:</strong> {friends.length}
            </p>
            <p>
              <strong>Memberships:</strong> {memberships.length}
            </p>
            <div className="skills-container">
              {userdetails.skills.length > 1
                ? userdetails.skills.map((skill, ind) => (
                    <span key={ind} className="skill-badge">
                      {skill}
                    </span>
                  ))
                : JSON.parse(userdetails.skills[0]).map((skill, ind) => (
                    <span key={ind} className="skill-badge">
                      {skill}
                    </span>
                  ))}
            </div>
          </div>
        </>
      ) : (
        <Profile_Form />
      )}
    </div>
  );
};

export default Profile_page;
